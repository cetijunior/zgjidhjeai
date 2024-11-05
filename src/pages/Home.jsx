import { useNavigate } from "react-router-dom";
import UseAiService from "../components/UseAiService";

const Home = () => {
	const navigate = useNavigate();
	const isAuthenticated = !!localStorage.getItem("token");

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<div className="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto">
				<h2 className="text-2xl font-bold text-gray-800 mb-6">
					Welcome to Your Dashboard
				</h2>
				{isAuthenticated ? (
					<div className="space-y-4">
						<button
							onClick={() => navigate("/edit-data")}
							className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
						>
							Edit Data
						</button>
						<button
							onClick={() => navigate("/your-data")}
							className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors"
						>
							Your Data / Profile
						</button>
						<button
							onClick={() => navigate("/change-plan")}
							className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors"
						>
							Change Subscription Plan
						</button>
						<button
							onClick={handleLogout}
							className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors"
						>
							Logout
						</button>
						<div className="mt-6">
							<UseAiService />
						</div>
					</div>
				) : (
					<div className="text-center">
						<p className="text-gray-600 mb-4">
							Please log in to access your dashboard features.
						</p>
						<button
							onClick={() => navigate("/login")}
							className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
						>
							Login
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Home;
