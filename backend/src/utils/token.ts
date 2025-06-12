import jwt, { SignOptions } from "jsonwebtoken";

export const generateToken = (
  payload: object,
  expiresIn: SignOptions["expiresIn"] = "1d"
): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
  }

  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};
