import { useNavigate } from "react-router-dom";
import UseAiService from "../components/UseAiService";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h2>Welcome to Your Dashboard</h2>
      <button onClick={() => navigate("/edit-data")}>Edit Data</button>
      <button onClick={() => navigate("/your-data")}>
        Your Data / Profile
      </button>
      <button onClick={() => navigate("/change-plan")}>
        Change Subscription Plan
      </button>
      <button onClick={handleLogout}>Logout</button>
      <UseAiService />
    </div>
  );
};

export default Home;
