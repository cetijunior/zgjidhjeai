// src/components/landing/AppExplanationSection.jsx
import { useState } from "react";
import ShootingStars from "../common/shootingStars";
import { motion, AnimatePresence } from "framer-motion";

const features = [
	{
		title: "Step-by-step",
		description: "Clear solving steps guiding you to every solution",
		icon: "📝",
		highlight:
			"Our AI breaks down complex problems into easy-to-follow steps, ensuring you understand the entire solution process. Each step is carefully explained, allowing you to grasp the logic behind the problem-solving approach. This method not only helps you solve the current problem but also builds your problem-solving skills for future challenges.",
	},
	{
		title: "Detailed explanations",
		description: 'Connect the logic behind each step with "how" and "why" tips',
		icon: "🧠",
		highlight:
			'We don\'t just give you the answer; we explain the reasoning behind each step, helping you grasp the underlying concepts. Our AI provides in-depth explanations that cover the "how" and "why" of each solution step. This approach enhances your understanding, allowing you to apply these concepts to similar problems and build a strong foundation in the subject.',
	},
	{
		title: "Fast solutions",
		description: "Our AI returns solutions in seconds",
		icon: "⚡",
		highlight:
			"No more waiting around. Get instant answers to your questions and move forward with your studies quickly. Our advanced AI algorithms process your queries in real-time, providing solutions within seconds. This rapid response time allows you to maintain your learning momentum, tackle more problems, and make efficient use of your study time.",
	},
];

const AppExplanationSection = () => {
	const [activeFeature, setActiveFeature] = useState(0);

	return (
		<section
			className="py-12 px-4 md:px-8 relative"
			style={{ background: "#000000" }}
		>
			<ShootingStars />
			<div className="max-w-7xl mx-auto relative z-10">
				<motion.h2
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 text-white"
				>
					How Our App Works
				</motion.h2>
				<div className="flex flex-col  lg:flex-row items-start lg:items-center justify-between">
					<div className="w-full lg:w-2/5 space-y-4 mb-8 lg:mb-0">
						{features.map((feature, index) => (
							<motion.button
								key={index}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className={`w-full text-left p-4 md:p-6 rounded-lg transition-all duration-300 ${activeFeature === index
									? "bg-gradient-to-l from-purple-600 to-purple-800 text-white shadow-lg"
									: "bg-gray-800 bg-opacity-50 text-gray-300 hover:bg-opacity-70"
									}`}
								onClick={() => setActiveFeature(index)}
							>
								<h3 className="text-xl md:text-2xl font-semibold mb-2 flex items-center">
									<span className="text-2xl md:text-3xl mr-3">
										{feature.icon}
									</span>{" "}
									{feature.title}
								</h3>
								<p className="text-xs md:text-sm opacity-80">
									{feature.description}
								</p>
							</motion.button>
						))}
					</div>
					<AnimatePresence mode="wait">
						<motion.div
							key={activeFeature}
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}
							transition={{ duration: 0.5 }}
							className="w-full lg:w-1/2 p-6 md:p-8 bg-gray-800 bg-opacity-50 rounded-lg shadow-xl backdrop-blur-sm"
						>
							<motion.h3
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2, duration: 0.3 }}
								className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-purple-600"
							>
								{features[activeFeature].title}
							</motion.h3>
							<motion.p
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.4, duration: 0.3 }}
								className="text-gray-300 text-base md:text-lg leading-relaxed"
							>
								{features[activeFeature].highlight}
							</motion.p>
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		</section>
	);
};

export default AppExplanationSection;
