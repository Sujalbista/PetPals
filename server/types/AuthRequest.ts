// types/AuthRequest.ts
import { Request } from "express";

export interface AuthRequest extends Request {
  user: {
    id: string;
    iat?: number;
    exp?: number;
  };
}
