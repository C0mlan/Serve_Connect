import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../helpers/api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../helpers/constants";
import { enqueueSnackbar } from "notistack";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const [option, setOption] = useState("username");
  const [optionValue, setOptionValue] = useState("");
  const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useAuth();

  const handleLogin = async (e) => {
    // setLoading(true);
    e.preventDefault();

    if (!optionValue || !password) {
      enqueueSnackbar("Please fill in all the fields", { variant: "error" });
      return;
    }

    try {
      const response = await api.post("/loginpage/", {
        optionValue,
        password,
      });

      const { access_token, user, profile } = response.data;
      localStorage.setItem(ACCESS_TOKEN, access_token);
      setUser({ ...user, ...profile });
      setIsAuthenticated(true);
      enqueueSnackbar("User login successful", { variant: "success" });
      navigate("/dashboard");
    } catch (error) {
      if (error.status === 401)
        enqueueSnackbar("Invalid credentials, please try again", {
          variant: "error",
        });
      // console.error("Login error", error);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div>
          <span onClick={() => setOption("email")}>Email</span>
          <span onClick={() => setOption("username")}>Username</span>
        </div>
        <label htmlFor={option}>{option}</label>
        <input
          id={option}
          type={option === "username" ? "text" : "email"}
          value={optionValue}
          onChange={(e) => setOptionValue(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to="/forgot-password"> Forgot Password</Link>
        <input type="submit" value="Login" />
      </form>
      <p>
        Don't have an account? Register <Link to="/register">here</Link>
      </p>
    </>
  );
}
