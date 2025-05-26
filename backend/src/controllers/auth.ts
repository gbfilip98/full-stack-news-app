import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      res.status(400).json({ message: 'User exists' });
    } else {
      const user = new User({ email, password });
      await user.save();
  
      res.status(201).json({ message: 'User created' });
    }
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
    } else {
      const isMatch = await bcrypt.compare(password, user?.password);
      if (!isMatch) { 
        res.status(400).json({ message: 'Invalid credentials' }); 
      } else {
        const token = jwt.sign({ userId: user?._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
      }
    }
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({ error: error.message || 'Server error' });
  }
};
