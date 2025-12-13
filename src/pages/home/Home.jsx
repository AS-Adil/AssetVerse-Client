import React from 'react';
import Banner from '../../component/home/banner/Banner';
import AboutSection from '../../component/home/about/AboutSection';
import PackagesSection from '../../component/home/packages/PackagesSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AboutSection></AboutSection>
            <PackagesSection></PackagesSection>
        </div>
    );
};

export default Home;