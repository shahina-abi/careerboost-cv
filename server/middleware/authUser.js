import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const authUser = async (req, res, next) => {
  try {
    // ✅ Try to get token from cookies or Authorization header
    const token =
      req.cookies?.token ||
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found, please login" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(error.status || 500).json({
      error: error.message || "Internal Server Error",
    });
  }
};
