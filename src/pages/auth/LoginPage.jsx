import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";

const LoginPage = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const { data } = await api.post("/auth/login", { email, password });
			localStorage.setItem("token", data.accessToken);
			navigate("/home"); // Redirect to Home page after login
		} catch (error) {
			setError("Login failed. Please check your credentials.");
			console.error("Login failed:", error.response?.data || error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleRegisterRedirect = () => {
		navigate("/register");
	};

	return (
		<div className="flex items-center justify-center h-screen w-screen sm:-mx-20 overflow-hidden">
			<div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md sm:max-w-sm z-20">
				<h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
					Welcome Back
				</h2>
				<form onSubmit={handleLogin} className="space-y-4">
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email
						</label>
						<input
							id="email"
							type="email"
							placeholder="john.doe@example.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
							required
						/>
					</div>
					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							Password
						</label>
						<input
							id="password"
							type="password"
							placeholder="••••••••"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
							required
						/>
					</div>
					{error && <p className="text-red-500 text-sm">{error}</p>}
					<button
						type="submit"
						className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						disabled={loading}
					>
						{loading ? (
							<svg
								className="animate-spin h-5 w-5 text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								></circle>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
						) : (
							"Sign In"
						)}
					</button>
				</form>

				<div className="mt-6">
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-300"></div>
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-2 bg-white text-gray-500">
								Or continue with
							</span>
						</div>
					</div>
					<div className="mt-6 grid grid-cols-3 gap-3">
						<a
							href="#"
							className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
						>
							<FaGoogle className="text-red-500" />
						</a>
						<a
							href="#"
							className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
						>
							<FaFacebook className="text-blue-600" />
						</a>
						<a
							href="#"
							className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
						>
							<FaApple className="text-gray-500" />
						</a>
					</div>
				</div>

				<p className="mt-8 text-sm text-center text-gray-600">
					Don&rsquo;t have an account?{" "}
					<span
						onClick={handleRegisterRedirect}
						className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
					>
						Sign up
					</span>
				</p>
			</div>
		</div>
	);
};

export default LoginPage;
