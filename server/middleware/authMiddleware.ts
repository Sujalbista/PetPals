import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../types/AuthRequest";

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    res.status(401).json({ message: "Unauthorized" }); // Send response directly, no return
    return; // Prevent further code execution
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as AuthRequest).user = decoded as AuthRequest["user"];

   
    next(); // Continue to the next middleware/route handler
  } catch (err) {
    res.status(403).json({ message: "Invalid token" }); // Send response directly, no return
    return; // Prevent further code execution
  }
};
