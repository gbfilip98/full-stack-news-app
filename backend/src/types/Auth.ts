import { Request } from 'express';
import { UserDocument } from './User';

export interface AuthRequest extends Request {
  user: UserDocument;
}

// //express/index.d.ts – Custom extension for req.user
// export interface AuthRequest extends Request {
//   user?: {
//     id: string;
//     email?: string;
//     // add more fields if needed
//   };
// }