import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Tesseract from "tesseract.js";
import HistorySidebar from "../../components/answer/HistorySidebar";

const AnswerPage = () => {
	const location = useLocation();
	const { question, file } = location.state || {};

	const [input, setInput] = useState(question || "");
	const [loading, setLoading] = useState(false);
	const [uploadedFile, setUploadedFile] = useState(file || null);
	const [recognizedText, setRecognizedText] = useState("");
	const [cohereAnswer, setCohereAnswer] = useState("");
	const [history, setHistory] = useState([]);
	const [filePreview, setFilePreview] = useState(null);

	useEffect(() => {
		const savedHistory = JSON.parse(localStorage.getItem("answerHistory")) || [];
		setHistory(savedHistory);

		if (uploadedFile) {
			processUploadedFile(uploadedFile);
		} else if (input) {
			handleSolve(input);
		}
	}, [uploadedFile, input]);

	const processUploadedFile = async (file) => {
		const reader = new FileReader();
		reader.onload = async (e) => {
			const { data: { text } } = await Tesseract.recognize(e.target.result);
			setRecognizedText(text);
			handleSolve(text);
		};
		reader.readAsDataURL(file);

		if (file.type.startsWith("image/")) {
			const reader = new FileReader();
			reader.onload = () => setFilePreview(reader.result);
			reader.readAsDataURL(file);
		}
	};

	const handleSolve = async (inputText) => {
		setLoading(true);
		try {
			const apiKey = import.meta.env.VITE_COHERE_API_KEY;
			const response = await fetch("https://api.cohere.ai/v1/generate", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${apiKey}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					model: "command-xlarge-nightly",
					prompt: `Ju jeni një profesor nga Shqipëria. Ju lutem përgjigjuni pyetjes së mëposhtme në shqip rrjedhshëm: "${inputText}"`,
					max_tokens: 300,
					temperature: 0.9,
				}),
			});

			if (!response.ok) throw new Error("Failed to get response from Cohere API");
			const data = await response.json();
			const answer = data.generations[0].text;
			setCohereAnswer(answer);
			saveToHistory(inputText, uploadedFile, answer);
		} catch (error) {
			console.error("Error solving question:", error);
		} finally {
			setLoading(false);
		}
	};

	// Save question and answer to history with type distinction
	const saveToHistory = (questionText, fileData, answerText) => {
		let type;
		if (questionText && fileData) {
			type = "Text + Image";
		} else if (fileData) {
			type = "Image";
		} else {
			type = "Text";
		}

		const newHistoryItem = {
			id: Date.now(),
			type,  // Store the type of question
			question: questionText,
			file: fileData ? { name: fileData.name, type: fileData.type, dataUrl: filePreview } : null,
			answer: answerText,
			timestamp: new Date().toISOString(),
		};
		const updatedHistory = [newHistoryItem, ...history];
		localStorage.setItem("answerHistory", JSON.stringify(updatedHistory));
		setHistory(updatedHistory);
	};

	// Clear file and related data
	const clearAnswer = () => {
		setUploadedFile(null);
		setRecognizedText("");
		setInput("");
		setCohereAnswer("");
		setFilePreview(null);
	};

	const shareAnswer = () => {
		const shareText = `Question: ${input}\nAnswer: ${cohereAnswer}`;
		navigator.clipboard.writeText(shareText).then(() => alert("Answer copied to clipboard!"));
	};

	return (
		<div className="min-h-screen bg-black p-4 flex relative">
			<div className="flex-1 flex flex-col items-center relative z-10">
				<h1 className="text-gray-600 mb-8 text-center text-2xl italic font-bold leading-relaxed">
					AI Assistant
				</h1>
				<div className="bg-gray-900 bg-opacity-80 rounded-lg shadow-lg p-4 w-full max-w-4xl">
					<div className="mb-4">
						<h3 className="text-lg font-semibold text-purple-300">Question:</h3>
						<p className="text-gray-300">{input}</p>
					</div>

					{uploadedFile && (
						<div className="mt-4">
							<h3 className="text-lg font-semibold text-purple-300">Uploaded File:</h3>
							{filePreview ? (
								<img src={filePreview} alt="File Preview" className="mt-2 h-full rounded-md" />
							) : (
								<p className="text-gray-400">File uploaded: {uploadedFile.name}</p>
							)}
							{recognizedText && (
								<div className="mt-4">
									<h3 className="text-lg font-semibold text-purple-300">Scanned Text:</h3>
									<p className="text-gray-300">{recognizedText}</p>
								</div>
							)}
						</div>
					)}

					<AnimatePresence>
						{loading && (
							<motion.div
								className="mt-4 flex items-center justify-center"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.3 }}
							>
								<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
								<p className="ml-2 text-sm text-purple-400">Processing with AI...</p>
							</motion.div>
						)}
						{cohereAnswer && (
							<motion.div
								className="mt-6 p-6 bg-purple-900 rounded-xl shadow-md w-full"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3 }}
							>
								<h3 className="text-xl font-bold mb-3 text-purple-200">AI Answer:</h3>
								<p className="text-purple-300">{cohereAnswer}</p>
								<div className="flex justify-end mt-4 space-x-4">
									<button
										className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
										onClick={() => saveToHistory(input, uploadedFile, cohereAnswer)}
									>
										Save
									</button>
									<button
										className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
										onClick={shareAnswer}
									>
										Share
									</button>
									<button
										className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
										onClick={clearAnswer}
									>
										Clear
									</button>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
			<HistorySidebar onLoadItem={(item) => {
				setInput(item.question);
				setCohereAnswer(item.answer);
				setUploadedFile(item.file);
			}} />
		</div>
	);
};

export default AnswerPage;
