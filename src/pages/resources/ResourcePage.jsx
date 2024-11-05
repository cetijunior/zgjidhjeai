import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { UserGroupIcon, BookOpenIcon, NewspaperIcon, LifebuoyIcon } from "@heroicons/react/24/outline";
import BgUI from "../../components/common/BgUI";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

const ResourcePage = () => {
    const [tutors, setTutors] = useState([]);
    const [learningResources, setLearningResources] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [tutorsRes, learningRes, blogsRes] = await Promise.all([
                    api.get('/tutors'),
                    api.get('/learning-resources'),
                    api.get('/blogs')
                ]);
                setTutors(tutorsRes.data);
                setLearningResources(learningRes.data);
                setBlogs(blogsRes.data);
                setIsLoading(false);
            } catch (error) {
                toast.error("Failed to load resources");
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const iconSize = "h-10 w-10 text-blue-400";
    const handleNavigation = (path) => navigate(path);

    return (
        <div className="relative min-h-screen bg-black text-white">
            <BgUI />
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            <div className="relative z-10 p-8">
                <header className="mb-10 text-center">
                    <h1 className="text-5xl font-extrabold text-blue-400">Resources</h1>
                    <p className="text-lg text-gray-400 mt-2">Explore tutors, learning resources, blogs, and support to guide you through your journey.</p>
                </header>

                {isLoading ? (
                    <p className="text-center text-gray-500">Loading resources...</p>
                ) : (
                    <section className="grid grid-cols-1 gap-10 md:grid-cols-2">
                        {/* Tutors Section */}
                        <motion.div
                            className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="flex items-center space-x-3 mb-5 relative z-10">
                                <UserGroupIcon className={iconSize} />
                                <h2 className="text-3xl font-semibold text-blue-400">Tutors</h2>
                            </div>
                            <p className="text-gray-400 mb-6">Find top-rated tutors to guide you in mastering your subjects.</p>
                            <ul className="space-y-3 relative z-10 mb-6">
                                {tutors.slice(0, 3).map((tutor, index) => (
                                    <li key={index} className="text-gray-300 text-lg">{tutor.name}</li>
                                ))}
                            </ul>
                            <button
                                onClick={() => handleNavigation("/tutors")}
                                className="w-full bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600 transition cursor-pointer relative z-10 font-medium"
                            >
                                View All Tutors
                            </button>
                            <motion.div
                                className="absolute -bottom-10 -right-10 bg-blue-400 h-36 w-36 rounded-full opacity-20"
                                animate={{ x: [0, 15, 0], y: [0, 15, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </motion.div>

                        {/* Learning Resources Section */}
                        <motion.div
                            className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                        >
                            <div className="flex items-center space-x-3 mb-5 relative z-10">
                                <BookOpenIcon className={iconSize} />
                                <h2 className="text-3xl font-semibold text-blue-400">Learning Resources</h2>
                            </div>
                            <p className="text-gray-400 mb-6">Access a variety of learning materials to expand your knowledge.</p>
                            <ul className="space-y-3 relative z-10 mb-6">
                                {learningResources.slice(0, 3).map((resource, index) => (
                                    <li key={index} className="text-gray-300 text-lg">{resource.title}</li>
                                ))}
                            </ul>
                            <button
                                onClick={() => handleNavigation("/learning")}
                                className="w-full bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600 transition cursor-pointer relative z-10 font-medium"
                            >
                                View All Resources
                            </button>
                            <motion.div
                                className="absolute -bottom-10 -right-10 bg-green-400 h-36 w-36 rounded-full opacity-20"
                                animate={{ x: [0, -15, 0], y: [0, -15, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </motion.div>

                        {/* Blog Section */}
                        <motion.div
                            className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        >
                            <div className="flex items-center space-x-3 mb-5 relative z-10">
                                <NewspaperIcon className={iconSize} />
                                <h2 className="text-3xl font-semibold text-blue-400">Latest Blog Posts</h2>
                            </div>
                            <p className="text-gray-400 mb-6">Read the latest insights and articles from our experts.</p>
                            <ul className="space-y-3 relative z-10 mb-6">
                                {blogs.slice(0, 3).map((blog, index) => (
                                    <li key={index} className="text-gray-300 text-lg">{blog.title}</li>
                                ))}
                            </ul>
                            <button
                                onClick={() => handleNavigation("/blogs")}
                                className="w-full bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600 transition cursor-pointer relative z-10 font-medium"
                            >
                                View All Blog Posts
                            </button>
                            <motion.div
                                className="absolute -bottom-10 -right-10 bg-purple-400 h-36 w-36 rounded-full opacity-20"
                                animate={{ x: [0, 15, 0], y: [0, 15, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </motion.div>

                        {/* Support Section */}
                        <motion.div
                            className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                        >
                            <div className="flex items-center space-x-3 mb-5 relative z-10">
                                <LifebuoyIcon className={iconSize} />
                                <h2 className="text-3xl font-semibold text-blue-400">Support</h2>
                            </div>
                            <p className="text-gray-400 mb-6">Need assistance? Our support team is here to help.</p>
                            <button
                                onClick={() => handleNavigation("/support")}
                                className="w-full bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600 transition cursor-pointer relative z-10 font-medium"
                            >
                                Contact Support
                            </button>
                            <motion.div
                                className="absolute -bottom-10 -right-10 bg-red-400 h-36 w-36 rounded-full opacity-20"
                                animate={{ x: [0, -15, 0], y: [0, -15, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </motion.div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default ResourcePage;
