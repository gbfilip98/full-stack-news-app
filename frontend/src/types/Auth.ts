export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegisterData extends ILoginData {
  firstName: string;
  lastName: string;
  confirmPassword: string;
}

export interface IVerifyEmailData {
  emailVerified: boolean;
  message: string;
  error: string | null;
}

export interface IToken {
  token: string;
}
