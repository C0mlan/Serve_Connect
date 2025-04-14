import { ACCESS_TOKEN } from "../helpers/constants";
import { jwtDecode } from "jwt-decode";
import { useState, createContext, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  const [user, setUser] = useState({
    isEmailVerified: false,
    isProfileUpdated: false,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkTokenValidity = async () => {
      if (token) {
        const decoded = jwtDecode(token);
        const tokenExp = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExp < now) {
          localStorage.removeItem(ACCESS_TOKEN);
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      }
    };
    checkTokenValidity();
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
