import { useState } from "react";
import api from "../helpers/api";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, USER } from "../helpers/constants";
import { useAuth } from "../contexts/AuthContext";
import OTPInput from "./OTPInput";

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
    <div class="w-full max-w-lg mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
      <form
        class="sm:flex flex-col justify-center items-center space-y-6"
        onSubmit={handleOtpSubmit}
      >
        <h1 class="text-xl text-center font-medium text-gray-900 ">
          Please enter the OTP sent to your email
        </h1>
        <OTPInput
          otp={otp}
          setOtp={setOtp}
          length={6}
          disabled={otp.length >= 6}
        />
        <div className="sm:flex gap-x-2.5 grid">
          <button
            disabled={loading}
            type="submit"
            class="disabled:bg-gray-500 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 w-2/3 mx-auto sm:w-xs cursor-pointer"
          >
            {loading && (
              <svg
                aria-hidden="true"
                role="status"
                class="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            )}
            Verify
          </button>

          <button
            onClick={() => setOtp("")}
            type="button"
            class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 cursor-pointer w-1/2 mx-auto sm:w-1/2"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerifyPage;
