import { useState } from "react";
import api from "../helpers/api";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../helpers/constants";
import { useAuth } from "../contexts/AuthContext";

const VerifyPage = () => {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const { setIsAuthenticated, setUser, user } = useAuth();

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (!otp) {
      enqueueSnackbar("Please enter the OTP sent to your email", {
        variant: "error",
      });
      return;
    }

    api
      .post("/user-ver/", { otp })
      .then((res) => {
        if (res.status === 204) {
          enqueueSnackbar("Your email has already been verified!");
        } else if (res.status === 200) {
          localStorage.removeItem(ACCESS_TOKEN);
          enqueueSnackbar("Your email has been verified successfully!", {
            variant: "success",
          });
          localStorage.setItem(ACCESS_TOKEN, res.data.access_token);
        }
        const newUser = {
          ...user,
          isEmailVerified: true,
          isProfileUpdated: false,
        };
        setUser(newUser);
        setIsAuthenticated(true);
        // console.log(user, isAuthenticated);
        navigate("/dashboard");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          enqueueSnackbar("Invalid OTP, please try again!", {
            variant: "error",
          });
        }
      });
  };
  return (
    <div>
      <h1>Please enter the otp sent to your email</h1>
      <form onSubmit={handleOtpSubmit}>
        <input
          type="number"
          value={otp}
          onChange={(e) => setOtp(e.target.value.slice(0, 6))}
          placeholder="6-digit PIN"
        />
        <input type="submit" value="Verify" disabled={otp.length !== 6} />
      </form>
    </div>
  );
};

export default VerifyPage;
