import { useNavigate } from "react-router-dom";
import api from "../api/api";

const ChangePlan = () => {
  const navigate = useNavigate();

  const handlePlanChange = async (plan) => {
    if (
      window.confirm(`Are you sure you want to switch to the ${plan} plan?`)
    ) {
      try {
        await api.put("/user/update-plan", { plan });
        alert(`Plan updated to ${plan} successfully`);
        navigate("/profile"); // Navigate to Profile to see updated plan
      } catch (error) {
        console.error("Failed to update plan:", error);
      }
    }
  };

  return (
    <div>
      <h2>Change Subscription Plan</h2>
      <button onClick={() => handlePlanChange("student")}>
        Switch to Student Plan
      </button>
      <button onClick={() => handlePlanChange("premium")}>
        Switch to Premium Plan
      </button>
    </div>
  );
};

export default ChangePlan;
