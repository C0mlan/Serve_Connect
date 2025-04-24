// ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  console.log(isAuthenticated);
  if (isAuthenticated === false) return <Navigate to="/login" />;
  if (user.isEmailVerified === false) return <Navigate to="/verify" />;
  if (user.isProfileUpdated === false) return <Navigate to="/update-profile" />;

  return children;
};

export default ProtectedRoute;
