import { Request } from "express";
import { IUserDocument } from "./User";

export interface IAuthRequest extends Request {
  user?: IUserDocument;
}
