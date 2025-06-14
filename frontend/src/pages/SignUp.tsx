import React, { useEffect, useState } from "react";
import { register } from "../services/actions/authActions";
import Icon from "@/components/Icon";
import { useNewsContext } from "@/context/NewsContext";
import { useNavigate } from "react-router-dom";
import type { IRegisterData } from "@/types/Auth";
import { defaultRegisterData } from "@/data/authData";
import "../styles/components/Auth.scss";

const SignUp: React.FunctionComponent = () => {
  const { userData } = useNewsContext();
  const navigate = useNavigate();
  const [form, setForm] = useState<IRegisterData>(defaultRegisterData);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);
    setMessage("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setIsProcessing(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      setError("Invalid email format");
      setIsProcessing(false);
      return;
    }

    if (form.password.length < 6 || !/[A-Z]/.test(form.password)) {
      setError(
        "Password should be at least 6 characters with an uppercase letter"
      );
      setIsProcessing(false);
      return;
    }

    try {
      const response = await register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      });

      setMessage(
        response.message || "Check your email to verify your account."
      );
      setForm(defaultRegisterData);
    } catch (err: unknown) {
      let errorMessage = "";

      if (typeof err === "string") {
        errorMessage = err;
      } else if (typeof err === "object" && err !== null && "message" in err) {
        errorMessage = (err as { message: string }).message;
      } else {
        errorMessage = "Registration failed: An unknown error occurred.";
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
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            value={form.firstName}
            required
          />
          <input
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            value={form.lastName}
            required
          />

          <div className="input-row">
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              value={form.email}
              required
            />
          </div>

          <div className="input-row password-row">
            <div className="password-wrapper">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={handleChange}
                value={form.password}
                required
              />
              <button
                type="button"
                className="show-hide-btn"
                onClick={togglePasswordVisibility}
                aria-label="Toggle password visibility"
              >
                <Icon
                  name="eye"
                  viewBox="0 0 24 24"
                  alt="Show or hide password"
                />
              </button>
            </div>

            <div className="password-wrapper">
              <input
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Repeat Password"
                onChange={handleChange}
                value={form.confirmPassword}
                required
              />
              <button
                type="button"
                className="show-hide-btn"
                onClick={togglePasswordVisibility}
                aria-label="Toggle password visibility"
              >
                <Icon
                  name="eye"
                  viewBox="0 0 24 24"
                  alt="Show or hide password"
                />
              </button>
            </div>
          </div>

          <button type="submit" disabled={isProcessing}>
            Register
          </button>
          <p>
            Already have an account? <a href="/sign-in">Sign in</a>
          </p>

          {isProcessing ? <p className="success-msg">Processing...</p> : ""}
          {message ? <p className="success-msg">{message}</p> : ""}
          {error ? <p className="error-msg">{error}</p> : ""}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
