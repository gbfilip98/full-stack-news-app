import User from '../models/User';
import { hashPassword, comparePassword } from '../utils/hash';
import { generateToken, verifyToken } from '../utils/token';
import { transporter } from '../config/mailer';
// import nodemailer from 'nodemailer';
// import { emailTemplate } from '../utils/emailTemplate.js';
// import { Types } from 'mongoose';
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types/Auth';

const frontendURL = process.env.FRONTEND_URL!;
// PRERASPOREDIT U VISE FAJLOVA

export const requireAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized: Token missing' });
  } else {
    const token = authHeader.split(' ')[1];
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
      const user = await User.findById(decoded.id);
      if (!user) {
        // throw new Error('User not found');
        res.status(401).json({ message: 'Unauthorized: User not found' });
      } else {
        req.user = user;
        next();
      }
    } catch (err) {
      res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  }
};

export const registerUser = async (firstName: string, lastName: string, email: string, password: string) => {
  const existing = await User.findOne({ email });
  if (existing) throw { status: 400, message: 'Email already registered' };

  const hashed = await hashPassword(password);
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashed,
  });

  const token = generateToken({ id: user._id });
  const verifyLink = `${frontendURL}/verify?token=${token}`;

  try {
    await transporter.sendMail({
      from: '"News App" <no-reply@newsapp.com>',
      to: email,
      subject: 'Verify your account',
      html: `<p>Please verify your email by clicking the link below:</p><a href="${verifyLink}">${verifyLink}</a>`,
    });
  } catch (err: any) {
    console.error("sendMail error:", err.message);
    throw { status: 500, message: "Failed to send verification email." };
  }

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  const match = await comparePassword(password, user.password);
  if (!match) throw new Error('Invalid credentials');

  const token = generateToken({ id: user._id });
  return { user, token };
};

export const verifyUserEmail = async (token: string) => {
  const decoded = verifyToken(token) as { id: string };
  const user = await User.findById(decoded.id);
  if (!user) throw new Error('Invalid token');

  user.isVerified = true;
  await user.save();
  return user;
};

// export const sendVerificationEmail = async (to: string, token: string) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_FROM,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

//   const link = `http://localhost:5173/verify?token=${token}`;

//   await transporter.sendMail({
//     from: process.env.EMAIL_FROM,
//     to,
//     subject: 'Verify your email',
//     html: emailTemplate(link),
//   });
// };
