import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmail } from "../services/actions/authActions";
import "../styles/components/VerifyEmail.scss";

interface IResponseData {
  emailVerified: boolean;
  message: string;
  error: string | null;
}

const defaultResponseData: IResponseData = {
  emailVerified: false,
  message: "Verifying email...",
  error: null,
};

const VerifyEmail: React.FunctionComponent = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [responseData, setResponseData] =
    useState<IResponseData>(defaultResponseData);

  const handleVerification = async (token: string) => {
    try {
      const response = await verifyEmail(token || "");
      setResponseData({
        emailVerified: true,
        message: response.message,
        error: null,
      });
      setTimeout(() => {
        navigate("/sign-in");
      }, 2000);
    } catch (err: unknown) {
      let errorMessage = ""
      if (typeof err === 'string') {
        errorMessage = err;
      } else if (typeof err === 'object' && err !== null && 'message' in err) {
        errorMessage = (err as { message: string }).message;
      } else {
        errorMessage = 'An unknown error occurred.';
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
