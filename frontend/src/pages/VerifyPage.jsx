import { useState } from "react";
import api from "../helpers/api";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
const VerifyPage = () => {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

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
          enqueueSnackbar(
            "Your account has already been verified, please login instead!",
            {
              variant: "warning",
            }
          );
          navigate("/login");
        } else if (res.status === 200) {
          enqueueSnackbar(
            "Your account has been verified! Please login to continue :)",
            {
              variant: "success",
            }
          );
          // localStorage.setItem(ACCESS_TOKEN, res.data.access_token);
          navigate("/login");
        }
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
