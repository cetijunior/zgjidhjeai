// src/pages/landing/LandingPage.jsx
import HeroSection from "../../components/landing/HeroSection";
//import DocumentUploadSection from '../../components/landing/DocumentUploadSection';
import AppExplanationSection from "../../components/landing/AppExplanationSection";
import TestimonialsSection from "../../components/landing/TestimonialsSection";
import FAQSection from "../../components/landing/FAQSection";

const LandingPage = () => {
	return (
		<div className="w-screen lg:-ml-16 bg-[#f5f6ff]">
			<HeroSection />
			{/* <DocumentUploadSection /> */}
			<AppExplanationSection />
			<TestimonialsSection />
			<FAQSection />
		</div>
	);
};

export default LandingPage;
