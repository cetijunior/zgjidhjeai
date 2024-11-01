import { useState } from "react";

const UseAiService = () => {
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [message, setMessage] = useState("");

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleUseAiService = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/user/use-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAiResponse(result.response); // Display the AI response
        setMessage("AI service used successfully!");
      } else {
        setMessage("Failed to use AI service.");
      }
    } catch (error) {
      setMessage("An error occurred: " + error.message);
    }
  };

  return (
    <div>
      <h2>Use AI Service</h2>

      {/* AI Prompt Form */}
      <form onSubmit={handleUseAiService}>
        <input
          type="text"
          placeholder="Enter AI prompt"
          value={prompt}
          onChange={handlePromptChange}
        />
        <button type="submit">Submit</button>
      </form>

      {message && <p>{message}</p>}
      {aiResponse && (
        <div>
          <h3>AI Response:</h3>
          <p>{aiResponse}</p>
        </div>
      )}
    </div>
  );
};

export default UseAiService;
