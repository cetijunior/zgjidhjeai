import { useState, useRef, useEffect } from "react";
import {
	UserCircleIcon,
	ArrowRightOnRectangleIcon,
	QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const ProfileDropdown = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [userData, setUserData] = useState(null);
	const dropdownRef = useRef(null);

	useEffect(() => {
		const fetchUserData = async () => {
			const token = localStorage.getItem("token");
			const response = await fetch("http://localhost:5000/api/user/profile", {
				method: "GET",
				headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
			});
			const data = await response.json();
			setUserData(data.profile);
		};
		fetchUserData();
	}, []);

	const toggleDropdown = () => setIsOpen(!isOpen);

	const handleLogout = () => {
		localStorage.removeItem("token");
		setIsOpen(false);
		window.location.reload();
	};

	const renderTokenInfo = () => {
		if (!userData) return null;
		const isPremium = userData.plan === "premium";

		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2 }}
				className={`mt-4 w-full rounded-xl p-4 text-center ${isPremium ? "bg-gradient-to-r from-purple-500 to-indigo-500" : "bg-gray-800"
					}`}
			>
				<h3 className="text-sm font-semibold text-gray-300 mb-1">
					{isPremium ? "Unlimited Tokens" : "Available Tokens"}
				</h3>
				<p className={`text-lg font-bold ${isPremium ? "text-white" : "text-blue-400"}`}>
					{isPremium ? "∞" : userData.tokensLeft || "0"}
				</p>
				{!isPremium && (
					<p className="text-xs text-gray-500">
						{userData.nextRefillTime
							? <div>{userData.nextRefillTime} </div>
							: "Refills based on plan"}
					</p>
				)}
			</motion.div>
		);
	};

	return (
		<div className="relative" ref={dropdownRef}>
			<motion.button
				onClick={toggleDropdown}
				className="focus:outline-none"
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.95 }}
			>
				{userData?.profilePictureUrl ? (
					<img
						src={userData.profilePictureUrl}
						alt="Profile"
						className="h-8 w-8 object-cover border-2 border-blue-500 rounded-full"
					/>
				) : (
					<UserCircleIcon className="h-8 w-8 text-gray-300 hover:text-blue-400" />
				)}
			</motion.button>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.2 }}
						className="absolute right-0 mt-6 w-80 bg-gradient-to-b from-black to-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-700"
					>
						<div className="relative z-10">
							{/* Profile Header Section */}
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.1 }}
								className="p-4 flex justify-between items-center border-b border-gray-700"
							>
								<div className="flex items-center space-x-3">
									{userData?.profilePictureUrl ? (
										<Link to="/profile">
											<motion.img
												src={userData.profilePictureUrl}

												alt="Profile"
												className="w-10 h-10 object-cover rounded-full border-4 border-blue-500"
												whileHover={{ scale: 1.1 }}
											/>
										</Link>
									) : (
										<Link to="/profile">
											<motion.span
												whileHover={{ scale: 1.1 }}
												className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg font-semibold shadow-inner"
											>
												{userData?.username[0]}
											</motion.span>
										</Link>
									)}
									<div className="text-left">
										<span className="text-gray-200 font-medium text-lg">{userData?.username || "User"}</span>
										<p className="text-gray-400 text-sm">{userData?.email || "email@example.com"}</p>
									</div>
								</div>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-full hover:bg-red-600 transition-colors duration-200 shadow-md"
								>
									GET APP
								</motion.button>
							</motion.div>

							{/* Token Information Section */}
							{renderTokenInfo()}

							{/* Plan Information */}
							<div className="px-4 py-3">
								<div className="flex justify-between items-center">
									<h3 className="text-sm font-semibold text-gray-400">Subscription Plan</h3>
									<span className={`text-sm font-medium ${userData?.plan === "premium" ? "text-indigo-400" : "text-gray-300"}`}>
										{userData?.plan.charAt(0).toUpperCase() + userData?.plan.slice(1) || "Free"}
									</span>
								</div>
								{userData?.plan !== "premium" && (
									<p className="text-xs text-gray-500 mt-1">Upgrade to Premium for unlimited tokens</p>
								)}
							</div>

							{/* Links to Account Pages */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.3 }}
								className="px-4 py-3 border-t border-gray-700"
							>
								<h3 className="text-sm font-semibold text-gray-400 mb-2">My Account</h3>
								<div>
									<Link
										to="/your-data"
										className="flex justify-between items-center text-gray-300 rounded-md py-2 px-2 hover:bg-gray-700 transition-colors duration-200"
									>
										<span>Search History</span>
										<ChevronRightIcon className="h-5 w-5 text-gray-500" />
									</Link>
									<Link
										to="/edit-data"
										className="flex justify-between items-center text-gray-300 rounded-md py-2 px-2 hover:bg-gray-700 transition-colors duration-200"
									>
										<span>Edit Data</span>
										<ChevronRightIcon className="h-5 w-5 text-gray-500" />
									</Link>
								</div>
							</motion.div>

							{/* Sign Out Section */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.5 }}
								className="px-4 py-3 border-t border-gray-700"
							>
								<div
									onClick={handleLogout}
									className="flex items-center cursor-pointer text-red-400 rounded-md py-2 px-2 hover:bg-red-700 transition-colors duration-200"
								>
									<ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
									Sign out
								</div>
							</motion.div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default ProfileDropdown;
