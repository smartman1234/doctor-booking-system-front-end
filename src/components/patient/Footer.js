import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from './design/medi/img/logo.png'; // with import
import { TransitionGroup } from 'react-transition-group';


function Footer({t}) {

    return (
            <footer className="site-footer pb-5" role="contentinfo" style={{ maxWidth: '100%', overflowX: 'hidden' }} >
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <img src={logo} alt="Doctor_Booking_Logo" width="150"/>
                            <p className="my-2">{t('Footer.healthCare')}  </p>
                        </div>
                        <div className="col-md-4 mb-3">
                            <h3>{t('Footer.links')}</h3>
                            <ul className="footer-link list-unstyled">
                                <li><a href="http://localhost:8000/doctor/">{t('Footer.DoctorsSystem')}</a></li>
                                <li><Link to="">{t('Footer.policies')}</Link></li>
                            </ul>
                        </div>
                        <div className="col-md-4 mb-3">
                            <h3>{t('Footer.contacts')} </h3>

                            <h4 className="text-uppercase mb-2 h6 text-white">{t('Footer.email')}  </h4>
                            <p className="mb-2"><Link to="mailto:info@yourdomain.com">info@yourdomain.com</Link></p>
                            <h4 className="text-uppercase mb-2 h6 text-white">{t('Footer.phone')}</h4>
                            <p>+1 24 435 3533</p>
                        </div>
                    </div>

                    <div className="row pt-md-3 ">
                        <div className="col-md-12">
                            <hr className="border-t" />
                        </div>
                        <div className="col-md-6 col-sm-12 copyright">
                            <p>&copy; 2021 {t('Footer.final')}  {t('Footer.designed')} &amp; {t('Footer.developed')}  <Link to="">{t('Footer.team')}</Link></p>
                        </div>
                        <div className="col-md-6 col-sm-12 text-md-right text-sm-left">
                            <Link to="#" className="p-2"><span className="fab fa-facebook"></span></Link>
                            <Link to="#" className="p-2"><span className="fab fa-github"></span></Link>
                            <Link to="#" className="p-2"><span className="fab fa-linkedin-in"></span></Link>
                        </div>
                    </div>
                </div>
            </footer>
    );
}

export default Footer;