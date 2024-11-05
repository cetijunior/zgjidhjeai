// Import necessary libraries and components
import { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ChatButton from "./components/Layout/ChatButton";
import Sidebar from "./components/Layout/Sidebar";

import BgUI from "./components/common/BgUI";


import LandingPage from "./pages/landing/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import FindTutorPage from "./pages/resources/tutoring/FindTutorPage";
import LearningPathPage from "./pages/resources/learning/LearningPathPage";
import BlogListPage from "./pages/resources/learning/BlogListPage";
import SupportPage from "./pages/resources/support/SupportPage";
import CalculatorPage from "./pages/calculator/CalculatorPage";
import AnswerPage from "./pages/answer/AnswerPage";
import SavedAnswerDetailPage from "./components/answer/SavedAnswerDetailPage";
import YourData from "./pages/YourData";
import ProfilePage from "./pages/profile/ProfilePage";
import EditData from "./pages/EditData";
import ResourcePage from "./pages/resources/ResourcePage"; // Updated the path for ResourcePage
import MobileAppPage from "./pages/mobile/MobileAppPage";

function App() {
	// State for managing sidebar open/close
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	// State for showing/hiding input in Navbar
	const [showNavbarInput, setShowNavbarInput] = useState(false);
	// To track the current route path
	const location = useLocation();

	// Toggle sidebar open/close
	const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

	// Show/hide Navbar input based on hero section visibility
	useEffect(() => {
		const heroQuestionInput = document.getElementById("question-input");

		if (heroQuestionInput) {
			// Intersection observer to detect hero section visibility
			const observer = new IntersectionObserver(
				([entry]) => {
					setShowNavbarInput(!entry.isIntersecting);
				},
				{ threshold: 0 }
			);

			observer.observe(heroQuestionInput);

			// Cleanup observer on component unmount
			return () => {
				observer.unobserve(heroQuestionInput);
			};
		}
	}, []);

	// Define which routes should display layout components (sidebar, navbar, footer, etc.)
	const layoutRoutes = [
		"/",
		"/home",

		"/profile",

		"/pdf-helper",
		"/dashboard",
		"/writing-helper",
		"/tutors",
		"/calculator",
		"/resources",
		"/learning",
		"/support",
		"/blogs",
		"/faq",
		"/answer",
		"/answer-detail",

		"/app",

		"/your-data",
		"/edit-data",
	];

	// Check if the current route is part of the defined layout routes
	const showLayout = layoutRoutes.includes(location.pathname);

	return (
		<div className="flex bg-black">
			{/* Conditionally render Sidebar if route is in layoutRoutes */}
			{showLayout && (
				<Sidebar
					isOpen={isSidebarOpen}
					toggleSidebar={toggleSidebar}
					className="hidden md:block"
				/>
			)}
			<div
				className={`flex flex-col bg-black flex-grow transition-all duration-500 ease-in-out
					${isSidebarOpen && showLayout ? " md:ml-52 lg:ml-60" : " md:pl-3 lg:pl-20"}
				`}
			>
				{/* Conditionally render Navbar if route is in layoutRoutes */}
				{showLayout && (
					<Navbar
						isSidebarOpen={isSidebarOpen}
						toggleSidebar={toggleSidebar}
						showInput={showNavbarInput}
					/>
				)}
				<main className="bg-black flex-grow p-0 mt-16 transition-all duration-500 ease-in-out">
					<BgUI />
					<Routes>
						{/* Define routes for each page */}
						<Route path="/" element={<LandingPage />} />
						<Route path="/home" element={<LandingPage />} />
						<Route path="/profile" element={<ProfilePage />} />

						<Route path="/login" element={<LoginPage />} />
						<Route path="/register" element={<RegisterPage />} />

						<Route path="/dashboard" element={<DashboardPage />} />
						<Route path="/resources" element={<ResourcePage />} />
						<Route path="/support" element={<SupportPage />} />
						<Route path="/blogs" element={<BlogListPage />} /> {/* Fixed route */}
						<Route path="/tutors" element={<FindTutorPage />} />
						<Route path="/learning" element={<LearningPathPage />} />
						<Route path="/calculator" element={<CalculatorPage />} />

						<Route path="/app" element={<MobileAppPage />} />

						<Route path="/answer" element={<AnswerPage />} />
						<Route path="/answer-detail" element={<SavedAnswerDetailPage />} />


						<Route path="/your-data" element={<YourData />} />
						<Route path="/edit-data" element={<EditData />} />
					</Routes>
				</main>
				{/* Conditionally render Footer and ChatButton if route is in layoutRoutes */}
				{showLayout && (
					<>
						<Footer />
						<div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50">
							<ChatButton />
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default App;
