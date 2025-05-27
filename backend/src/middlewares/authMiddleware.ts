import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import type { AuthRequest } from '../types/express/index.d.ts';

// export interface AuthRequest extends Request {
//   user?: any;
// }

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = decoded as {id: string};
      next();
    } catch (err) {
      res.status(403).json({ message: 'Invalid token', error: err });
    }
  }
};
// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// interface AuthenticatedRequest extends Request {
//   user?: string | jwt.JwtPayload;
// }

// const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';

// export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//   const token = req.headers['authorization']?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'No token provided' });

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };
