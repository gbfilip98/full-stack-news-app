// import { Request, Response } from 'express';
// import User from '../models/User.js';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import { sendVerificationEmail } from '../services/emailService.js';
// import type { AuthRequest } from '../types/express/index.d.ts';

// interface JwtPayload {
//   id: string;
//   email?: string;
// }

// export const signup = async (req: Request, res: Response) => {
//   const { firstName, lastName, email, password } = req.body;

//   try {
//     const existing = await User.findOne({ email });
//     if (existing) {
//       res.status(400).json({ message: 'Email already registered' });
//     } else {
//       const hashed = await bcrypt.hash(password, 10);
  
//       const user = await User.create({
//         firstName,
//         lastName,
//         email,
//         password: hashed,
//         isVerified: false,
//       });
  
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
//       await sendVerificationEmail(email, token);
  
//       res.status(201).json({ message: 'Signup successful. Please verify your email.' });
//     }
//   } catch (err) {
//     res.status(500).json({ message: 'Signup failed', error: err });
//   }
// };

// export const login = async (req: Request, res: Response) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       res.status(400).json({ message: 'Invalid credentials' });
//     } else {
//       const match = await bcrypt.compare(password, user.password);
//       if (!match) {
//         res.status(400).json({ message: 'Invalid credentials' });
//       } else {
//         if (!user.isVerified) {
//           res.status(403).json({ message: 'Email not verified' });
//         } else {
//           const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
//           res.cookie('token', token, { httpOnly: true, sameSite: 'lax' }).json({ message: 'Prijava uspješna' });
//           // res.status(200).json({ token });
//         }
//       }
//     }
//   } catch (err) {
//     res.status(500).json({ message: 'Login failed', error: err });
//   }
// };

// export const verifyEmail = async (req: Request, res: Response) => {
//   const { token } = req.query;
//   // const token = req.query.token as string;

//   try {
//     const decoded = jwt.verify(token as string, process.env.JWT_SECRET!) as JwtPayload;
//     const user = await User.findById(decoded.id);
//     if (!user) {
//       res.status(404).json({ message: 'User not found' });
//     } else {
//       user.isVerified = true;
//       await user.save();
  
//       res.status(200).json({ message: 'Email verified successfully' });
//     }
//   } catch (err) {
//     res.status(400).json({ message: 'Invalid or expired token', error: err });
//   }
// };

// export const getUser = async (req: AuthRequest, res: Response) => {
//   try {
//     const user = await User.findById(req.user?.id).select('-password');
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: 'Could not retrieve user', error: err });
//   }
// };
// // import { Request, Response } from 'express';
// // import User from '../models/User';
// // import bcrypt from 'bcryptjs';
// // import jwt from 'jsonwebtoken';

// // const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';

// // export const register = async (req: Request, res: Response): Promise<void> => {
// //   const { email, password } = req.body;
// //   try {
// //     const existing = await User.findOne({ email });
// //     if (existing) {
// //       res.status(400).json({ message: 'User exists' });
// //     } else {
// //       const user = new User({ email, password });
// //       await user.save();
  
// //       res.status(201).json({ message: 'User created' });
// //     }
// //   } catch (err: unknown) {
// //     const error = err as Error;
// //     res.status(500).json({ error: error.message || 'Server error' });
// //   }
// // };

// // export const login = async (req: Request, res: Response): Promise<void> => {
// //   const { email, password } = req.body;
// //   try {
// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       res.status(400).json({ message: 'Invalid credentials' });
// //     } else {
// //       const isMatch = await bcrypt.compare(password, user?.password);
// //       if (!isMatch) { 
// //         res.status(400).json({ message: 'Invalid credentials' }); 
// //       } else {
// //         const token = jwt.sign({ userId: user?._id }, JWT_SECRET, { expiresIn: '1h' });
// //         res.json({ token });
// //       }
// //     }
// //   } catch (err: unknown) {
// //     const error = err as Error;
// //     res.status(500).json({ error: error.message || 'Server error' });
// //   }
// // };

import { Request, Response } from 'express';
import { loginUser, registerUser, verifyUserEmail } from '../middleware/authMiddleware';

export const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) res.status(400).json({ message: 'Missing required fields' });

  try {
    const user = await registerUser(firstName, lastName, email, password);
    if (user) res.status(201).json({ message: 'Registered. Please check your email to verify your account.' });
  } catch (err: any) {
    const status = err.status || 500;
    const message = err.message || 'Registration failed';
    res.status(status).json({ message: message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await loginUser(email, password);
    // if (error) res.status(401).json({ message: error});
    const { password: _, ...userData } = user.toObject(); // Remove password
    res.json({ user: userData, token });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};

export const verify = async (req: Request, res: Response) => {
  const { token } = req.body;

  try {
    const user = await verifyUserEmail(token?.toString() || "");
    if (user) res.json({ message: 'Email verified. You may now sign in.' });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
