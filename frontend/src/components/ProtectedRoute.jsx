// ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!user.isEmailVerified) return <Navigate to="/verify" />;
  if (!user.isProfileUpdated) return <Navigate to="/update-profile" />;

  return children;
};

export default ProtectedRoute;
