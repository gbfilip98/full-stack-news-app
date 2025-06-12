import { Request, Response } from "express";
import {
  loginUser,
  registerUser,
  verifyUserEmail,
} from "../middleware/authMiddleware";
import { UserSafeData } from "../types/User";

export const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password)
    res.status(400).json({ message: "Registration failed: Missing required fields." });

  try {
    const user = await registerUser(firstName, lastName, email, password);
    if (user)
      res
        .status(201)
        .json({
          message:
            "Registered. Please check your email to verify your account.",
        });
  } catch (err: unknown) {
    let errorMessage = "";

    if (err instanceof Error) {
      errorMessage = err.message;
    } else {
      errorMessage = "Registration failed.";
    }

    res.status(500).json({ message: errorMessage });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await loginUser(email, password);
    const userData = user.toObject() as { password: string } & UserSafeData;

    res.json({ user: userData, token });
  } catch (err: unknown) {
    let errorMessage = "";

    if (err instanceof Error) {
      errorMessage = err.message;
    } else {
      errorMessage = "Login failed.";
    }

    res.status(500).json({ message: errorMessage });
  }
};

export const verify = async (req: Request, res: Response) => {
  const { token } = req.body;

  try {
    const user = await verifyUserEmail(token?.toString() || "");
    if (user) res.json({ message: "Email verified. You may now sign in." });
  } catch (err: unknown) {
    let errorMessage = "";

    if (err instanceof Error) {
      errorMessage = err.message;
    } else {
      errorMessage = "Email verification failed.";
    }

    res.status(500).json({ message: errorMessage });
  }
};
