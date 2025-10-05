import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../utils/token.js";

//create account
export const userSignup= async (req, res) => {
    try {
        const { name, email,mobile ,password } = req.body;


        if (!name || !email  ) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const userAlreadyExist = await User.findOne({ email }).select("-password");

        if (userAlreadyExist) {
            return res.status(400).json({ error: "user Already exist" });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            mobile,
          
        });

        const savedUser = await newUser.save();

        res.status(200).json({ message: "User created successfully", data: savedUser });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server Error" });
    }
};

//user login
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    res.json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email, mobile: user.mobile },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//fetch userprofile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//edit userprofile
export const editProfile = async (req, res) => {
  try {
    const { name, email, mobile } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, mobile },
      { new: true, runValidators: true }
    ).select("-password");
    res.json({ message: "Profile updated", user: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//user logout
export const  userLogout = async (req, res) => {
    try {
        res.clearCookie("token", {
            sameSite: "None",
            secure: true,
            httpOnly: true,
        });

        res.status(200).json({ message: "user logout success" });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server Error" });
    }
};
export const deleteAccount = async (req, res) => {
  try {
    
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized, token missing" });
    }

    
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    
    const user = await User.findByIdAndDelete(decoded.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    
    res.clearCookie("token");

    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};