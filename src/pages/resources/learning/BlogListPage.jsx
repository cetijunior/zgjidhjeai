import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ShootingStars from '../../../components/common/shootingStars'
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const sampleBlogs = [
    {
        id: 1,
        title: "Understanding React Hooks",
        author: "Jane Doe",
        date: "October 10, 2023",
        excerpt: "Learn how to use React Hooks in functional components.",
        category: "React",
    },
    {
        id: 2,
        title: "Advanced JavaScript Techniques",
        author: "John Smith",
        date: "September 21, 2023",
        excerpt: "Boost your JavaScript skills with these advanced concepts.",
        category: "JavaScript",
    },
    {
        id: 3,
        title: "CSS Grid vs Flexbox",
        author: "Alice Brown",
        date: "August 30, 2023",
        excerpt: "When to use CSS Grid and Flexbox in responsive layouts.",
        category: "CSS",
    },
];

const BlogListPage = () => {
    const [blogs, setBlogs] = useState(sampleBlogs); // Use sample data for now
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBlogs, setFilteredBlogs] = useState(sampleBlogs);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const navigate = useNavigate();

    useEffect(() => {
        // Filter blogs based on search term and selected category
        const results = blogs.filter(blog =>
            (selectedCategory === 'All' || blog.category === selectedCategory) &&
            (blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredBlogs(results);
    }, [searchTerm, selectedCategory, blogs]);

    const handleCategoryChange = (category) => setSelectedCategory(category);

    return (
        <div className="min-h-screen px-4 bg-black text-white py-10">
            <ShootingStars />
            <header className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-blue-400">Blog</h1>
                <p className="text-lg text-gray-400 mt-2">Explore our latest articles and resources.</p>
            </header>

            {/* Search and Category Filter */}
            <div className="flex flex-col md:flex-row md:justify-between items-center mb-8">
                <div className="relative w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search articles..."
                        className="w-full p-3 pl-10 bg-gray-800 text-gray-200 rounded-lg focus:outline-none"
                    />
                    <MagnifyingGlassIcon className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                </div>

                <div className="flex z-20 space-x-4">
                    {['All', 'React', 'JavaScript', 'CSS'].map(category => (
                        <button
                            key={category}
                            onClick={() => handleCategoryChange(category)}
                            className={`px-4 py-2 rounded-lg transition-colors ${selectedCategory === category
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredBlogs.map(blog => (
                    <motion.div
                        key={blog.id}
                        className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                        onClick={() => navigate(`/blogs/${blog.id}`)}
                        whileHover={{ scale: 1.03 }}
                    >
                        <h2 className="text-2xl font-semibold text-blue-300">{blog.title}</h2>
                        <p className="text-gray-400 mt-2 text-sm">{blog.excerpt}</p>
                        <div className="flex justify-between items-center mt-4 text-gray-500 text-xs">
                            <span>{blog.author}</span>
                            <span>{blog.date}</span>
                        </div>
                        <div className="mt-2 text-sm font-semibold text-blue-500">
                            {blog.category}
                        </div>
                    </motion.div>
                ))}
                {!filteredBlogs.length && (
                    <p className="text-center text-gray-500">No articles found.</p>
                )}
            </div>
        </div>
    );
};

export default BlogListPage;
