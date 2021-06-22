import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import 'react-dropdown/style.css';
import logo from './design/medi/img/doc_boc1.png'; // with import
import Languages from './Languages';
import OurSystem from './OurSystem';

function Navbar() {
    return (
        <React.Fragment>
            <header role="banner" data-aos="fade-up">
            
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                <a className="navbar-brand" href="/home">
                    <img src={logo} alt="doctor-booking" />
                </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExample05">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link mt-2" to="/" >Home </Link>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link"> <OurSystem /> </span>
                        </li>

                        {/* <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Our Systems</Link>
                            <div className="dropdown-menu" aria-labelledby="dropdown04">
                                <Link className="dropdown-item" to="/login"> Doctor-Booking For Doctor</Link>
                                <Link className="dropdown-item" to="/login"> Doctor-Booking For Pharmacy</Link>
                            </div>
                        </li> */}
                        
                        {/* <li className="dropdown nav-item">
                            <Link className="nav-link dropdown-toggle no-cursor" to="" id="dropdown06" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-globe"></i>
                                <span className="">language</span>
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="dropdown06">
                                <Link className="dropdown-item" to="/lang/ar"><i className="fa fa-flag"></i> عربى</Link>
                                <Link className="dropdown-item" to="/lang/en"><i className="fa fa-flag"></i> English</Link>
                            </ul>
                        </li> */}

                        <li className="dropdown nav-item">
                        <span className="nav-link"> <i className="fa fa-globe"></i> <Languages /> </span>
                        </li>



                        {/* @if (patient()->check())
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle no-cursor" to="" id="dropdown05" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                @if (!empty(patient()->user()->image))
                                <img src=" Storage::url('images/'. patient()->user()->image" className="user-image" alt="User Image"/>
                                @else
                                <img src="url('/design/medi')}}/img/avatar5.png" className="user-image" alt="User Image">
                                @endif
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="dropdown05">
                                <Link className="dropdown-item" to=" url('profile')}}"> trans('admin.Profile'</Link>
                                <Link className="dropdown-item" to=" url('auth/logout')}}"> trans('admin.Logout'</Link>
                            </div>
                        </li>
                        @else
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle no-cursor" to="" id="dropdown05" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className='fa fa-user'></i></Link>
                            <div className="dropdown-menu" aria-labelledby="dropdown05">
                                <Link className="dropdown-item" to=" url('auth/login')}}"> trans('admin.Login'</Link>
                                <Link className="dropdown-item" to=" url('auth/register')}}"> trans('admin.Register'</Link>
                            </div>
                        </li>
                        @endif */}

                        
                    </ul>
                    </div>
                    </div>
            </nav>
        </header>
        </React.Fragment>
    );
}

export default Navbar;