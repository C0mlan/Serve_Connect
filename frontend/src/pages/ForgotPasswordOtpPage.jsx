import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../helpers/api";
import OTPInput from "./OTPInput";
import Button from "../components/Button";
import { ACCESS_TOKEN } from "../helpers/constants";

const ForgotPasswordOtpPage = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const email = location.state?.email;
  const handleResetPasswordOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      enqueueSnackbar("Please enter the OTP sent to your email", {
        variant: "error",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/user/password_verify/", { otp });
      enqueueSnackbar(res.data.message, { variant: "success" });
      localStorage.setItem(ACCESS_TOKEN, res.data.access_token);
      navigate("/update-password", {
        state: { email: email },
      });
    } catch (error) {
      if (error.status === 400) {
        enqueueSnackbar("Invalid OTP, please try again!", {
          variant: "error",
        });
        return;
      } else {
        enqueueSnackbar("Error sending OTP. Please try again.", {
          variant: "error",
        });
        return;
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-lg mx-auto md:mx-auto mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
      <form
        className="sm:flex flex-col justify-center items-center space-y-6"
        onSubmit={handleResetPasswordOtpSubmit}
      >
        <p className="text-xl text-center font-medium text-gray-900 ">
          Enter the OTP sent to {email} to reset your password!
        </p>
        <OTPInput otp={otp} setOtp={setOtp} length={6} />
        <div className="sm:flex gap-x-2.5 grid">
          <Button disabled={loading} loading={loading} text="Verify"></Button>
          <button
            onClick={() => {
              return otp == ""
                ? enqueueSnackbar("No input to clear!")
                : setOtp("");
            }}
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 py-3 mt-2 mb-2 cursor-pointer w-1/2 mx-auto"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordOtpPage;
