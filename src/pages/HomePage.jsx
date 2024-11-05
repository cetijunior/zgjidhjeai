// src/pages/landing/LandingPage.jsx
import HeroSection from "../../components/landing/HeroSection";
import AppExplanationSection from "../../components/landing/AppExplanationSection";
import TestimonialsSection from "../../components/landing/TestimonialsSection";
import FAQSection from "../../components/landing/FAQSection";

const LandingPage = () => {
	return (
		<div className=" bg-[#f5f6ff]">
			<HeroSection />
			{/* <DocumentUploadSection /> */}
			<AppExplanationSection />
			<TestimonialsSection />
			<FAQSection />
		</div>
	);
};

export default LandingPage;
