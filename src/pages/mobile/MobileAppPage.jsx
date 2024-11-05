// src/pages/mobile/MobileAppPage.jsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneIcon, StarIcon, BoltIcon, ShieldCheckIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import BgUI from "../../components/common/BgUI";

const images = [
    { src: "/assets/images/app/All Saved Items Screen.jpg", title: "All Saved Items" },
    { src: "/assets/images/app/Calculator Screen.jpg", title: "Calculator Screen" },
    { src: "/assets/images/app/CameraView.jpg", title: "Camera View" },
    { src: "/assets/images/app/EditScreen.jpg", title: "Edit Screen" },
    { src: "/assets/images/app/Image Edit Screen.jpg", title: "Image Edit Screen" },
    { src: "/assets/images/app/Image Preview Screen.jpg", title: "Image Preview Screen" },
    { src: "/assets/images/app/MainScreen.jpg", title: "Main Screen" },
    { src: "/assets/images/app/Profile Screen.jpg", title: "Profile Screen" },
    { src: "/assets/images/app/QuickChat Screen.jpg", title: "QuickChat Screen" },
    { src: "/assets/images/app/Saved Item Screen.jpg", title: "Saved Item Screen" },
];

const MobileAppPage = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative min-h-screen bg-black text-white">
            <BgUI />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center py-10"
            >
                <h1 className="text-4xl font-bold text-blue-500 mb-4">Experience Our Mobile App</h1>
                <p className="text-gray-300">Enjoy all features on the go with our mobile app.</p>
            </motion.div>

            {/* Phone Canvases Section */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-24 px-6 md:px-12 lg:px-44">
                <div className="space-y-2">
                    <div className="p-4 bg-gray-800 text-white rounded-b-2xl text-center font-semibold">App Demo Video</div>
                    <div className="phone-canvas">
                        <video
                            src="/assets/videos/Zgjidhje.AI Mobile Demo.mp4"
                            className="w-full h-[500px] object-contain rounded-lg"
                            autoPlay
                            playsInline

                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="p-4 bg-gray-800 text-white rounded-b-2xl text-center font-semibold">
                        {images[currentImageIndex].title}
                    </div>
                    <div className="phone-canvas">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={images[currentImageIndex].src}
                                src={images[currentImageIndex].src}
                                alt={images[currentImageIndex].title}
                                className="w-full h-[500px] object-contain rounded-lg"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            />
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="mt-16 px-6 md:px-12 lg:px-44">
                <h2 className="text-3xl font-semibold text-center text-blue-500 mb-8">Why Choose Our App?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
                    <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow" whileHover={{ scale: 1.05 }}>
                        <BoltIcon className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">Fast and Reliable</h3>
                        <p className="text-gray-400">Experience blazing fast speed and smooth performance.</p>
                    </motion.div>
                    <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow" whileHover={{ scale: 1.05 }}>
                        <ShieldCheckIcon className="h-12 w-12 text-green-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">Secure and Private</h3>
                        <p className="text-gray-400">Your data is protected with the highest level of security.</p>
                    </motion.div>
                    <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow" whileHover={{ scale: 1.05 }}>
                        <GlobeAltIcon className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">Global Access</h3>
                        <p className="text-gray-400">Connect from anywhere and enjoy a seamless experience.</p>
                    </motion.div>
                </div>
            </div>

            {/* Download and Rate Buttons */}
            <div className="flex justify-center mb-10 space-x-6 mt-10">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-blue-500 text-white px-6 py-3 rounded-lg flex items-center space-x-2">
                    <PhoneIcon className="h-6 w-6" />
                    <span>Download the App</span>
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-gray-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2">
                    <StarIcon className="h-6 w-6 text-yellow-400" />
                    <span>Rate Us</span>
                </motion.button>
            </div>
        </div>
    );
};

export default MobileAppPage;
