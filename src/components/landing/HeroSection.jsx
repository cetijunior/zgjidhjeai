import AIAssistantSection from "./AIAssistantSection";
import ShootingStars from "../common/shootingStars";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
	const navigate = useNavigate();

	const handleSubmit = (question, file) => {
		navigate("/answer", { state: { question, file } });
	};

	return (
		<section
			id="hero-section"
			className="flex flex-col -sm:mb-0 -mb-10 items-center justify-center min-h-screen  py-6 space-y-4 text-gray-900 relative overflow-hidden bg-black"
		>
			<ShootingStars />
			<div className="flex flex-col items-center justify-center w-full max-w-4xl px-4 sm:px-8 md:px-0">
				<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-center text-white">
					Your <span className="text-[#cb6ce6]">AI</span> Homework <span className="text-[#cb6ce6]">Helper</span>
				</h1>
				<img
					className="w-32 h-auto sm:w-48 md:w-56 lg:w-64 xl:w-72 mt-4"
					src="assets/images/Logo.png"
					alt="logo"
				/>
				<motion.div
					className="flex flex-col mt-6 items-center  px-4 sm:px-8 md:w-[90%] lg:w-[800%] xl:w-[100%] justify-center z-10"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<AIAssistantSection />
				</motion.div>
			</div>
		</section>
	);
};

export default HeroSection;
