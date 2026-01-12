

import express from "express";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";


dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Error", err));


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  otp: String,
  otpExpires: Date,
  isVerified: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model("User", userSchema);


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};



app.post("/register", async (req, res) => {
  try {

    const { email, password } = req.body;


    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });
    }


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already registered"
      });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const otp = generateOTP();
    const otpExpires = Date.now() + 5 * 60 * 1000; 


    await User.create({
      email,
      password: hashedPassword,
      otp,
      otpExpires,
      isVerified: false
    });

    transporter.verify((err, success) => {
  if (err) {
    console.error("❌ Nodemailer Auth Error:", err);
  } else {
    console.log("✅ Nodemailer is ready");
  }
});


    await transporter.sendMail({
      from: `"Auth App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Email Verification OTP",
      html: `
        <h2>Email Verification</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
      `
    });


    res.status(201).json({
      success: true,
      message: "Registration successful. OTP sent to email."
    });

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({
      message: "Registration failed"
    });
  }
});


app.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  if (user.otpExpires < Date.now()) {
    return res.status(400).json({ message: "OTP expired" });
  }

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;

  await user.save();

  res.json({
    success: true,
    message: "Email verified successfully"
  });
});


app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!user.isVerified) {
    return res.status(403).json({ message: "Email not verified" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    success: true,
    token
  });
});

app.get("/test-mail", async (req, res) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Test Mail",
      text: "Nodemailer is working"
    });
    res.send("Mail sent");
  } catch (err) {
    console.error("Mail error:", err);
    res.status(500).send("Mail failed");
  }
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
