import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import VerifyPage from "./pages/VerifyPage.jsx";
import UpdateProfilePage from "./pages/UpdateProfilePage.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ListingsPage from "./pages/ListingsPage.jsx";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <main className="">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/verify" element={<VerifyPage />} />
            <Route path="/update-profile" element={<UpdateProfilePage />} />
            <Route
              path="/listings"
              element={
                <ProtectedRoute>
                  <ListingsPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </Router>
      {/* <h1 className="text-9xl font-bold underline">Hello world!</h1> */}
    </>
  );
}

export default App;
