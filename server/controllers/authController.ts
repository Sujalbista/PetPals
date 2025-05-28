import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { request } from "http";

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  console.log("login api");
  // Ensure JWT_SECRET is available
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.log("no jwt");
    res.status(500).json({ message: "JWT secret is not configured" });
    return;
  }

  // Validate email and password
  if (!email || typeof email !== "string") {
    console.log("invalid email");
    res.status(400).json({ message: "Email is required and must be a string" });
    return;
  }
  if (!password || typeof password !== "string") {
    console.log("invalid pass");
    res.status(400).json({ message: "Password is required and must be a string" });
    return;
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
        console.log("no");
        res.status(400).json({ message: "User not found" });
        return;
    }
    // Check if password is correct
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        res.status(400).json({ message: "Invalid credentials" });
        return;
    }
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "1d" });

    // Respond with token
    res.json({ token });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const registerUser = async (req: Request, res: Response): Promise<void> => {
  console.log("register api");
  const { name, email, password, agreedToTerms } = req.body;
  

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    res.status(500).json({ message: "JWT secret is not configured" });
    return;
  }

  // Basic validation
  if (!name || typeof name !== "string") {
    res.status(400).json({ message: "Name is required and must be a string" });
    return;
  }

  if (!email || typeof email !== "string") {
    res.status(400).json({ message: "Email is required and must be a string" });
    return;
  }

  if (!password || typeof password !== "string" || password.length < 6) {
    res.status(400).json({ message: "Password must be at least 6 characters long" });
    return;
  }

  if (agreedToTerms !== true) {
    res.status(400).json({ message: "You must agree to the terms and conditions" });
    return;
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email already in use" });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, jwtSecret, { expiresIn: "1h" });

    // Respond with token
    res.status(201).json({ token });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
