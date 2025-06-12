import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmail } from "../services/actions/authActions";
import { useNewsContext } from "@/context/NewsContext";
import type { IVerifyEmailData } from "@/types/Auth";
import { defaultResponseData } from "@/data/authData";
import "../styles/components/VerifyEmail.scss";

const VerifyEmail: React.FunctionComponent = () => {
  const { userData } = useNewsContext();
  const { search } = useLocation();
  const navigate = useNavigate();
  const [responseData, setResponseData] =
    useState<IVerifyEmailData>(defaultResponseData);

  const handleVerification = async (token: string) => {
    try {
      const response = await verifyEmail(token || "");
      setResponseData({
        emailVerified: true,
        message: response.message,
        error: null,
      });
    } catch (err: unknown) {
      let errorMessage = "";
      if (typeof err === "string") {
        errorMessage = err;
      } else if (typeof err === "object" && err !== null && "message" in err) {
        errorMessage = (err as { message: string }).message;
      } else {
        errorMessage = "An unknown error occurred.";
      }

      setResponseData({
        emailVerified: false,
        message: "",
        error: errorMessage,
      });
    }
  };

  useEffect(() => {
    const token = new URLSearchParams(search).get("token");

    if (token) {
      handleVerification(token);
    }
  }, []);

  useEffect(() => {
    if (userData) navigate("/");
  }, [userData]);

  return (
    <div className="verify-container">
      <div className="verify-box">
        {responseData.message && (
          <>
            <p className="message success">{responseData.message}</p>
            {responseData.emailVerified && (
              <button
                className="verify-btn"
                onClick={() => navigate("/sign-in")}
              >
                Sign In
              </button>
            )}
          </>
        )}
        {responseData.error && (
          <p className="message error">{responseData.error}</p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
