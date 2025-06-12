import React, { useEffect, useState } from "react";
import { login } from "../services/actions/authActions";
import { useNavigate } from "react-router-dom";
import { useNewsContext } from "../context/NewsContext";
import type { ILoginData } from "@/types/Auth";
import { defaultLoginData } from "@/data/authData";
import "../styles/components/Auth.scss";

const SignIn: React.FunctionComponent = () => {
  const { userData, setUserData } = useNewsContext();
  const navigate = useNavigate();
  const [form, setForm] = useState<ILoginData>(defaultLoginData);
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
    } catch (err: unknown) {
      let errorMessage = "";

      if (typeof err === "string") {
        errorMessage = err;
      } else if (typeof err === "object" && err !== null && "message" in err) {
        errorMessage = (err as { message: string }).message;
      } else {
        errorMessage = "Login failed: An unknown error occurred.";
      }

      setError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (userData) navigate("/");
  }, [userData]);

  return (
    <div className="auth-container-wrapper">
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
          <p>
            Don&apos;t have an account? <a href="/sign-up">Sign up</a>
          </p>

          {isProcessing ? <p className="success-msg">Processing...</p> : ""}
          {error ? <p className="error-msg">{error}</p> : ""}
        </form>
      </div>
    </div>
  );
};

export default SignIn;
