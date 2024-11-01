import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
// import ProfilePage from "./pages/ProfilePage";
import YourData from "./pages/YourData";
import ChangePlan from "./pages/ChangePlan";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/your-data" element={<YourData />} />
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
