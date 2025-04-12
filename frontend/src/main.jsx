import { createRoot } from "react-dom/client";
import { AuthProvider } from "./contexts/AuthContext.jsx";
// import "./index.css";
import App from "./App.jsx";

import { SnackbarProvider } from "notistack";
createRoot(document.getElementById("root")).render(
  <SnackbarProvider
    autoHideDuration={3000}
    anchorOrigin={{ horizontal: "right", vertical: "top" }}
    // iconVariant={{
    //   success: "✅ ",
    //   error: "✖️ ",
    //   warning: "⚠️ ",
    //   info: "ℹ️ ",
    // }}
  >
    <AuthProvider>
      <App />
    </AuthProvider>
  </SnackbarProvider>
);
