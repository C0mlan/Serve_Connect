import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import VerifyPage from "./pages/VerifyPage.jsx";
import UpdateProfilePage from "./pages/UpdateProfilePage.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ListingsPage from "./pages/ListingsPage.jsx";
import CreateListingPage from "./pages/CreateListingPage.jsx";
import SingleListingPage from "./pages/SingleListingPage.jsx";
import SingleUserListingPage from "./pages/SingleUserListingPage.jsx";
import EditListingPage from "./pages/EditListingPage.jsx";
import UserConnectionsPage from "./pages/UserConnectionsPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import ForgotPasswordOtpPage from "./pages/ForgotPasswordOtpPage.jsx";
import UpdatePasswordPage from "./pages/UpdatePasswordPage.jsx";
import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
function App() {
  const location = useLocation();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(
        window.innerWidth < 640 || document.documentElement.clientWidth < 640
      );
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Call once to set initial state
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* (window.innerWidth || document.documentElement.clientWidth) < 768 */}
      {location.pathname == "/register" || location.pathname == "/login" ? (
        isSmallScreen ? (
          <Header />
        ) : (
          ""
        )
      ) : (
        <Header />
      )}
      <main className="px-4 md:px-0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/update-profile" element={<UpdateProfilePage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/forgot-password-otp"
            element={<ForgotPasswordOtpPage />}
          />
          <Route path="/update-password" element={<UpdatePasswordPage />} />
          <Route
            path="/listings"
            element={
              <ProtectedRoute>
                <ListingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-listing"
            element={
              <ProtectedRoute role="seeker">
                <CreateListingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/listing/:id"
            element={
              <ProtectedRoute>
                <SingleListingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/listings/me"
            element={
              <ProtectedRoute role="seeker">
                <SingleUserListingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/listing/:id/edit"
            element={
              <ProtectedRoute role="seeker">
                <EditListingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/connections"
            element={
              <ProtectedRoute role="volunteer">
                <UserConnectionsPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {location.pathname == "/register" || location.pathname == "/login" ? (
        isSmallScreen ? (
          <Footer />
        ) : (
          ""
        )
      ) : (
        <Footer />
      )}
    </div>
  );
}

export default App;
