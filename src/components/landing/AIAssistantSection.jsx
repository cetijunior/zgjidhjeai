import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CalculatorIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import {
	ArrowUpTrayIcon,
	DocumentIcon,
	PhotoIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const AIAssistantSection = () => {
	const navigate = useNavigate();
	const [question, setQuestion] = useState("");
	const [uploadedFile, setUploadedFile] = useState(null);
	const [filePreview, setFilePreview] = useState(null);
	const [confirmation, setConfirmation] = useState(null);

	// Load the saved question and uploadedFile when the component is mounted (on page refresh)
	useEffect(() => {
		const savedData = JSON.parse(localStorage.getItem("lastData"));
		if (savedData) {
			setQuestion(savedData.question || "");
			setUploadedFile(savedData.file || null);
		}
	}, []);

	// Handle the submission of question and file
	const handleSubmit = () => {
		if (question.trim() || uploadedFile) {
			// Store the data in local storage
			localStorage.setItem(
				"lastData",
				JSON.stringify({ question, file: uploadedFile })
			);
			// Navigate to the AnswerPage with question and file data
			navigate("/answer", { state: { question, file: uploadedFile } });
		}
	};

	// Handle file upload and set preview
	const handleFileUpload = (event) => {
		const file = event.target.files[0];
		if (file) {
			setUploadedFile(file);
			setConfirmation("File uploaded successfully!");

			// Create a preview for images only
			if (file.type.startsWith("image/")) {
				const reader = new FileReader();
				reader.onload = () => setFilePreview(reader.result);
				reader.readAsDataURL(file);
			} else {
				setFilePreview(null);
			}
		}
	};

	// Navigate to calculator page (if needed)
	const handleCalculatorClick = () => {
		navigate("/calculator");
	};

	return (
		<motion.div
			className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto mb-8 rounded-3xl shadow-lg bg-gray-900 text-white p-6"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<motion.div
				className="w-full mb-6"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
			>
				<div className="flex items-center w-full border border-purple-600 hover:border-purple-400 rounded-2xl shadow-sm p-2">
					<input
						type="text"
						placeholder="Shkruani pyetjen tuaj..."
						className="flex-grow p-2 bg-transparent text-white focus:outline-none"
						value={question}
						onChange={(e) => setQuestion(e.target.value)}
					/>
					<div className="flex items-center">
						<button
							className="text-purple-400 hover:text-purple-300"
							onClick={handleCalculatorClick}
						>
							<CalculatorIcon className="h-6 w-6" />
						</button>
						<div className="h-6 w-px bg-purple-600 mx-2"></div>
						<button
							className="text-purple-400 hover:text-purple-300"
							onClick={handleSubmit}
						>
							<ArrowRightIcon className="h-6 w-6" />
						</button>
					</div>
				</div>
			</motion.div>

			{filePreview ? (
				<motion.div
					className="flex flex-col w-full items-center justify-center h-64 border-2 border-purple-600 border-dashed rounded-xl cursor-pointer hover:border-purple-400 transition duration-300 ease-in-out group"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, delay: 0.1 }}
				>
					{/* Show the file preview */}
					<img
						src={filePreview}
						alt="File Preview"
						className="h-64 rounded-xl"
					/>
					<p className="text-center text-gray-400 mt-2">File Uploaded</p>
				</motion.div>
			) : (
				<motion.label
					htmlFor="fileUpload"
					className="flex flex-col w-full items-center justify-center h-64 border-2 border-purple-600 border-dashed rounded-xl cursor-pointer hover:border-purple-400 transition duration-300 ease-in-out group"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, delay: 0.1 }}
				>
					<div className="flex flex-col justify-center items-center space-x-2 mb-4">
						<div className="flex flex-row justify-center items-center space-x-2">
							<PhotoIcon className="h-8 w-8 text-purple-400" />
							<DocumentIcon className="h-8 w-8 text-purple-400" />
							<ArrowUpTrayIcon className="h-8 w-8 text-purple-400" />
						</div>
						<div className="text-center">
							<p className="text-center text-gray-400 mb-2 group-hover:text-purple-200 transition-colors duration-300">
								Upload{" "}
								<span className="font-semibold hover:underline hover:decoration-purple-500">
									Image
								</span>{" "}
								or{" "}
								<span className="font-semibold hover:underline hover:decoration-purple-500">
									PDF
								</span>{" "}
								to solve questions in it
							</p>
							<p className="text-center text-gray-500 text-sm group-hover:text-purple-400 transition-colors duration-300">
								Ctrl{" "}
								<span className="inline-block border border-purple-600 rounded px-1">
									⌘
								</span>{" "}
								+{" "}
								<span className="inline-block border border-purple-600 rounded px-1">
									V
								</span>{" "}
								to paste
							</p>
						</div>
					</div>
				</motion.label>
			)}

			{confirmation && <p className="text-green-500 mt-2">{confirmation}</p>}

			<input
				type="file"
				id="fileUpload"
				className="hidden"
				onChange={handleFileUpload}
				accept="image/*,.pdf"
			/>
		</motion.div>
	);
};

export default AIAssistantSection;
