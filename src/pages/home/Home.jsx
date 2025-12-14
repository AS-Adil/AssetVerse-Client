import React from 'react';
import Banner from '../../component/home/banner/Banner';
import AboutSection from '../../component/home/about/AboutSection';
import PackagesSection from '../../component/home/packages/PackagesSection';
import FeaturesShowcase from '../../component/home/features-showcase/FeaturesShowcase';
import TestimonialsSection from '../../component/home/testimonials-section/TestimonialsSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AboutSection></AboutSection>
            <PackagesSection></PackagesSection>
            <FeaturesShowcase></FeaturesShowcase>
            <TestimonialsSection></TestimonialsSection>
        </div>
    );
};

export default Home;