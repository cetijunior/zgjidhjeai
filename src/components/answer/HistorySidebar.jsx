import React, { useEffect, useState } from "react";
import SavedAnswerCard from "./SavedAnswerCard";

const HistorySidebar = ({ onLoadItem }) => {
	const [history, setHistory] = useState([]);

	useEffect(() => {
		const savedHistory = JSON.parse(localStorage.getItem("answerHistory")) || [];
		setHistory(savedHistory);
	}, []);

	return (
		<div className="w-64 bg-gray-900 bg-opacity-80 p-4 rounded-lg ml-4 overflow-y-auto max-h-screen">
			<h2 className="text-xl font-bold text-purple-300 mb-4">History</h2>
			{history.map((item) => (
				<SavedAnswerCard
					key={item.id}
					item={item}
					onClick={() => onLoadItem(item)}
				/>
			))}
			{history.length === 0 && (
				<p className="text-gray-400">No history available.</p>
			)}
		</div>
	);
};

export default HistorySidebar;
