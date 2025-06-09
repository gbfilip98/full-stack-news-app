// import React, { useState } from 'react';
// import { register } from '../services/actions/authActions';
// import '../styles/components/Auth.scss';

// interface IFormData {
//   firstName: string,
//   lastName: string,
//   email: string,
//   password: string,
// }

// const defaultFormData: IFormData = {
//   firstName: '',
//   lastName: '',
//   email: '',
//   password: '',
// }

// const SignUp = () => {
//   const [form, setForm] = useState<IFormData>(defaultFormData);
//   const [message, setMessage] = useState<string>('');
//   const [error, setError] = useState<string | null>(null);
//   const [isProcessing, setIsProcessing] = useState<boolean>(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     setIsProcessing(true);
//     e.preventDefault();
//     try {
//       const response = await register(form);
//       setMessage(response.message || 'Check your email to verify your account.');
//       setError(null);
//       setIsProcessing(false);
//       // setForm({ ...defaultFormData });
//       // console.log("response", response)
//       // setTimeout(() => navigate('/sign-in'), 3000);
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Registration failed');
//       setMessage("");
//       setIsProcessing(false);
//       // setForm({ ...defaultFormData });
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="firstName" placeholder="First Name" onChange={handleChange} required />
//         <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
//         <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
//         <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
//         <button type="submit" disabled={isProcessing}>Register</button>
//         {message && <p className="success-msg">{message}</p>}
//         {error && <p className="error-msg">{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default SignUp;

import React, { useState } from "react";
import { register } from "../services/actions/authActions";
import "../styles/components/Auth.scss";

interface IFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const defaultFormData: IFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [form, setForm] = useState<IFormData>(defaultFormData);
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
      setForm(defaultFormData);
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
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
              {showPassword ? "🙈" : "👁️"}
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
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <button type="submit" disabled={isProcessing}>
          Register
        </button>

        {message && <p className="success-msg">{message}</p>}
        {error && <p className="error-msg">{error}</p>}
      </form>
    </div>
  );
};

export default SignUp;
