import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import bg1 from './design/medi/img/slider-2.jpg'; // with import
import bg2 from './design/medi/img/slider-1.jpg'; // with import


function Carousel() {
    return (
        <React.Fragment>
            <section class="home-slider owl-carousel" data-aos="fade-up">
                {/* <div class="slider-item" style={{ backgroundImage: `url(${bg1})` }}>

                <div class="container">
                    <div class="row slider-text align-items-center">
                    <div class="col-md-7 col-sm-12 element-animate">
                        <h1>Home Head</h1>
                        <p>Home Text</p>
                    </div>
                    </div>
                </div>

                </div> */}

                <div class="slider-item" style={{ backgroundImage: `url(${bg2})` }}>
                <div class="container">
                    <div class="row slider-text align-items-center">
                    <div class="col-md-7 col-sm-12 ">
                        <h1>We Care For You</h1>
                        <p>We Provide Fully Automated Health Care System</p>
                    </div>
                    </div>
                </div>

                </div>

            </section>
        </React.Fragment>
    );
}
    
export default Carousel;