import { useState } from "react";
import PasswordInput from "../components/PasswordInput";
import { useLocation, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import api from "../helpers/api";
import Button from "../components/Button";
import { ACCESS_TOKEN } from "../helpers/constants";

const UpdatePasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!newPassword) {
      enqueueSnackbar("Please enter your new password!", {
        variant: "error",
      });
      return;
    }
    if (!/^(?=.*[!@#$%^&*()-_=+[\]{}|;:',.<>?/]).{8,}$/.test(newPassword)) {
      enqueueSnackbar(
        "Password must be at least 8 characters long and contain at least a special character!",
        {
          variant: "error",
          autoHideDuration: 8000,
        }
      );
      return;
    }
    if (newPassword !== confirmNewPassword) {
      enqueueSnackbar("Passwords do not match!", {
        variant: "error",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await api.patch("/user/update_password/", {
        password: newPassword,
        password2: confirmNewPassword,
      });
      localStorage.removeItem(ACCESS_TOKEN);
      enqueueSnackbar(res.data.detail + " Please login to continue!", {
        variant: "success",
      });
      setNewPassword("");
      setConfirmNewPassword("");
      navigate("/login");
    } catch (error) {
      if (error.status === 400) {
        enqueueSnackbar(error.response.data.detail, {
          variant: "error",
        });
        return;
      } else {
        enqueueSnackbar("Error updating password. Please try again!.", {
          variant: "error",
        });
        return;
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-lg md:mx-auto mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
      <h1 className="mb-4 text-xl font-semibold text-center">
        Update Password for {email}
      </h1>
      <form onSubmit={handleUpdatePassword}>
        <div className="mb-2">
          <PasswordInput
            value={newPassword}
            id="password"
            label="Enter a new Password"
            placeholder="At least 8 chars with 1 special character"
            className="bg-gray-50 border border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none block w-full p-2.5"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <PasswordInput
            value={confirmNewPassword}
            id="password2"
            label="Enter a new Password"
            placeholder="At least 8 chars with 1 special character"
            className="bg-gray-50 border border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none block w-full p-2.5"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>

        <Button disabled={loading} text="Update" loading={loading}></Button>
      </form>
    </div>
  );
};

export default UpdatePasswordPage;
