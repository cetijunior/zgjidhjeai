import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h2>Welcome to Your Dashboard</h2>
      <button onClick={() => navigate("/profile")}>Go to Profile</button>
      <button onClick={() => navigate("/your-data")}>Your Data</button>
      <button onClick={() => navigate("/change-plan")}>
        Change Subscription Plan
      </button>
      <button onClick={() => navigate("/edit-saved-data")}>
        Edit Saved Data
      </button>
      <button onClick={() => navigate("/use-ai")}>Use AI Service</button>
      <button onClick={() => navigate("/upload")}>Upload PDF</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
