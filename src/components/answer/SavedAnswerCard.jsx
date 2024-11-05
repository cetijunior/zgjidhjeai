import React from "react";
import { motion } from "framer-motion";
import { ClockIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

const SavedAnswerCard = ({ item, onClick }) => {
	return (
		<motion.div
			className="bg-gray-800 p-3 rounded-md mb-3 cursor-pointer hover:bg-gray-700 transition-colors duration-200"
			onClick={() => onClick(item)}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			<div className="flex items-center mb-2">
				{item.file?.dataUrl ? (
					<img
						src={item.file.dataUrl}
						alt="Preview"
						className="h-8 w-8 object-cover rounded-sm mr-2"
					/>
				) : (
					<DocumentTextIcon className="h-8 w-8 text-purple-400 mr-2" />
				)}
				<p className="text-sm text-purple-200 truncate">{item.question || "Image Only"}</p>
			</div>
			<div className="flex items-center text-xs text-gray-400">
				<ClockIcon className="h-3 w-3 mr-1" />
				<p>{new Date(item.timestamp).toLocaleString()}</p>
			</div>
		</motion.div>
	);
};

export default SavedAnswerCard;
