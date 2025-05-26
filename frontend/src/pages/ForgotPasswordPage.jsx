import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import Button from "../components/Button";
import api from "../helpers/api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, USER } from "../helpers/constants";
import { useAuth } from "../contexts/AuthContext";

const ForgotPasswordPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useAuth();

  const handleSubmitEmail = async (e) => {
    e.preventDefault();

    if (!userEmail) {
      enqueueSnackbar("Please enter your email address!", {
        variant: "error",
      });
      return;
    }
    setLoading(true);
    const data = {
      email: userEmail,
    };

    try {
      const res = await api.post("/user/otp_updatepassword/", data);
      enqueueSnackbar(res.data.message, { variant: "success" });
      localStorage.removeItem(USER);
      localStorage.removeItem(ACCESS_TOKEN);
      setIsAuthenticated(false);
      setUser({
        isEmailVerified: false,
        isProfileUpdated: false,
      });
      navigate("/forgot-password-otp", {
        state: { email: userEmail },
      });
      setUserEmail("");
    } catch (error) {
      if (error.status === 404) {
        enqueueSnackbar(error.response.data.error, { variant: "error" });
        return;
      } else {
        enqueueSnackbar("Error sending OTP. Please try again.", {
          variant: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-lg mx-auto mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
      <h1 className="mb-4 text-xl font-semibold text-center">Password Reset</h1>
      <form onSubmit={handleSubmitEmail}>
        <div className="mb-2">
          <label htmlFor="user-email" className="block mb-2">
            Enter your email address to reset your password!
          </label>
          <input
            type="email"
            id="user-email"
            value={userEmail}
            className="bg-gray-50 border border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none block w-full p-2.5"
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>

        <Button disabled={loading} text="Send OTP" loading={loading}></Button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
