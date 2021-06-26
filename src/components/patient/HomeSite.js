import React, {useState} from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import Search from './Search';
import Carousel from './Carousel';
import WhyChooseUs from './WhyChooseUs';
import HowToUse from './HowToUse';
import Aos from 'aos';
import 'aos/dist/aos.css';

function HomeSite({sendDoctorDataParentHome,t}) {

    const [doctorData, setDoctorData] = React.useState([]); // the lifted state
    const sendDoctorDataParent = (index,searchParams) => {
        // the callback. Use a better name
        console.log("Parent | sendDoctorDataParent => ", index);
        console.log("Parent | sendSearchParamsParent => ", searchParams);
        sendDoctorDataParentHome(index,searchParams);
        setDoctorData(index);
      };
        Aos.init()
        return (
        <React.Fragment>
            <title>BookDoc</title>
            {/* <Navbar /> */}
            <Carousel t={t}/>
            <Search  sendDoctorDataParent={sendDoctorDataParent} t={t}/>
            <WhyChooseUs t={t}/>
            <HowToUse t={t}/>
            
        </React.Fragment>

        
    );
}

export default HomeSite;