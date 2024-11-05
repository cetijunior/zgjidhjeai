// src/pages/support/SupportPage.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { EnvelopeIcon, PhoneIcon, ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import BgUI from "../../../components/common/BgUI";

const SupportPage = () => {
    return (
        <div className="relative min-h-screen bg-black text-white px-3">
            <BgUI />
            <div className="relative z-10 p-8">
                <header className="mb-10 text-center">
                    <h1 className="text-5xl font-extrabold text-blue-400">Support</h1>
                    <p className="text-lg text-gray-400 mt-2">
                        Need assistance? Our support team is here to help you.
                    </p>
                </header>

                <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* Contact Information */}
                    <motion.div
                        className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="flex items-center space-x-3 mb-5 relative z-10">
                            <EnvelopeIcon className="h-8 w-8 text-blue-400" />
                            <h2 className="text-3xl font-semibold text-blue-400">Contact Us</h2>
                        </div>
                        <p className="text-gray-400 mb-4">Reach out to our team for any questions or concerns:</p>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex items-center space-x-2">
                                <PhoneIcon className="h-6 w-6 text-blue-300" />
                                <span>+1 (800) 123-4567</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <EnvelopeIcon className="h-6 w-6 text-blue-300" />
                                <span>support@example.com</span>
                            </li>
                        </ul>
                        <motion.div
                            className="absolute -bottom-10 -right-10 bg-blue-400 h-36 w-36 rounded-full opacity-20"
                            animate={{ x: [0, 15, 0], y: [0, 15, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </motion.div>

                    {/* Frequently Asked Questions */}
                    <motion.div
                        className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                    >
                        <div className="flex items-center space-x-3 mb-5 relative z-10">
                            <ChatBubbleOvalLeftEllipsisIcon className="h-8 w-8 text-blue-400" />
                            <h2 className="text-3xl font-semibold text-blue-400">Frequently Asked Questions</h2>
                        </div>
                        <p className="text-gray-400 mb-6">
                            Browse through our FAQ for quick answers to common questions.
                        </p>
                        <button
                            onClick={() => window.open("/faq", "_self")}
                            className="w-full bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600 transition cursor-pointer relative z-10 font-medium"
                        >
                            Go to FAQ
                        </button>
                        <motion.div
                            className="absolute -bottom-10 -right-10 bg-green-400 h-36 w-36 rounded-full opacity-20"
                            animate={{ x: [0, -15, 0], y: [0, -15, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </motion.div>

                    {/* Support Form */}
                    <motion.div
                        className="col-span-1 md:col-span-2 bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                    >
                        <div className="flex items-center space-x-3 mb-5 relative z-10">
                            <EnvelopeIcon className="h-8 w-8 text-blue-400" />
                            <h2 className="text-3xl font-semibold text-blue-400">Get In Touch</h2>
                        </div>
                        <p className="text-gray-400 mb-6">Fill out the form below and our team will get back to you shortly.</p>
                        <form className="space-y-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full px-4 py-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full px-4 py-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <textarea
                                placeholder="Your Message"
                                rows="4"
                                className="w-full px-4 py-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600 transition cursor-pointer relative z-10 font-medium"
                            >
                                Send Message
                            </button>
                        </form>
                        <motion.div
                            className="absolute -bottom-10 -right-10 bg-purple-400 h-36 w-36 rounded-full opacity-20"
                            animate={{ x: [0, 15, 0], y: [0, 15, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </motion.div>
                </section>
            </div>
        </div>
    );
};

export default SupportPage;
