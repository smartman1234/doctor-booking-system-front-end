import React, {useState} from 'react';
// import Header from './Header';
import Footer from './Footer';
import Navbar from './Navbar';
import Search from './Search';
import Carousel from './Carousel';
import WhyChooseUs from './WhyChooseUs';
import Services from './Services';
import HowToUse from './HowToUse';
import Aos from 'aos';
import 'aos/dist/aos.css';



function HomeSite() {
        Aos.init()
        return (
        <React.Fragment data-aos="fade-up"
        data-aos-anchor-placement="bottom-bottom">
            <Navbar />
            <Carousel />
            <Search />
            <WhyChooseUs />
            <Services />
            <HowToUse />

            <Footer />
        </React.Fragment>
    );
}

export default HomeSite;