import React, {useState} from 'react';
import bg1 from './design/medi/img/slider-2.jpg'; 
import bg2 from './design/medi/img/slider-1.jpg'; 

function Carousel({t}) {
    return (
        <React.Fragment>
            <section className="home-slider owl-carousel" data-aos="fade-up">
                {/* <div className="slider-item" style={{ backgroundImage: `url(${bg1})` }}>

                <div className="container">
                    <div className="row slider-text align-items-center">
                    <div className="col-md-7 col-sm-12 element-animate">
                        <h1>Home Head</h1>
                        <p>Home Text</p>
                    </div>
                    </div>
                </div>

                </div> */}

                <div className="slider-item" style={{ backgroundImage: `url(${bg2})` }}>
                <div className="container">
                    <div className="row slider-text align-items-center">
                    <div className="col-md-7 col-sm-12 ">
                        <h1>{t('Carousel.care')}</h1>
                        <p>{t('Carousel.healthCare')}</p>
                    </div>
                    </div>
                </div>

                </div>

            </section>
        </React.Fragment>
    );
}
    
export default Carousel;