import { useState } from "react";
import api from "../helpers/api";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ACCESS_TOKEN, USER } from "../helpers/constants";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [terms, setTerms] = useState(true);

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
      enqueueSnackbar("Please fill in all the fields", { variant: "error" });
      return;
    }

    if (username.includes("@")) {
      enqueueSnackbar("Username cannot contain @", {
        variant: "error",
      });
      return;
    }

    if (!/^(?=.*[!@#$%^&*]).{8,}$/.test(password)) {
      enqueueSnackbar(
        "Password must be at least 8 characters long and contain any of !@#$%^&*",
        {
          variant: "error",
        }
      );
      return;
    }
    if (password !== password2) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
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
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <label htmlFor="first-name">First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          id="first-name"
        />
        <br />
        <label htmlFor="last-name">Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          id="last-name"
        />
        <br />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
        />
        <br />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          placeholder="At least 8 chars with 1 special character"
          onChange={(e) => setPassword(e.target.value)}
          id="password"
        />
        <br />
        <label htmlFor="c-password">Confirm Password</label>
        <input
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          id="c-password"
        />
        <br />
        <input
          type="checkbox"
          id="terms"
          value={terms}
          onChange={(e) => {
            setTerms(e.target.checked);
          }}
        />
        <label htmlFor="terms">
          I agree to the Terms and Conditions and Privacy Policy
        </label>
        <br />
        <input type="submit" value="Register" disabled={!terms} />
      </form>
    </div>
  );
};

export default RegisterPage;
