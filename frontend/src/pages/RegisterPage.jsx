import { useState } from "react";
import api from "../helpers/api";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ACCESS_TOKEN, USER } from "../helpers/constants";
import PasswordInput from "../components/PasswordInput";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import volunteerSmiling from "../assets/volunteer-smiling.jpg";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useAuth();
  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !username ||
      !password ||
      !password2
    ) {
      enqueueSnackbar("Please fill in all the fields!", { variant: "error" });
      return;
    }

    if (username.includes("@")) {
      enqueueSnackbar("Username cannot contain @", {
        variant: "error",
      });
      return;
    }

    if (!/^(?=.*[!@#$%^&*()-_=+[\]{}|;:',.<>?/]).{8,}$/.test(password)) {
      enqueueSnackbar(
        "Password must be at least 8 characters long and contain at least a special character!",
        {
          variant: "error",
          autoHideDuration: 8000,
        }
      );
      return;
    }
    if (password !== password2) {
      enqueueSnackbar("Password does not match with confirmation!", {
        variant: "error",
      });
      return;
    }

    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      username: username,
      password: password,
      password2: password2,
    };

    setLoading(true);
    try {
      const res = await api.post("/user/register/", data);
      if (res.status === 201) {
        enqueueSnackbar("Account has been created, please verify your email!", {
          variant: "success",
        });
        setUser({
          isEmailVerified: false,
          isProfileUpdated: false,
        });
        setIsAuthenticated(false);
        localStorage.removeItem(USER);
        localStorage.removeItem(ACCESS_TOKEN);
        navigate("/verify");
      }
    } catch (err) {
      let data = err.response.data;
      enqueueSnackbar(Object.values(data)[0][0], { variant: "error" });
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-screen bg-white mt-4 mx-4 md:mx-0 overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Logo */}
        <div
          className="w-full relative hidden md:w-1/2  md:flex items-center justify-center p-8  bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `url(${volunteerSmiling})`,
            height: "100%",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
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
          <h1 className="text-3xl font-bold mb-6">Create an account</h1>
          <form onSubmit={handleRegister}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mb-2">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-base font-medium mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  placeholder="John"
                  className="bg-gray-50 border border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none block w-full p-2.5"
                  onChange={(e) => setFirstName(e.target.value)}
                  id="first-name"
                />
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-base font-medium mb-2"
                >
                  Last Name
                </label>

                <input
                  type="text"
                  value={lastName}
                  placeholder="Doe"
                  className="bg-gray-50 border border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none block w-full p-2.5"
                  onChange={(e) => setLastName(e.target.value)}
                  id="last-name"
                />
              </div>
            </div>
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-base font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                placeholder="johndoe123@email.com"
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none block w-full p-2.5"
                id="email"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="username"
                className="block text-base font-medium  mb-2"
              >
                Username
              </label>
              <input
                type="text"
                value={username}
                placeholder="JohnDoe123"
                className="bg-gray-50 border border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none block w-full p-2.5"
                onChange={(e) => setUsername(e.target.value)}
                id="username"
              />
            </div>
            <div className="mb-2">
              <PasswordInput
                value={password}
                id="password"
                label="Password"
                placeholder="At least 8 chars with 1 special character"
                className="bg-gray-50 border border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none block w-full p-2.5"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <PasswordInput
                id="c-password"
                value={password2}
                label="Confirm Password"
                className="bg-gray-50 border border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none block w-full p-2.5"
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>

            <div className="flex items-center mb-2 mt-3">
              <input
                id="terms"
                value={terms}
                onChange={(e) => {
                  setTerms(e.target.checked);
                }}
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm">
                I agree to the{" "}
                <a href="#" className="text-gray-600 hover:underline">
                  Terms and Conditions
                </a>
              </label>
            </div>
            <Button
              disabled={loading || !terms}
              loading={loading}
              text="Register"
            ></Button>
            <div className="text-center text-md ">
              Already have an account?
              <Link
                to="/login"
                className="text-gray-600 font-medium hover:underline"
              >
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default RegisterPage;
