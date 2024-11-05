import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import api from "../../api/api";
import BgUI from "../../components/common/BgUI";
import { StarIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [additionalData, setAdditionalData] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const [showProfileOptions, setShowProfileOptions] = useState(false);
    const [allDataItems, setAllDataItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await api.get("/user/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserData(response.data.profile);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        const fetchAdditionalData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await api.get("/user", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAdditionalData(response.data.data);
                setAllDataItems(response.data.data.files || []);
            } catch (error) {
                console.error("Error fetching additional data:", error);
            }
        };

        fetchUserData();
        fetchAdditionalData();
    }, []);

    const handlePlanChange = async (plan) => {
        if (window.confirm(`Are you sure you want to switch to the ${plan} plan?`)) {
            try {
                await api.put("/user/update-plan", { plan });
                toast.success(`Plan updated to ${plan} successfully`);
                setUserData((prevData) => ({ ...prevData, plan }));
            } catch (error) {
                toast.error("Failed to update plan");
            }
        }
    };

    const handleUploadProfilePicture = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("file", profilePicture);

        try {
            const response = await fetch(
                "http://localhost:5000/api/user/profile-picture/upload",
                {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                    body: formData,
                }
            );

            if (response.status === 200) {
                const updatedProfilePictureUrl = URL.createObjectURL(profilePicture);
                setUserData((prevData) => ({
                    ...prevData,
                    profilePictureUrl: updatedProfilePictureUrl,
                }));
                toast.success("Profile picture uploaded successfully.");
                setShowProfileOptions(false);
            } else {
                throw new Error("Failed to upload profile picture.");
            }
        } catch (error) {
            toast.error("An error occurred while uploading the profile picture.");
        }
    };

    const handleDeleteProfilePicture = async () => {
        try {
            await api.delete("/user/profile-picture", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setUserData((prevData) => ({
                ...prevData,
                profilePictureUrl: null,
            }));
            toast.success("Profile picture deleted successfully.");
            setShowProfileOptions(false);
        } catch (error) {
            toast.error("Failed to delete profile picture.");
        }
    };

    const handleFileClick = () => setShowProfileOptions(!showProfileOptions);

    return (
        <div className="min-h-screen w-screen flex flex-col items-center py-10 text-white bg-black">
            <BgUI />
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            <div className="max-w-4xl w-full bg-gray-900 p-8 rounded-lg shadow-lg space-y-8 relative z-20">

                {/* Profile Section */}
                {userData && (
                    <div className="text-center space-y-4">
                        <div className="relative inline-block z-30">
                            <motion.div
                                onClick={handleFileClick}
                                whileHover={{ scale: 1.05 }}
                                className="relative cursor-pointer"
                            >
                                {userData.profilePictureUrl ? (
                                    <img
                                        src={userData.profilePictureUrl}
                                        alt="Profile"
                                        className="w-24 h-24 object-cover rounded-full mx-auto border-4 border-blue-500"
                                    />
                                ) : (
                                    <div className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500 flex items-center justify-center bg-blue-500 text-white text-3xl font-semibold">
                                        {userData.username[0].toUpperCase()}
                                    </div>
                                )}
                            </motion.div>
                            <AnimatePresence>
                                {showProfileOptions && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute top-28 -left-14 transform -translate-x-1/2 bg-gray-700 p-4 rounded-lg shadow-lg w-56 text-center z-40"
                                    >
                                        <form onSubmit={handleUploadProfilePicture}>
                                            <input
                                                type="file"
                                                onChange={(e) => setProfilePicture(e.target.files[0])}
                                                className="block w-full text-sm text-gray-300 border border-gray-500 rounded-lg cursor-pointer focus:outline-none mb-2"
                                            />
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition w-full mb-2"
                                            >
                                                Add/Update Picture
                                            </button>
                                        </form>
                                        <button
                                            onClick={handleDeleteProfilePicture}
                                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition w-full"
                                        >
                                            Remove Picture
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <h2 className="text-2xl font-semibold">{userData.username}</h2>
                        <p className="text-gray-400">{userData.email}</p>
                        <p className={`mt-2 text-sm font-medium ${userData.plan === "premium" ? "bg-blue-500 text-white" : "bg-gray-400 text-gray-900"} rounded-full px-4 py-1 inline-block`}>
                            Plan: {userData.plan}
                        </p>
                        <p className="mt-2 text-blue-300 font-bold">
                            Tokens Left: {userData.tokensLeft || "N/A"}
                        </p>
                    </div>
                )}



                {/* Features Section for Premium Users */}
                {userData?.plan === "premium" && (
                    <div className="bg-gray-800 p-6 rounded-lg text-center space-y-4 relative z-10">
                        <motion.div
                            initial={{ y: 0 }}
                            animate={{ y: [0, -5, 0] }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="flex justify-center items-center"
                        >
                            <StarIcon className="h-8 w-8 text-yellow-400 mr-2" />
                            <h3 className="text-xl font-semibold text-yellow-400">Premium Features</h3>
                        </motion.div>
                        <ul className="text-gray-300 space-y-2">
                            <li className="flex items-center">
                                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                                Unlimited Tokens
                            </li>
                            <li className="flex items-center">
                                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                                Priority Customer Support
                            </li>
                            <li className="flex items-center">
                                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                                Access to Beta Features
                            </li>
                            <button
                                onClick={() => handlePlanChange("student")}
                                className="bg-green-500 w-60 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition cursor-pointer"
                            >
                                Switch to Student Plan
                            </button>
                        </ul>
                    </div>
                )}

                {/* Change Plan Section (only if not premium) */}
                {userData?.plan !== "premium" && (
                    <div className="bg-gray-800 p-4 rounded-lg text-center relative z-10">
                        <h3 className="text-xl font-semibold text-gray-300 mb-2">Change Plan</h3>
                        <div className=" w-full flex items-center justify-evenly py-4 space-x-4 ">
                            <button
                                onClick={() => handlePlanChange("student")}
                                className="bg-green-500 w-60 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition cursor-pointer"
                            >
                                Switch to Student Plan
                            </button>
                            <button
                                onClick={() => handlePlanChange("premium")}
                                className="bg-blue-500 w-60 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
                            >
                                Switch to Premium Plan
                            </button>
                        </div>
                    </div>
                )}

                {/* Your Data Section */}
                {additionalData && (
                    <div className="bg-gray-800 p-6 rounded-lg space-y-4 relative z-10">
                        <h3 className="text-xl font-semibold text-gray-300">Your Data</h3>
                        <div className="text-gray-400 space-y-2">
                            <h4 className="font-semibold text-gray-400">Files</h4>
                            {allDataItems.length > 0 ? (
                                allDataItems.map((file) => (
                                    <div key={file._id} className="text-gray-300">
                                        <p>{file.fileInfo?.originalName || "Unnamed File"}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400">No files uploaded.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
