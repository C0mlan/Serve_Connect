import { useState } from "react";
import api from "../helpers/api";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, USER } from "../helpers/constants";
import { useAuth } from "../contexts/AuthContext";
import OTPInput from "./OTPInput";
import Button from "../components/Button";

const VerifyPage = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    api
      .post("/user/user-ver/", { otp })
      .then((res) => {
        if (res.status === 204) {
          enqueueSnackbar("Your email has already been verified!");
          setLoading(false);
        } else if (res.status === 200) {
          localStorage.removeItem(ACCESS_TOKEN);
          localStorage.removeItem(USER);
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
        setLoading(false);
        navigate("/listings");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          enqueueSnackbar("Invalid OTP, please try again!", {
            variant: "error",
          });
        }
        setLoading(false);
      });
  };
  return (
    <div className="max-w-lg mx-4 md:mx-auto mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
      <form
        className="sm:flex flex-col justify-center items-center space-y-6"
        onSubmit={handleOtpSubmit}
      >
        <h1 className="text-xl text-center font-medium text-gray-900 ">
          Please enter the OTP sent to your email
        </h1>
        <OTPInput
          otp={otp}
          setOtp={setOtp}
          length={6}
          disabled={otp.length >= 6}
        />
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

export default VerifyPage;
