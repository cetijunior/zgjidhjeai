import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ClockIcon, CheckCircleIcon, BellIcon, StarIcon, UserIcon } from "@heroicons/react/24/solid";
import BgUI from "../../components/common/BgUI";
import api from "../../api/api";

const DashboardPage = () => {
    const [activities, setActivities] = useState([]);
    const [progress, setProgress] = useState({});
    const [notifications, setNotifications] = useState([]);
    const [goals, setGoals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [activitiesRes, progressRes, notificationsRes, goalsRes] = await Promise.all([
                    api.get('/activities'),
                    api.get('/progress'),
                    api.get('/notifications'),
                    api.get('/goals')
                ]);

                setActivities(activitiesRes.data);
                setProgress(progressRes.data);
                setNotifications(notificationsRes.data);
                setGoals(goalsRes.data);
                setIsLoading(false);
            } catch (error) {
                toast.error("Failed to load dashboard data");
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const iconSize = "h-6 w-6 text-blue-400";

    return (
        <div className="relative min-h-screen bg-black text-white">
            <BgUI />
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            <div className="relative z-10 p-6">
                <header className="mb-10 text-center">
                    <h1 className="text-4xl font-extrabold text-blue-400">Dashboard</h1>
                    <p className="text-lg text-gray-400 mt-2">Welcome back! Here’s what’s happening.</p>
                </header>

                {isLoading ? (
                    <p className="text-center text-gray-500">Loading data...</p>
                ) : (
                    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* Recent Activities */}
                        <motion.div
                            className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="flex items-center space-x-2 mb-4">
                                <ClockIcon className={iconSize} />
                                <h2 className="text-2xl font-semibold text-blue-400">Recent Activities</h2>
                            </div>
                            <ul className="mt-4 space-y-2">
                                {activities.length ? (
                                    activities.map((activity, index) => (
                                        <li key={index} className="text-gray-400 text-sm">
                                            {activity.description}
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No recent activities.</p>
                                )}
                            </ul>
                        </motion.div>

                        {/* Progress Overview */}
                        <motion.div
                            className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                        >
                            <div className="flex items-center space-x-2 mb-4">
                                <CheckCircleIcon className={iconSize} />
                                <h2 className="text-2xl font-semibold text-blue-400">Progress Overview</h2>
                            </div>
                            <div className="mt-4 space-y-2">
                                <p className="text-gray-400">
                                    <strong>Modules Completed:</strong> {progress.modulesCompleted || 0}
                                </p>
                                <p className="text-gray-400">
                                    <strong>Tasks Done:</strong> {progress.tasksCompleted || 0}
                                </p>
                                <p className="text-gray-400">
                                    <strong>Overall Progress:</strong> {progress.overall || 0}%
                                </p>
                            </div>
                        </motion.div>

                        {/* Notifications */}
                        <motion.div
                            className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        >
                            <div className="flex items-center space-x-2 mb-4">
                                <BellIcon className={iconSize} />
                                <h2 className="text-2xl font-semibold text-blue-400">Notifications</h2>
                            </div>
                            <ul className="mt-4 space-y-2">
                                {notifications.length ? (
                                    notifications.map((notification, index) => (
                                        <li key={index} className="text-gray-400 text-sm">
                                            {notification.message}
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No new notifications.</p>
                                )}
                            </ul>
                        </motion.div>

                        {/* Upcoming Goals */}
                        <motion.div
                            className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                        >
                            <div className="flex items-center space-x-2 mb-4">
                                <StarIcon className={iconSize} />
                                <h2 className="text-2xl font-semibold text-blue-400">Upcoming Goals</h2>
                            </div>
                            <ul className="mt-4 space-y-2">
                                {goals.length ? (
                                    goals.map((goal, index) => (
                                        <li key={index} className="text-gray-400 text-sm">
                                            {goal.description}
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No goals set.</p>
                                )}
                            </ul>
                        </motion.div>

                        {/* Account Overview */}
                        <motion.div
                            className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow col-span-1 md:col-span-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.4 }}
                        >
                            <div className="flex items-center space-x-2 mb-4">
                                <UserIcon className={iconSize} />
                                <h2 className="text-2xl font-semibold text-blue-400">Account Overview</h2>
                            </div>
                            <div className="mt-4 space-y-2">
                                <p className="text-gray-400"><strong>Plan:</strong> Premium</p>
                                <p className="text-gray-400"><strong>Tokens Left:</strong> 200</p>
                                <p className="text-gray-400"><strong>Last Login:</strong> {new Date().toLocaleDateString()}</p>
                            </div>
                        </motion.div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;
