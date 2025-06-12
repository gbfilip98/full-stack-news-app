import { postService, patchService } from "../api";
import { type IUser } from "@/types/User";

export const register = async (payload: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const response = await postService("/auth/register", payload);
  return response;
};

export const login = async (payload: { email: string; password: string }) => {
  const response = await postService("/auth/login", payload);

  const { token, user } = response;
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  return user as IUser;
};

export const verifyEmail = async (token: string) => {
  const response = await patchService(`/auth/verify`, { token: token }, token);

  return response;
};
