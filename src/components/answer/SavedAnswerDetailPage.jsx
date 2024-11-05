import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ClockIcon, DocumentIcon } from "@heroicons/react/24/outline";

const SavedAnswerDetailPage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { item } = location.state || {};

	const [question, setQuestion] = useState("");
	const [answer, setAnswer] = useState("");
	const [file, setFile] = useState(null);
	const [timestamp, setTimestamp] = useState("");

	useEffect(() => {
		if (item) {
			setQuestion(item.question);
			setAnswer(item.answer);
			setFile(item.file);
			setTimestamp(new Date(item.timestamp).toLocaleString());
		} else {
			alert("Error"); // Redirect if no item is passed
		}
	}, [item, navigate]);

	const handleGoBack = () => {
		navigate(-1); // Go back to the previous page
	};

	return (
		<div className="min-h-screen bg-black p-4 flex flex-col items-center">
			<div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-md">
				<h2 className="text-2xl font-bold text-purple-300 mb-4">
					Saved Answer Details
				</h2>
				<div className="mb-4">
					<h3 className="text-lg font-semibold text-white">Question:</h3>
					<p className="text-gray-300">{question}</p>
				</div>
				<div className="mb-4">
					<h3 className="text-lg font-semibold text-white">Answer:</h3>
					<p className="text-gray-300">{answer}</p>
				</div>
				{file && (
					<div className="mb-4">
						<h3 className="text-lg font-semibold text-white">File:</h3>
						<div className="flex items-center space-x-2">
							{file.type.startsWith("image/") ? (
								<img
									src={URL.createObjectURL(new Blob([file.dataUrl]))}
									alt="Uploaded File"
									className="w-24 h-24 object-cover rounded-lg"
								/>
							) : (
								<DocumentIcon className="h-24 w-24 text-purple-400" />
							)}
							<div className="text-gray-300">
								<p>{file.name}</p>
								<p className="text-xs">Type: {file.type}</p>
							</div>
						</div>
					</div>
				)}
				<div className="flex items-center text-gray-400">
					<ClockIcon className="h-4 w-4 mr-1" />
					<span>{timestamp}</span>
				</div>
				<button
					className="mt-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition duration-200"
					onClick={handleGoBack}
				>
					Go Back
				</button>
			</div>
		</div>
	);
};

export default SavedAnswerDetailPage;
