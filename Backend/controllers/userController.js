import mongoose from "mongoose";
import User from "../models/User.js";

export const getMe = async (req, res) => {
  try {
    const userId = req.userId;

    if (typeof userId === "string" && !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await User.findById(userId).select("-password -otp -otpExpires");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDashboard = async (req, res) => {
  res.json({ message: "Welcome to the dashboard" });
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile" });
  }
};

