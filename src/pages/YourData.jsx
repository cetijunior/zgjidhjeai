import { useState, useEffect } from "react";

const YourData = () => {
	const [userData, setUserData] = useState(null);
	const [additionalData, setAdditionalData] = useState(null);
	const [error, setError] = useState("");

	// Fetch user profile data
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const token = localStorage.getItem("token");
				if (!token) throw new Error("No token found. Please log in.");

				const response = await fetch("http://localhost:5000/api/user/profile", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.message || "Failed to fetch user profile.");
				}

				const data = await response.json();
				setUserData(data.profile); // Set only the profile object
				console.log(data.profile)
			} catch (error) {
				console.error("Error fetching user profile:", error.message);
				setError(error.message);
			}
		};
		fetchUserData();
	}, []);

	// Fetch additional data (files, aiAnswers, packages)
	useEffect(() => {
		const fetchAdditionalData = async () => {
			try {
				const token = localStorage.getItem("token");
				if (!token) throw new Error("No token found. Please log in.");

				const response = await fetch("http://localhost:5000/api/user", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(
						errorData.message || "Failed to fetch additional data."
					);
				}

				const data = await response.json();
				setAdditionalData(data.data); // Set the 'data' object containing files, aiAnswers, and packages
				console.log(data.data)
			} catch (error) {
				console.error("Error fetching additional data:", error.message);
				setError(error.message);
			}
		};
		fetchAdditionalData();
	}, []);

	const handleBackButton = () => {
		window.history.back();
	};

	return (
		<div className="ml-52 mt-10">
			<h2>User Profile</h2>
			<button onClick={handleBackButton}>Go back</button>

			{error && <p style={{ color: "red" }}>Error: {error}</p>}

			{userData ? (
				<div>
					{userData.profilePictureUrl && (
						<img
							src={userData.profilePictureUrl}
							alt="Profile"
							style={{
								width: "150px",
								height: "150px",
								borderRadius: "50%",
								marginBottom: "20px",
							}}
						/>
					)}
					<p>
						<strong>Username:</strong> {userData.username}
					</p>
					<p>
						<strong>Email:</strong> {userData.email}
					</p>
					<p>
						<strong>Plan:</strong> {userData.plan}
					</p>
					<p>
						<strong>Tokens Left:</strong> {userData.tokensLeft}
					</p>
					<p>
						<strong>Next Refill Time:</strong> {userData.nextRefillTime}
					</p>
				</div>
			) : (
				<p>Loading profile...</p>
			)}

			{additionalData ? (
				<div>
					{/* Files Section */}
					<div>
						<h3>Files</h3>
						{additionalData.files.length > 0 ? (
							additionalData.files.map((file) => {
								const isImage = /image/.test(file.fileInfo?.mimeType);
								const isPDF = /pdf/.test(file.fileInfo?.mimeType);
								return (
									<div key={file._id} style={{ marginBottom: "20px" }}>
										<p>
											<strong>
												{file.fileInfo?.originalName || "Unknown File"}
											</strong>{" "}
											(Uploaded on:{" "}
											{new Date(file.createdAt).toLocaleDateString()} )
										</p>
										{isImage ? (
											<img
												src={
													file.content.startsWith("http")
														? file.content
														: `http://localhost:5000/${file.content}`
												}
												alt={file.fileInfo?.originalName}
												style={{ width: "200px", height: "auto" }}
											/>
										) : isPDF ? (
											<iframe
												src={
													file.content.startsWith("http")
														? file.content
														: `http://localhost:5000/${file.content}`
												}
												title={file.fileInfo?.originalName}
												style={{
													width: "100%",
													height: "500px",
													border: "none",
												}}
											/>
										) : (
											<a
												href={file.content}
												target="_blank"
												rel="noopener noreferrer"
											>
												View File
											</a>
										)}
									</div>
								);
							})
						) : (
							<p>No files uploaded.</p>
						)}
					</div>

					{/* AI Answers Section */}
					<div>
						<h3>AI Answers</h3>
						{additionalData.aiAnswers.length > 0 ? (
							additionalData.aiAnswers.map((answer) => (
								<div key={answer.id}>
									<p>{answer.content}</p>
									<p>
										<small>
											Answered on:{" "}
											{new Date(answer.createdAt).toLocaleDateString()}
										</small>
									</p>
								</div>
							))
						) : (
							<p>No AI answers available.</p>
						)}
					</div>

					{/* Packages Section */}
					<div>
						<h3>Packages</h3>
						{additionalData.packages.length > 0 ? (
							additionalData.packages.map((pkg) => (
								<div key={pkg.id} style={{ marginBottom: "20px" }}>
									<p>
										<strong>
											{pkg.pdf?.originalName || "Unknown Package"}
										</strong>{" "}
										(Uploaded on: {new Date(pkg.createdAt).toLocaleDateString()}
										)
									</p>
									{pkg.pdf?.mimeType?.startsWith("image") ? (
										<img
											src={pkg.pdf.url}
											alt={pkg.pdf.originalName}
											style={{ width: "200px", height: "auto" }}
										/>
									) : (
										<object
											data={pkg.pdf?.url || ""}
											type="application/pdf"
											width="100%"
											height="100%"
										>
											<p>
												Alternative text - include a link{" "}
												<a href={pkg.pdf?.url || "#"}>to the PDF!</a>
											</p>
										</object>
									)}
									<p>
										<strong>Extracted Text:</strong>{" "}
										{pkg.extractedText || "No extracted text available"}
									</p>
									<p>
										<strong>AI Solution:</strong>{" "}
										{pkg.aiSolution || "No AI solution available"}
									</p>
								</div>
							))
						) : (
							<p>No packages available.</p>
						)}
					</div>
				</div>
			) : (
				<p>Loading additional data...</p>
			)}
		</div>
	);
};

export default YourData;
