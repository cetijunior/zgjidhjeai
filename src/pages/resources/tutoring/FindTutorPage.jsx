// src/pages/tutoring/FindTutorPage.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import BgUI from "../../../components/common/BgUI";
import api from '../../../api/api';

const FindTutorPage = () => {
    const [tutors, setTutors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTutors = async () => {
            try {
                const response = await api.get('/tutors');
                setTutors(response.data.length > 0 ? response.data : placeholderTutors);
            } catch (error) {
                console.error("Failed to load tutors", error);
                setTutors(placeholderTutors);
            }
        };

        const placeholderTutors = [
            {
                id: 1,
                name: 'Jane Doe',
                subject: 'Mathematics',
                expertise: ['Algebra', 'Calculus', 'Geometry'],
                yearsExperience: 5,
                rating: 4.8,
                description: 'Experienced tutor in high school and college-level math.',
            },
            {
                id: 2,
                name: 'John Smith',
                subject: 'Physics',
                expertise: ['Mechanics', 'Thermodynamics', 'Quantum Physics'],
                yearsExperience: 7,
                rating: 4.9,
                description: 'Passionate about helping students excel in physics.',
            },
            {
                id: 3,
                name: 'Emily Johnson',
                subject: 'Chemistry',
                expertise: ['Organic Chemistry', 'Inorganic Chemistry', 'Biochemistry'],
                yearsExperience: 4,
                rating: 4.7,
                description: 'Focused on making chemistry engaging and understandable.',
            },
        ];

        fetchTutors();
    }, []);

    const handleBookTutor = (tutorId) => {
        navigate(`/tutor/${tutorId}`);
    };

    return (
        <div className="relative px-4 min-h-screen bg-black text-white">
            <BgUI />
            <div className="relative z-10 p-8">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-blue-400">Find a Tutor</h1>
                    <p className="text-lg text-gray-400 mt-2">Browse available tutors and book your session today.</p>
                </header>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {tutors.map((tutor) => (
                        <motion.div
                            key={tutor.id}
                            className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="flex items-center space-x-3 mb-4">
                                {tutor.profilePicture ? (
                                    <img src={tutor.profilePicture} alt={tutor.name} className="h-12 w-12 rounded-full" />
                                ) : (
                                    <UserCircleIcon className="h-12 w-12 text-blue-500" />
                                )}
                                <div>
                                    <h2 className="text-xl font-semibold text-blue-300">{tutor.name}</h2>
                                    <p className="text-gray-400 text-sm">{tutor.subject}</p>
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm mb-4">{tutor.description}</p>
                            <ul className="space-y-1 mb-4">
                                <li><span className="font-semibold text-blue-300">Expertise:</span> {tutor.expertise.join(', ')}</li>
                                <li><span className="font-semibold text-blue-300">Experience:</span> {tutor.yearsExperience} years</li>
                                <li><span className="font-semibold text-blue-300">Rating:</span> {tutor.rating} / 5</li>
                            </ul>
                            <button
                                onClick={() => handleBookTutor(tutor.id)}
                                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
                            >
                                Book Now
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FindTutorPage;
