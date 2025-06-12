import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IAuthRequest } from "../types/Auth";
import User from "../models/User";

export const requireAuth = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized: Token missing" });
  } else {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
      };
      const user = await User.findById(decoded.id);
      if (!user) {
        res.status(401).json({ message: "Unauthorized: User not found" });
      } else {
        req.user = user;
        next();
      }
    } catch (err: unknown) {
      let errorMessage = "";

      if (err instanceof Error) {
        errorMessage = err.message;
      } else {
        errorMessage = "Unauthorized: Invalid token.";
      }

      res.status(401).json({ message: errorMessage });
    }
  }
};
