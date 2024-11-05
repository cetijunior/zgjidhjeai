// src/components/landing/TestimonialsSection.jsx
import { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import ShootingStars from "../common/shootingStars";
import { motion } from "framer-motion";

const testimonials = [
	{
		text: "This app saved me countless times! The step-by-step guidance is amazing.",
		author: "Sarah J.",
		role: "High School Student",
		rating: 5,
	},
	{
		text: "The best tutoring service with instant answers. Highly recommended!",
		author: "Michael L.",
		role: "College Freshman",
		rating: 5,
	},
	{
		text: "I've improved my grades significantly since using this app. It's a game-changer!",
		author: "Emily R.",
		role: "Graduate Student",
		rating: 4,
	},
	{
		text: "The personalized learning paths have really helped me focus on my weak areas.",
		author: "David K.",
		role: "High School Senior",
		rating: 5,
	},
	{
		text: "As a parent, I'm impressed with how this app has boosted my child's confidence in math.",
		author: "Lisa M.",
		role: "Parent",
		rating: 5,
	},
	{
		text: "The interface is user-friendly and the explanations are clear. Great for self-study!",
		author: "Alex T.",
		role: "College Sophomore",
		rating: 4,
	},
	{
		text: "I love how I can get help anytime, anywhere. It's like having a tutor in my pocket!",
		author: "Sophia W.",
		role: "Middle School Student",
		rating: 5,
	},
	{
		text: "The variety of subjects covered is impressive. It's been helpful for all my STEM classes.",
		author: "Ryan P.",
		role: "Engineering Student",
		rating: 5,
	},
];

// eslint-disable-next-line react/prop-types
const TestimonialCard = ({ text, author, role, rating, isActive }) => (
	<div
		className={`bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-xl relative overflow-hidden ${
			isActive ? "scale-105 z-10" : "scale-90 opacity-50"
		}`}
	>
		<div className="absolute top-0 left-0 w-12 h-12 bg-purple-500 opacity-20 transform -rotate-45"></div>
		<div className="absolute bottom-0 right-0 w-12 h-12 bg-blue-500 opacity-20 transform rotate-45"></div>
		<div className="flex mb-4">
			{[...Array(rating)].map((_, i) => (
				<StarIcon key={i} className="h-5 w-5 text-yellow-400" />
			))}
		</div>
		<p className="text-gray-200 mb-4 italic">&quot;{text}&quot;</p>
		<div>
			<h4 className="font-semibold text-white">{author}</h4>
			<p className="text-sm text-gray-300">{role}</p>
		</div>
	</div>
);

const TestimonialsSection = () => {
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<section
			className="pt-20 py-12 px-4 md:px-20 relative"
			style={{ background: "#000000" }}
		>
			<ShootingStars />
			<div className="flex flex-col items-center justify-center mx-auto max-w-6xl relative z-10">
				<h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
					What Our Users Say
				</h2>
				<Swiper
					className="w-full"
					spaceBetween={20}
					slidesPerView={3}
					centeredSlides={true}
					pagination={{
						clickable: true,
						el: ".swiper-pagination",
						bulletClass: "swiper-pagination-bullet bg-purple-500",
						bulletActiveClass: "swiper-pagination-bullet-active bg-purple-700",
					}}
					navigation={{
						nextEl: ".swiper-button-next",
						prevEl: ".swiper-button-prev",
					}}
					modules={[Pagination, Navigation, EffectCoverflow]}
					effect="coverflow"
					coverflowEffect={{
						rotate: 50,
						stretch: 0,
						depth: 100,
						modifier: 1,
						slideShadows: false,
					}}
					onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
					breakpoints={{
						320: {
							slidesPerView: 1,
							spaceBetween: 10,
						},
						640: {
							slidesPerView: 2,
							spaceBetween: 20,
						},
						1024: {
							slidesPerView: 3,
							spaceBetween: 30,
						},
					}}
				>
					{testimonials.map((testimonial, index) => (
						<SwiperSlide key={index}>
							<TestimonialCard
								{...testimonial}
								isActive={index === activeIndex}
							/>
						</SwiperSlide>
					))}
				</Swiper>
				<div className="swiper-navigation-wrapper mt-8 flex items-center justify-center space-x-6">
					<motion.div
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						className="swiper-button-prev !static !w-10 !h-10 !bg-gradient-to-r from-purple-600 to-purple-800 !rounded-full after:!content-[''] flex items-center justify-center shadow-lg transition-all duration-300 hover:shadow-purple-500/50"
					>
						<ChevronLeftIcon className="mr-1 h-3 w-3 text-white" />
					</motion.div>
					<div className="swiper-pagination !static !w-auto"></div>
					<motion.div
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						className="swiper-button-next !static !w-10 !h-10 !bg-gradient-to-r from-purple-600 to-purple-800 !rounded-full after:!content-[''] flex items-center justify-center shadow-lg transition-all duration-300 hover:shadow-purple-500/50"
					>
						<ChevronRightIcon className="ml-1 h-3 w-3 text-white" />
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default TestimonialsSection;
