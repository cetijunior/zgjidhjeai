import { useState } from "react";
import { XCircleIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Tesseract from "tesseract.js";
import {
	ArrowUpTrayIcon,
	DocumentIcon,
	PhotoIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const UploadSection = () => {
	const [recognizedText, setRecognizedText] = useState("");
	const [uploadedFile, setUploadedFile] = useState(null);
	const [previewUrl, setPreviewUrl] = useState(null);
	const [cohereAnswer, setCohereAnswer] = useState("");
	const [isUploading, setIsUploading] = useState(false);
	const [isRecognizing, setIsRecognizing] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);
	const [editableText, setEditableText] = useState("");

	const handleFileUpload = async (event) => {
		const file = event.target.files[0];
		if (file) {
			setIsUploading(true);
			setUploadedFile(file);
			const reader = new FileReader();
			reader.onload = async (e) => {
				setPreviewUrl(e.target.result);
				setIsUploading(false);
				setIsRecognizing(true);
				const {
					data: { text },
				} = await Tesseract.recognize(e.target.result);
				setRecognizedText(text);
				setEditableText(text);
				setIsRecognizing(false);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleRemoveFile = () => {
		setUploadedFile(null);
		setRecognizedText("");
		setEditableText("");
		setPreviewUrl(null);
		setCohereAnswer("");
		// Reset the file input
		document.getElementById("fileUpload").value = null;
	};

	const handleProcessText = async () => {
		await getAnswerFromCohere(editableText);
	};

	const getAnswerFromCohere = async (text) => {
		setIsProcessing(true);
		try {
			const apiKey = import.meta.env.VITE_COHERE_API_KEY;
			if (!apiKey) {
				throw new Error("Cohere API key is not set");
			}

			const response = await fetch("https://api.cohere.ai/v1/generate", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${apiKey}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					model: "command-xlarge-nightly",
					prompt: `Ju jeni një profesor nga Shqipëria. Ju lutem analizoni dhe përgjigjuni tekstit të mëposhtëm në shqip rrjedhshëm, duke u përpjekur të jeni sa më i qartë dhe konciz që të jetë e mundur: "${text}"`,
					max_tokens: 200,
					temperature: 0.4,
					k: 0,
					stop_sequences: [],
					return_likelihoods: "NONE",
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to get response from Cohere API");
			}

			const data = await response.json();
			const answer = data.generations[0].text;
			setCohereAnswer(answer);
		} catch (error) {
			console.error("Error processing text:", error);
			setCohereAnswer(
				"Ndodhi një gabim gjatë përpunimit të tekstit tuaj. " + error.message
			);
		} finally {
			setIsProcessing(false);
		}
	};

	return (
		<motion.div
			className="flex flex-col items-center justify-center lg:w-3/4 max-w-4xl mx-auto mb-8 rounded-3xl shadow-lg bg-gray-900 text-white p-6"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 20 }}
			transition={{ duration: 0.5 }}
		>
			{!uploadedFile ? (
				<label
					htmlFor="fileUpload"
					className="flex flex-col w-full items-center justify-center h-64 border-2 border-purple-600 border-dashed rounded-xl cursor-pointer hover:border-purple-400 transition duration-300 ease-in-out group"
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
					<input
						type="file"
						id="fileUpload"
						className="hidden"
						onChange={handleFileUpload}
						accept="image/*,.pdf"
					/>
				</label>
			) : (
				<div className="w-full p-6 bg-gray-800 rounded-xl shadow-inner">
					<h4 className="text-lg font-semibold mb-4 text-purple-300">
						Preview:
					</h4>
					<div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-gray-700 p-4 rounded-lg">
						<div className="flex items-center space-x-4 mb-4 md:mb-0">
							{previewUrl && (
								<div className="w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-lg shadow-md">
									{uploadedFile.type.startsWith("image/") ? (
										<img
											src={previewUrl}
											alt="Uploaded file preview"
											className="w-full h-full object-cover"
										/>
									) : (
										<div className="w-full h-full flex items-center justify-center bg-gray-600 text-purple-400">
											<DocumentIcon className="h-10 w-10 md:h-12 md:w-12" />
										</div>
									)}
								</div>
							)}
							<div className="flex flex-col">
								<span className="text-sm font-medium text-gray-200 mb-1">
									{uploadedFile.name}
								</span>
								<span className="text-xs text-gray-400">
									Type: {uploadedFile.type}
								</span>
								<span className="text-xs text-gray-400">
									Size: {(uploadedFile.size / 1024).toFixed(2)} KB
								</span>
							</div>
						</div>
						<div className="flex space-x-2">
							<button
								onClick={handleRemoveFile}
								className="p-2 bg-red-600 rounded-full text-red-100 hover:bg-red-700 transition duration-300"
							>
								<XCircleIcon className="w-5 h-5" />
							</button>
						</div>
					</div>
					{isUploading && (
						<p className="text-sm text-purple-400 mt-3">Uploading file...</p>
					)}
				</div>
			)}

			{isRecognizing && (
				<p className="mt-4 text-sm text-purple-400">Recognizing text...</p>
			)}
			{recognizedText && (
				<div className="flex flex-col mt-6 p-6 bg-gray-800 rounded-xl shadow-md w-full">
					<div className="flex flex-row items-center justify-between">
						<h3 className="text-xl font-bold mb-3 text-purple-300">
							Recognized Text:
						</h3>
						<h3 className="text-xl font-bold mb-3 text-purple-300">
							*Editable
						</h3>
					</div>
					<textarea
						className="w-full p-2 border border-purple-600 rounded-md bg-gray-700 text-white"
						rows="5"
						value={editableText}
						onChange={(e) => setEditableText(e.target.value)}
					/>
					<button
						className="mt-4 flex flex-row justify-center items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
						onClick={handleProcessText}
					>
						<p>Get AI Answer</p>
						<ChevronRightIcon className="w-5 h-5" />
					</button>
				</div>
			)}
			{isProcessing && (
				<div className="mt-4 flex items-center justify-center">
					<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
					<p className="ml-2 text-sm text-purple-400">Processing with AI...</p>
				</div>
			)}
			{cohereAnswer && (
				<div className="mt-6 p-6 bg-purple-900 rounded-xl shadow-md w-full">
					<h3 className="text-xl font-bold mb-3 text-purple-200">
						AI Analysis:
					</h3>
					<p className="text-purple-300">{cohereAnswer}</p>
				</div>
			)}
		</motion.div>
	);
};

export default UploadSection;
