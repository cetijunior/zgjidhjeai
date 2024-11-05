// src/components/layout/Footer.jsx
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<footer
			className="relative border-t border-gray-800 text-gray-300 overflow-hidden"
			style={{ background: "linear-gradient(to bottom, #000000, #1a1a2e)" }}
		>
			<div className="absolute inset-0"></div>
			<div className="container mx-auto px-4 py-8 sm:py-12 relative z-10 sm:ml-20">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div className="md:col-span-2">
						<h2 className="text-2xl font-bold text-purple-500 mb-4">
							Zgjidhje.AI
						</h2>
						<p className="text-sm">
							Empowering students with AI-driven learning solutions.
						</p>
						<p className="text-sm">
							&copy; 2024 Zgjidhje.ai. All rights reserved.
						</p>
					</div>
					<div>
						<h3 className="text-lg font-semibold text-purple-400 mb-3">
							Quick Links
						</h3>
						<ul className="space-y-2">
							<li>
								<Link
									to="/"
									className="hover:text-purple-400 transition-colors"
									onClick={scrollToTop}
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									to="/about"
									className="hover:text-purple-400 transition-colors"
								>
									About Us
								</Link>
							</li>
							<li>
								<Link
									to="/services"
									className="hover:text-purple-400 transition-colors"
								>
									Services
								</Link>
							</li>
							<li>
								<Link
									to="/contact"
									className="hover:text-purple-400 transition-colors"
								>
									Contact
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-lg font-semibold text-purple-400 mb-3">
							Legal
						</h3>
						<ul className="space-y-2">
							<li>
								<Link
									to="/terms"
									className="hover:text-purple-400 transition-colors"
								>
									Terms of Service
								</Link>
							</li>
							<li>
								<Link
									to="/privacy"
									className="hover:text-purple-400 transition-colors"
								>
									Privacy Policy
								</Link>
							</li>
						</ul>
						<div className="flex space-x-4 mt-4 sm:mt-12">
							<a
								href="#"
								className="text-gray-400 hover:text-purple-400 transition-colors"
							>
								<FaFacebook />
							</a>
							<a
								href="#"
								className="text-gray-400 hover:text-purple-400 transition-colors"
							>
								<FaTwitter />
							</a>
							<a
								href="#"
								className="text-gray-400 hover:text-purple-400 transition-colors"
							>
								<FaInstagram />
							</a>
							<a
								href="#"
								className="text-gray-400 hover:text-purple-400 transition-colors"
							>
								<FaLinkedin />
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
