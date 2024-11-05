import React from 'react';
import BgUI from '../../../components/common/BgUI';
import { motion } from 'framer-motion';

const learningPaths = [
    {
        title: "Basic Algebra",
        description: "Learn the fundamentals of algebra in easy steps.",
        level: "Beginner",
    },
    {
        title: "Calculus Essentials",
        description: "A deep dive into calculus principles and applications.",
        level: "Intermediate",
    },
    {
        title: "Linear Algebra",
        description: "Understand vectors, matrices, and linear transformations.",
        level: "Advanced",
    },
];

const LearningPathPage = () => {
    return (
        <div className="relative min-h-screen  bg-black text-white p-6 overflow-hidden">
            <BgUI />
            <header className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-blue-500 drop-shadow-md">Learning Paths</h1>
                <p className="text-gray-400 mt-3 text-lg">
                    Tailor your learning experience by choosing a path that suits your goals.
                </p>
            </header>

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                {learningPaths.map((path, index) => (
                    <motion.div
                        key={index}
                        className="relative bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-lg shadow-lg hover:shadow-2xl transition duration-500 ease-out overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <motion.div
                            className={`text-lg font-semibold text-${path.level === "Beginner" ? "green" : path.level === "Intermediate" ? "yellow" : "red"}-400 drop-shadow-sm`}
                        >
                            {path.level}
                        </motion.div>
                        <h2 className="text-3xl font-semibold text-blue-300 mt-4 mb-2">{path.title}</h2>
                        <p className="text-gray-400 mb-6">{path.description}</p>
                        <motion.button
                            className="mt-6 w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Start Learning
                        </motion.button>
                        <motion.div
                            className="absolute -bottom-10 -right-10 bg-blue-600 h-36 w-36 rounded-full opacity-10"
                            animate={{ x: [0, 15, 0], y: [0, 15, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default LearningPathPage;
