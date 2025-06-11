// const SignIn: React.FunctionComponent = () => {
//     return null;
// }

// export default SignIn;
import React, { useState } from "react";
import { login } from "../services/actions/authActions";
import { useNavigate } from "react-router-dom";
import { useNewsContext } from "../context/NewsContext";
import "../styles/components/Auth.scss";

export interface ILoginData {
  email: string;
  password: string;
}

const SignIn: React.FunctionComponent = () => {
  const { setUserData } = useNewsContext();
  const navigate = useNavigate();
  const [form, setForm] = useState<ILoginData>({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setIsProcessing(true);
    e.preventDefault();
    try {
      const user = await login(form);
      if (!user.isVerified) {
        setError("Please verify your email before logging in.");
        return;
      }
      setUserData(user);
      navigate("/");
    } catch (err: unknown) {
      let errorMessage = ""

      if (typeof err === 'string') {
        errorMessage = err;
      } else if (typeof err === 'object' && err !== null && 'message' in err) {
        errorMessage = (err as { message: string }).message;
      } else {
        errorMessage = 'Login failed: An unknown error occurred.';
      }

      setError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={isProcessing}>
          Login
        </button>
        {error && <p className="error-msg">{error}</p>}
      </form>
    </div>
  );
};

export default SignIn;
