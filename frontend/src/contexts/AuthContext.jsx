import { ACCESS_TOKEN, USER } from "../helpers/constants";
// import { jwtDecode } from "jwt-decode";
import { useState, createContext, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const token = localStorage.getItem(ACCESS_TOKEN);
  const loggedInUser = localStorage.getItem(USER);
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    // const checkTokenValidity = async () => {
    //   if (token) {
    //     const decoded = jwtDecode(token);
    //     const tokenExp = decoded.exp;
    //     const now = Date.now() / 1000;
    //     console.log(decoded);
    //     if (tokenExp < now) {
    //       localStorage.removeItem(ACCESS_TOKEN);
    //       setIsAuthenticated(false);
    //     } else {
    //       setIsAuthenticated(true);
    //     }
    //   }
    // };
    // checkTokenValidity();

    const checkUser = () => {
      if (loggedInUser !== null) {
        setUser(JSON.parse(loggedInUser));
        setIsAuthenticated(true);
      } else {
        setUser({});
        setIsAuthenticated(false);
      }
    };
    checkUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
