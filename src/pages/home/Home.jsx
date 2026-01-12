import React from "react";
import Banner from "../../component/home/banner/Banner";
import AboutSection from "../../component/home/about/AboutSection";
import PackagesSection from "../../component/home/packages/PackagesSection";
import FeaturesShowcase from "../../component/home/features-showcase/FeaturesShowcase";
import TestimonialsSection from "../../component/home/testimonials-section/TestimonialsSection";
import HowItWorks from "../../component/home/howIt-works/HowItWorks";
import FAQSection from "../../component/home/faq-section/FAQSection";
import ContactCTA from "../../component/home/contact-cta/ContactCTA";
import Services from "../../component/home/services/Services";
import Highlights from "../../component/home/highlights/Highlights";

const Home = () => {
  return (
    <div>
      <Banner />
      <AboutSection />
      <Services />
      <Highlights />
      <FeaturesShowcase />
      <HowItWorks />
      <PackagesSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactCTA />

    </div>
  );
};

export default Home;
