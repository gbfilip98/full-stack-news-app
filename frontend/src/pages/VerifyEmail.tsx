import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmail } from "../services/actions/authActions";

interface IResponseData {
  emailVerified: boolean,
  message: string,
  error: string | null
}

const defaultResponseData: IResponseData = {
  emailVerified: false,
  message: "Verifying email...",
  error: null
}

const VerifyEmail = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const token = new URLSearchParams(search).get('token');
  const [responseData, setResponseData] = useState<IResponseData>(defaultResponseData);

  useEffect(() => {
    if (token) {
      verifyEmail(token)
      .then((res) => setTimeout(() => {
        setResponseData({ emailVerified: true, message: res.message, error: null })
      }, 2000))
      .catch((err) => setResponseData({ emailVerified: false, message: "", error: err.message }));
    }
  }, [token]);

  return (
    <>
       { 
        responseData.message ?
          <>
            <p>{responseData.message}</p>
            { responseData.emailVerified ? <button onClick={() => navigate("/sign-in")}>Sign In</button> : "" }
          </>
        : responseData.error ?
          <p>{responseData.error}</p>
        : ""
      }
    </>
  );
};

export default VerifyEmail;