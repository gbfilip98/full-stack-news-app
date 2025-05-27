import { Request } from 'express';

//express/index.d.ts – Custom extension for req.user
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email?: string;
    // add more fields if needed
  };
}