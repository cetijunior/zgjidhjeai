// src/components/layout/ChatButton.jsx
import { useState } from "react";
import {
	ChatBubbleLeftRightIcon,
	XMarkIcon,
	TrashIcon,
	PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const ChatButton = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const predefinedQuestions = [
		{
			id: 1,
			text: "What is Zgjidhje.ai?",
			answer:
				"Zgjidhje.ai is an AI-powered educational platform that provides step-by-step solutions and explanations for various academic subjects.",
		},
		{
			id: 2,
			text: "How can I use this website?",
			answer:
				"You can use our website by entering your question in the input field on the homepage. Our AI will provide you with detailed explanations and solutions.",
		},
		{
			id: 3,
			text: "Is this service free?",
			answer:
				"We offer both free and premium features. Basic problem-solving is free, while advanced features and personalized tutoring require a subscription.",
		},
	];

	const handleQuestionClick = (id) => {
		const question = predefinedQuestions.find((q) => q.id === id);
		const newMessage = { type: "user", content: question.text };
		const newAnswer = { type: "bot", content: question.answer };
		setMessages([...messages, newMessage, newAnswer]);
	};

	const getCohereResponse = async (prompt) => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await axios.post(
				"https://api.cohere.ai/v1/generate",
				{
					model: "command-xlarge-nightly",
					prompt: prompt,
					max_tokens: 300,
					temperature: 0.3,
					k: 0,
					stop_sequences: [],
					return_likelihoods: "NONE",
				},
				{
					headers: {
						Authorization: `Bearer ${import.meta.env.VITE_COHERE_API_KEY}`,
						"Content-Type": "application/json",
					},
				}
			);

			setIsLoading(false);
			return response.data.generations[0].text.trim();
		} catch (err) {
			setIsLoading(false);
			setError("An error occurred while fetching the response.");
			console.error("Cohere API Error:", err);
			return "Sorry, I encountered an error while processing your request.";
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!inputValue.trim()) return;

		const userMessage = { type: "user", content: inputValue };
		setMessages([...messages, userMessage]);
		setInputValue("");

		const botResponse = await getCohereResponse(inputValue);
		const botMessage = { type: "bot", content: botResponse };
		setMessages((prevMessages) => [...prevMessages, botMessage]);
	};

	const handleClearChat = () => {
		setMessages([]);
	};

	return (
		<>
			<motion.button
				className="fixed z-50 bottom-6 right-6 bg-violet-700 text-white p-3 rounded-full shadow-lg hover:bg-violet-500 transition flex items-center"
				onClick={() => setIsOpen(true)}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
			>
				<ChatBubbleLeftRightIcon className="h-10 w-10" />
			</motion.button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 50 }}
						transition={{ type: "spring", stiffness: 300, damping: 30 }}
						className="fixed bottom-6 right-2 z-50 border border-gray-800 w-80 bg-white rounded-3xl shadow-xl overflow-hidden"
						style={{ background: "#000000" }}
					>
						<div className="relative z-10 p-2">
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.2 }}
								className="flex justify-between items-center p-4 border-b border-gray-700"
							>
								<h3 className="font-semibold text-white">Chat with us</h3>
								<div className="flex items-center">
									<motion.button
										onClick={handleClearChat}
										className="mr-2 text-gray-300 hover:text-white"
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
									>
										<TrashIcon className="h-5 w-5" />
									</motion.button>
									<motion.button
										onClick={() => setIsOpen(false)}
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
									>
										<XMarkIcon className="h-6 w-6 text-white" />
									</motion.button>
								</div>
							</motion.div>
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.3 }}
								className="h-80 overflow-y-auto p-4"
							>
								{messages.length === 0 && (
									<div className="mb-4">
										<p className="text-gray-300 mb-2">You can ask:</p>
										{predefinedQuestions.map((question) => (
											<motion.button
												key={question.id}
												onClick={() => handleQuestionClick(question.id)}
												className="block w-full text-left mb-2 px-3 py-2 bg-gray-800 rounded-lg text-sm hover:bg-gray-700 transition text-white"
												whileHover={{ scale: 1.05 }}
												whileTap={{ scale: 0.95 }}
											>
												{question.text}
											</motion.button>
										))}
									</div>
								)}
								{messages.map((message, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.1 }}
										className={`mb-2 ${
											message.type === "user" ? "text-right" : "text-left"
										}`}
									>
										<span
											className={`inline-block p-2 rounded-lg ${
												message.type === "user"
													? "bg-blue-600 text-white"
													: "bg-gray-700 text-white"
											}`}
										>
											{message.content}
										</span>
									</motion.div>
								))}
								{isLoading && (
									<div className="text-center text-white">Loading...</div>
								)}
								{error && <div className="text-red-400">{error}</div>}
								{messages.length > 0 && (
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.4 }}
										className="mt-4"
									>
										<p className="text-gray-300 mb-2">You can also ask:</p>
										{predefinedQuestions.map((question) => (
											<motion.button
												key={question.id}
												onClick={() => handleQuestionClick(question.id)}
												className="block w-full text-left mb-2 px-3 py-2 bg-gray-800 rounded-lg text-sm hover:bg-gray-700 transition text-white"
												whileHover={{ scale: 1.05 }}
												whileTap={{ scale: 0.95 }}
											>
												{question.text}
											</motion.button>
										))}
									</motion.div>
								)}
							</motion.div>
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.5 }}
								className="p-4 border-t border-gray-700"
							>
								<form onSubmit={handleSubmit} className="flex">
									<input
										type="text"
										value={inputValue}
										onChange={(e) => setInputValue(e.target.value)}
										placeholder="Type your message..."
										className="flex-grow p-2 border rounded-l-lg bg-gray-800 text-white border-gray-700"
									/>
									<motion.button
										type="submit"
										className="bg-blue-600 text-white p-2 rounded-r-lg"
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										<PaperAirplaneIcon className="h-5 w-5" />
									</motion.button>
								</form>
							</motion.div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default ChatButton;
