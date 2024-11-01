import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import YourData from "./pages/YourData";
import ChangePlan from "./pages/ChangePlan";
import ProtectedRoute from "./components/ProtectedRoute";
import EditData from "./pages/EditData";

// Mock function to check if the user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem("token"); // Check if a token is stored in local storage
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect root path to login if user is not authenticated */}
        <Route
          path="/"
          element={
            isAuthenticated() ? (
              <Navigate to="/home" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Login and Register Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/your-data"
          element={
            <ProtectedRoute>
              <YourData />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-data"
          element={
            <ProtectedRoute>
              <EditData />
            </ProtectedRoute>
          }
        />
        <Route
          path="/change-plan"
          element={
            <ProtectedRoute>
              <ChangePlan />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
