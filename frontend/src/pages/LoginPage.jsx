import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../helpers/api";
import { REFRESH_TOKEN, ACCESS_TOKEN, USER } from "../helpers/constants";
import { enqueueSnackbar } from "notistack";
import { useAuth } from "../contexts/AuthContext";
import PasswordInput from "../components/PasswordInput";
import Button from "../components/Button";

export default function LoginPage() {
  const [loginType, setLoginType] = useState("email");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loggedInUser = JSON.parse(localStorage.getItem(USER))?.username;

    if (!identifier || !password) {
      enqueueSnackbar("Please fill in all the fields", { variant: "error" });
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/user/login-page/", {
        identifier,
        password,
      });
      // console.log(response);
      const {
        access_token,
        // refresh_token,
        username,
        email,
        first_name: firstName,
        last_name: lastName,
        org_name: orgName,
        bio,
        profile_update: isProfileUpdated,
        is_verified: isEmailVerified,
        based_on: basedOn,
        account_type: accountType,
        logged_user: id,
      } = response.data;

      if (!(loggedInUser === username)) {
        localStorage.setItem(ACCESS_TOKEN, access_token);
        localStorage.setItem(
          USER,
          JSON.stringify({
            username,
            email,
            firstName,
            lastName,
            orgName,
            bio,
            isProfileUpdated,
            isEmailVerified,
            basedOn,
            accountType,
            id,
          })
        );
        setUser(JSON.parse(localStorage.getItem(USER)));
        setIsAuthenticated(true);
        navigate("/listings");
      } else {
        enqueueSnackbar("You are already logged in!");
        return;
      }
    } catch (error) {
      if (error.status === 400) console.log(error);

      if (error.status === 401)
        enqueueSnackbar("Invalid credentials, please try again", {
          variant: "error",
        });
      // console.error("Login error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-screen bg-white overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Logo */}
        <div className="w-full hidden md:w-1/2 bg-purple-600 md:flex items-center justify-center p-8">
          <div className="text-white text-center">
            <img
              src="/logo.svg"
              alt="Company Logo"
              className="h-24 w-24 mx-auto mb-4"
            />
            <h2 className="text-3xl font-bold mb-2">Logo</h2>
            <p className="text-purple-100">Welcome to our platform</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-scroll">
          {/* <div className="w-full max-w-lg mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8"> */}
          <h1 className="text-3xl font-bold mb-6">Welcome back!</h1>
          <form onSubmit={handleLogin} className="space-y-2">
            <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                className={`flex-1 py-2 px-4 rounded-md font-medium transition ${
                  loginType === "email"
                    ? "bg-white shadow-sm "
                    : "text-gray-600 hover:text-gray-800"
                }`}
                onClick={() => setLoginType("email")}
              >
                Email
              </button>
              <button
                type="button"
                className={`flex-1 py-2 px-4 rounded-md font-medium transition ${
                  loginType === "username"
                    ? "bg-white shadow-sm "
                    : "text-gray-600 hover:text-gray-800"
                }`}
                onClick={() => setLoginType("username")}
              >
                Username
              </button>
            </div>

            <label
              htmlFor={loginType}
              className="block text-base font-medium mb-2"
            >
              {loginType === "email" ? "Email" : "Username"}
            </label>
            <input
              id={loginType}
              type={loginType === "username" ? "text" : "email"}
              placeholder={
                loginType === "username" ? "JohnDoe123" : "johndoe123@gmail.com"
              }
              value={identifier}
              className="bg-gray-50 border border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none block w-full p-2.5"
              onChange={(e) => setIdentifier(e.target.value)}
            />

            <PasswordInput
              id="password"
              type="password"
              label="Password"
              value={password}
              className="bg-gray-50 border border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none block w-full p-2.5"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-gray-500 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Button disabled={loading} text="Login" loading={loading}></Button>
          </form>
          <div className="text-center text-sm text-gray-600">
            No account yet?{" "}
            <Link to="/register" className=" font-medium hover:underline">
              Register now
            </Link>
            !
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
