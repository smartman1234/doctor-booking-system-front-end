import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from './design/medi/img/doc_boc.png'; // with import
import { TransitionGroup } from 'react-transition-group';


// // import '../../design/medi/js/jquery-3.2.1.min.js';
// import '../../design/medi/js/popper.min.js';
// import '../../design/medi/js/bootstrap.min.js';
// import '../../design/medi/js/owl.carousel.min.js';
// import '../../design/medi/js/bootstrap-datepicker.js';
// // import '../../design/medi/js/jquery.timepicker.min.js';
// import '../../design/medi/js/jquery.waypoints.min.js';
// import '../../design/medi/js/jquery.nice-select.min.js';
// // import '../../design/medi/plugins/toastr/toastr.min.js';
// import '../../design/medi/plugins/dropzone-master/dist/min/dropzone.min.js';
// import '../../design/medi/js/password_strength_meter.js';
// import '../../design/medi/js/main.js';




function Footer() {

    return (
        
            <footer className="site-footer" role="contentinfo" style={{ maxWidth: '100%', overflowX: 'hidden' }} data-aos="fade-up">
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <img src={logo} alt="Doctor_Booking_Logo" width="150"/>
                        <p className="my-2"> We Provide Fully Automated Health Care System. </p>
                    </div>
                    <div className="col-md-4 mb-3">
                        <h3>Important Link</h3>
                        <ul className="footer-link list-unstyled">
                            <li><Link to="/login"> Login For Doctor</Link></li>
                            <li><Link to="/login"> Login For Pharmacy</Link></li>
                            <li><Link to="">Policies</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-4 mb-3">
                        <h3>Contact </h3>

                        <h4 className="text-uppercase mb-2 h6 text-white"> Email </h4>
                        <p className="mb-2"><Link to="mailto:info@yourdomain.com">info@yourdomain.com</Link></p>
                        <h4 className="text-uppercase mb-2 h6 text-white">Phone</h4>
                        <p>+1 24 435 3533</p>
                    </div>
                </div>

                <div className="row pt-md-3 ">
                    <div className="col-md-12">
                        <hr className="border-t" />
                    </div>
                    <div className="col-md-6 col-sm-12 copyright">
                        <p>&copy; 2021 Doctor Booking System(ITI). Designed &amp; Developed by <Link to="">Fata7el Team</Link></p>
                    </div>
                    <div className="col-md-6 col-sm-12 text-md-right text-sm-left">
                        <Link to="#" className="p-2"><span className="fab fa-facebook"></span></Link>
                        <Link to="#" className="p-2"><span className="fab fa-github"></span></Link>
                        <Link to="#" className="p-2"><span className="fab fa-linkedin-in"></span></Link>
                    </div>
                </div>
                </footer>
    );
}

export default Footer;