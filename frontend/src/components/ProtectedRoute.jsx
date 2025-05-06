// ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, user } = useAuth();
  if (isAuthenticated === false) return <Navigate to="/login" />;
  if (user.isEmailVerified === false) return <Navigate to="/verify" />;
  if (user.isProfileUpdated === false) return <Navigate to="/update-profile" />;
  if (user.accountType === "volunteer" && role === "seeker")
    return <Navigate to="/not-found" />;

  return children;
};

export default ProtectedRoute;
