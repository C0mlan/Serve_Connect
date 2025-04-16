import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../helpers/api";
import { REFRESH_TOKEN, ACCESS_TOKEN, USER } from "../helpers/constants";
import { enqueueSnackbar } from "notistack";
import { useAuth } from "../contexts/AuthContext";
import Spinner from "../components/Spinner";

export default function LoginPage() {
  const [option, setOption] = useState("username");
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
      const response = await api.post("/login-page/", {
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
      } = response.data;

      if (!(loggedInUser === username)) {
        localStorage.setItem(ACCESS_TOKEN, access_token);
        setUser({
          username,
          email,
          firstName,
          lastName,
          orgName,
          bio,
          isProfileUpdated,
          isEmailVerified,
          basedOn,
        });
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
          })
        );
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
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
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
        <button type="submit" disabled={loading}>
          {loading ? <Spinner /> : "Login"}
        </button>
      </form>
      <p>
        Don't have an account? Register <Link to="/register">here</Link>
      </p>
    </>
  );
}
