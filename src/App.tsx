import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./pages/LandingPage/LandingPage.tsx";
import AdminPage from "./pages/AdminPage/AdminPage.tsx";
import SearchPage from "./pages/SearchPage/SearchPage.tsx";
import NavBar from "./components/Navbar/Navbar.tsx";
import { AuthProvider } from "./context/AuthContext";
import { LoadScript } from "@react-google-maps/api";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";
import { SearchProvider } from "./context/SearchContext.tsx";
import env from "react-dotenv";

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
      <LoadScript googleMapsApiKey={env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <BrowserRouter>
          <ToastContainer position="bottom-right" />
          <NavBar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <SearchPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="ADMIN">
                  <AdminPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </LoadScript>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;
