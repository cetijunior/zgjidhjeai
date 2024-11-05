import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	ArrowRightOnRectangleIcon,
	Bars3Icon,
	HomeIcon,
	UsersIcon,
	AcademicCapIcon,
	CogIcon,
	ArrowRightIcon,
	CalculatorIcon,
	UserGroupIcon,
	BookOpenIcon,
	NewspaperIcon,
	LifebuoyIcon,
	DevicePhoneMobileIcon,
	ChevronRightIcon,
	ChevronDownIcon,
} from "@heroicons/react/24/outline";
import ProfileDropdown from "../profile/ProfileDropdown";

const Navbar = ({ isSidebarOpen, showInput, onQuestionSubmit }) => {
	const navigate = useNavigate();
	const [menuOpen, setMenuOpen] = useState(false);
	const [question, setQuestion] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
	const [resourcesOpen, setResourcesOpen] = useState(false); // State for resources submenu
	const menuRef = useRef(null);

	const handleHomeClick = (e) => {
		if (window.location.pathname === "/home") {
			e.preventDefault();
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	const handleMenuToggle = () => setMenuOpen(!menuOpen);

	const handleQuestionSubmit = () => {
		if (question.trim()) {
			onQuestionSubmit(question);
			setQuestion("");
		}
	};

	const handleCalculatorClick = () => navigate("/calculator");

	const handleLoginRedirect = () => navigate("/login");

	const handleLogout = () => {
		localStorage.removeItem("token");
		setIsLoggedIn(false);
		navigate("/login");
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setMenuOpen(false);
				setResourcesOpen(false); // Close resources submenu if clicking outside
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	useEffect(() => {
		setIsLoggedIn(!!localStorage.getItem("token"));
	}, [localStorage.getItem("token")]);

	return (
		<nav className="w-full shadow-md sm:w-auto px-4 py-2 border-b border-gray-900 flex flex-col items-center justify-between fixed top-0 left-0 right-0 z-50 bg-black">
			<div className="w-full flex items-center justify-between">
				<div className="flex items-center">
					<Link to="/home" onClick={handleHomeClick} className="transform">
						<img
							src="/assets/images/Logo.png"
							alt="App Logo"
							className="h-12 w-auto sm:h-14"
						/>
					</Link>
				</div>

				<div className="hidden md:flex justify-center items-center w-full max-w-3xl">
					{showInput && (
						<div className="flex w-2/3 border text-white border-gray-800 items-center bg-transparent rounded-full shadow-md hover:shadow-lg">
							<input
								type="text"
								value={question}
								onChange={(e) => setQuestion(e.target.value)}
								placeholder="Ask your question..."
								className="flex-grow p-3 pl-6 bg-transparent rounded-l-full focus:outline-none"
							/>
							<button
								onClick={handleCalculatorClick}
								className="p-3 text-gray-500 hover:text-blue-500"
							>
								<CalculatorIcon className="h-6 w-6" />
							</button>
							<div className="h-6 w-px bg-gray-300 mx-2"></div>
							<button
								onClick={handleQuestionSubmit}
								className="p-3 pr-6 text-blue-500 hover:text-blue-600"
							>
								<ArrowRightIcon className="h-6 w-6" />
							</button>
						</div>
					)}
				</div>

				<div className="flex items-center space-x-4">
					<button
						className="text-gray-200 hover:text-blue-400 md:hidden"
						onClick={handleMenuToggle}
					>
						<Bars3Icon className="h-6 w-6" />
					</button>

					{isLoggedIn ? (
						<div className="flex items-center transition-all duration-300 space-x-4">
							<ProfileDropdown onLogout={handleLogout} />
						</div>
					) : (
						<button
							onClick={handleLoginRedirect}
							className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-300 ease-in-out flex items-center"
						>
							<ArrowRightOnRectangleIcon className="h-6 w-6" />
							<span className="ml-2 hidden sm:inline">Login</span>
						</button>
					)}
				</div>
			</div>

			<div className="flex w-3/6 items-center justify-center mt-2 md:hidden">
				{showInput && (
					<div className="flex w-full items-center border border-gray-300 hover:border-gray-800 rounded-2xl shadow-sm p-2">
						<input
							type="text"
							value={question}
							onChange={(e) => setQuestion(e.target.value)}
							placeholder="Ask your question..."
							className="flex-grow p-2 bg-transparent focus:outline-none text-white"
						/>
						<div className="flex items-center">
							<button
								className="text-gray-300 hover:text-gray-100 mr-2"
								onClick={handleCalculatorClick}
							>
								<CalculatorIcon className="h-6 w-6" />
							</button>
							<div className="h-6 w-px bg-gray-300 mx-2"></div>
							<button
								onClick={handleQuestionSubmit}
								className="text-blue-400 hover:text-blue-300"
							>
								<ArrowRightIcon className="h-6 w-6" />
							</button>
						</div>
					</div>
				)}
			</div>

			<div
				ref={menuRef}
				className={`absolute ${showInput ? "top-[129px]" : "top-[72px]"} left-0 right-0 bg-black shadow-lg p-4 md:hidden transition-all duration-500 ease-in-out transform ${menuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
					}`}
			>
				<ul className="flex flex-col space-y-4 text-white">
					<li>
						<Link
							to="/home"
							onClick={(e) => {
								handleHomeClick(e);
								setMenuOpen(false);
							}}
							className="flex items-center text-gray-200 hover:text-blue-400"
						>
							<HomeIcon className="h-6 w-6" />
							<span className="ml-2">Home</span>
						</Link>
					</li>
					<li>
						<Link
							to="/dashboard"
							onClick={() => setMenuOpen(false)}
							className="flex items-center text-gray-200 hover:text-blue-400"
						>
							<AcademicCapIcon className="h-6 w-6" />
							<span className="ml-2">Dashboard</span>
						</Link>
					</li>
					<li>
						<Link
							to="/tutors"
							onClick={() => setMenuOpen(false)}
							className="flex items-center text-gray-200 hover:text-blue-400"
						>
							<UsersIcon className="h-6 w-6" />
							<span className="ml-2">Tutors</span>
						</Link>
					</li>
					<li>
						{/* Resources Menu Toggle */}
						<button
							onClick={() => setResourcesOpen(!resourcesOpen)}
							className="flex items-center justify-between text-gray-200 hover:text-blue-400 w-full"
						>
							<div className="flex items-center">
								<BookOpenIcon className="h-6 w-6" />
								<span className="ml-2">Resources</span>
							</div>
							{resourcesOpen ? (
								<ChevronDownIcon className="h-4 w-4" />
							) : (
								<ChevronRightIcon className="h-4 w-4" />
							)}
						</button>
						{/* Resources Submenu */}
						{resourcesOpen && (
							<ul className="pl-6 mt-2 space-y-2">
								<li>
									<Link
										to="/learning"
										onClick={() => {
											setMenuOpen(false);
											setResourcesOpen(false);
										}}
										className="flex items-center text-gray-300 hover:text-blue-400"
									>
										<UserGroupIcon className="h-5 w-5 mr-2" />
										Learning Paths
									</Link>
								</li>
								<li>
									<Link
										to="/blogs"
										onClick={() => {
											setMenuOpen(false);
											setResourcesOpen(false);
										}}
										className="flex items-center text-gray-300 hover:text-blue-400"
									>
										<NewspaperIcon className="h-5 w-5 mr-2" />
										Blogs
									</Link>
								</li>
								<li>
									<Link
										to="/support"
										onClick={() => {
											setMenuOpen(false);
											setResourcesOpen(false);
										}}
										className="flex items-center text-gray-300 hover:text-blue-400"
									>
										<LifebuoyIcon className="h-5 w-5 mr-2" />
										Support
									</Link>
								</li>
							</ul>
						)}
					</li>
					<li>
						<Link
							to="/app"
							onClick={() => setMenuOpen(false)}
							className="flex items-center text-gray-200 hover:text-blue-400"
						>
							<DevicePhoneMobileIcon className="h-6 w-6" />
							<span className="ml-2">App</span>
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
