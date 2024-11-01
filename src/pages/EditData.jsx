import { useEffect, useState } from "react";

function EditData() {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [aiSolution, setAiSolution] = useState("");
  const [message, setMessage] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [updateId, setUpdateId] = useState("");
  const [newContent, setNewContent] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [allDataItems, setAllDataItems] = useState([]); // Store all data items
  const [uploadFile, setUploadFile] = useState(null);
  // Fetch all data items

  useEffect(() => {
    const fetchDataItems = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("http://localhost:5000/api/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAllDataItems(data.data.files); // Assuming 'files' contains all data items
        } else {
          console.error("Failed to fetch data items.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchDataItems();
  }, []);

  // Upload File
  const handleUploadFile = async (e) => {
    e.preventDefault();

    if (!uploadFile) {
      setMessage("Please select a file to upload.");
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", uploadFile); // Key "file" should match backend's expected key

    try {
      const response = await fetch("http://localhost:5000/api/user/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Only Authorization header for multipart/form-data
        },
        body: formData, // FormData automatically sets content-type to multipart/form-data
      });

      if (response.ok) {
        const result = await response.json();
        setMessage("File uploaded successfully.");
        setUploadFile(null); // Clear the selected file after success
        console.log("Uploaded file info:", result.data);
      } else {
        const errorData = await response.json();
        setMessage(
          `Failed to upload file: ${errorData.message || response.statusText}`
        );
      }
    } catch (error) {
      setMessage("An error occurred: " + error.message);
    }
  };

  const handleFileChangeUpload = (e) => {
    setUploadFile(e.target.files[0]); // Ensure the first file is selected
  };

  // Delete Data by ID
  const handleDeleteData = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:5000/api/user/${deleteId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setMessage("Data deleted successfully.");
        setDeleteId("");
      } else {
        setMessage("Failed to delete data.");
      }
    } catch (error) {
      setMessage("An error occurred: " + error.message);
    }
  };

  // Update Data by ID
  const handleUpdateData = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:5000/api/user/${updateId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: newContent,
          }),
        }
      );

      if (response.ok) {
        setMessage("Data updated successfully.");
        setUpdateId("");
        setNewContent("");
      } else {
        setMessage("Failed to update data.");
      }
    } catch (error) {
      setMessage("An error occurred: " + error.message);
    }
  };

  // Delete Profile Picture
  const handleDeleteProfilePicture = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://localhost:5000/api/user/profile-picture",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setMessage("Profile picture deleted successfully.");
      } else {
        setMessage("Failed to delete profile picture.");
      }
    } catch (error) {
      setMessage("An error occurred: " + error.message);
    }
  };

  // Handle Profile Picture Change
  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  // Upload Profile Picture
  const handleUploadProfilePicture = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("file", profilePicture);

    try {
      const response = await fetch(
        "http://localhost:5000/api/user/profile-picture/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        setMessage("Profile picture uploaded successfully.");
      } else {
        setMessage("Failed to upload profile picture.");
      }
    } catch (error) {
      setMessage("An error occurred: " + error.message);
    }
  };

  // Handle File Change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Upload Package
  const handleUploadPackage = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("file", file);
    formData.append("extractedText", extractedText);
    formData.append("aiSolution", aiSolution);

    try {
      const response = await fetch(
        "http://localhost:5000/api/user/upload-package",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        setMessage("Package uploaded successfully.");
      } else {
        setMessage("Failed to upload package.");
      }
    } catch (error) {
      setMessage("An error occurred: " + error.message);
    }
  };

  // Go Back
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div>
      <h2>Edit Data</h2>
      <button onClick={handleGoBack}>Go back</button>
      {/* Upload Package Form */}
      <form onSubmit={handleUploadPackage}>
        <h3>Upload Package</h3>

        <input type="file" onChange={handleFileChange} required />

        <input
          type="text"
          placeholder="Extracted Text"
          value={extractedText}
          onChange={(e) => setExtractedText(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="AI Solution"
          value={aiSolution}
          onChange={(e) => setAiSolution(e.target.value)}
          required
        />

        <button type="submit">Upload Package</button>
      </form>

      {/* Upload Profile Picture Form */}
      <form onSubmit={handleUploadProfilePicture}>
        <h3>Upload Profile Picture</h3>

        <input type="file" onChange={handleProfilePictureChange} required />

        <button type="submit">Upload Profile Picture</button>
      </form>

      {/* Delete Profile Picture Button */}
      <button onClick={handleDeleteProfilePicture}>
        Delete Profile Picture
      </button>

      {/* Update Data by ID Form */}
      <form onSubmit={handleUpdateData}>
        <h3>Update Existing Data</h3>
        <label>
          Select Data ID:
          <select
            value={updateId}
            onChange={(e) => setUpdateId(e.target.value)}
            required
            style={{ maxHeight: "100px", overflowY: "auto" }} // Scrollable dropdown
          >
            <option value="" disabled>
              Select a data item
            </option>
            {allDataItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.fileInfo?.originalName || item.id} {/* Show name or ID */}
              </option>
            ))}
          </select>
        </label>

        <input
          type="text"
          placeholder="New Content"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          required
        />

        <button type="submit">Update Data</button>
      </form>

      {/* Delete Data by ID Form */}
      <form onSubmit={handleDeleteData}>
        <h3>Delete Data</h3>
        <label>
          Select Data ID:
          <select
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
            required
            style={{ maxHeight: "100px", overflowY: "auto" }} // Scrollable dropdown
          >
            <option value="" disabled>
              Select a data item
            </option>
            {allDataItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.fileInfo?.originalName || item.id} {/* Show name or ID */}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Delete Data</button>
      </form>

      {/* Upload File Form */}
      <form onSubmit={handleUploadFile}>
        <h3>Upload File</h3>

        <input type="file" onChange={handleFileChangeUpload} required />

        <button type="submit">Upload File</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default EditData;
