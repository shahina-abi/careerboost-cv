import {User} from "../models/userModel";

export const uploadCV = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Please upload a CV file" });

    // Save CV path in user's document
    req.user.cv = req.file.path;
    await req.user.save();

    res.json({ message: "CV uploaded successfully", path: req.file.path });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
