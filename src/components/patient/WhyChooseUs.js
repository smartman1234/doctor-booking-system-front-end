import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';

import img1 from './design/medi/img/img_1.jpg';


function WhyChooseUs({t}) {
    return (
        <React.Fragment>
            <section className="section stretch-section" data-aos="fade-up">
              <div className="container">
                <div className="row justify-content-center mb-5">
                  <div className="col-md-8 text-center mb-5">
                    <h2 className="text-uppercase heading border-bottom mb-4">{t('WhyChooseUs.choose')}</h2>
                    <p className="mb-0 lead">{t('WhyChooseUs.healthSystem')} </p>
                  </div>
                </div>
                <div className="row align-items-center">

                  <div className="col-md-6 stretch-left-1 " data-animate-effect="fadeInLeft">
                    <Link to="#" className="video"><img src={img1} alt="" className="img-fluid" /></Link>
                  </div>
                  <div className="col-md-6 stretch-left-1-offset pl-md-5 pl-0 " data-animate-effect="fadeInLeft">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div className="media d-block media-feature text-center">
                          <span className="icon fa fa-file-archive my-4"></span>
                          <div className="media-body">
                            <h3 className="mt-0 text-black">{t('WhyChooseUs.paper')}  </h3>
                            <p> {t('WhyChooseUs.paperDesc')}  </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div className="media d-block media-feature text-center">
                          <span className="icon fa fa-calendar-alt my-4"></span>
                          <div className="media-body">
                            <h3 className="mt-0 text-black">{t('WhyChooseUs.booking')} </h3>
                            <p>{t('WhyChooseUs.bookingDesc')} </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div className="media d-block media-feature text-center">
                          <span className="icon fa fa-search my-4"></span>
                          <div className="media-body">
                            <h3 className="mt-0 text-black">{t('WhyChooseUs.search')} </h3>
                            <p>{t('WhyChooseUs.searchDesc')}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div className="media d-block media-feature text-center">
                          <span className="icon fa fa-user-md my-4"></span>
                          <div className="media-body">
                            <h3 className="mt-0 text-black">{t('WhyChooseUs.expert')} </h3>
                            <p>{t('WhyChooseUs.expertDesc')} </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
</React.Fragment>
);
}

export default WhyChooseUs;