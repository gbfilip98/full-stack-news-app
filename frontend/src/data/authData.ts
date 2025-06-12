import type { ILoginData, IRegisterData, IVerifyEmailData } from "@/types/Auth";

export const defaultResponseData: IVerifyEmailData = {
  emailVerified: false,
  message: "Verifying email...",
  error: null,
};

export const defaultRegisterData: IRegisterData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const defaultLoginData: ILoginData = { email: "", password: "" };