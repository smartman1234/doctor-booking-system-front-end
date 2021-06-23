import React, {useState} from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import Search from './Search';
import Carousel from './Carousel';
import WhyChooseUs from './WhyChooseUs';
import HowToUse from './HowToUse';
import Aos from 'aos';
import 'aos/dist/aos.css';

function HomeSite({sendDoctorDataParentHome}) {

    const [doctorData, setDoctorData] = React.useState([]); // the lifted state
    const sendDoctorDataParent = (index) => {
        // the callback. Use a better name
        console.log("Parent | sendDoctorDataParent => ", index);
        sendDoctorDataParentHome(index);
        setDoctorData(index);
      };
        Aos.init()
        return (
        <React.Fragment>
            <Navbar />
            <Carousel />
            <Search sendDoctorDataParent={sendDoctorDataParent}/>
            <WhyChooseUs />
            <HowToUse />
            <Footer />
        </React.Fragment>

        
    );
}

export default HomeSite;