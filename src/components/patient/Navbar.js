import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import 'react-dropdown/style.css';
import logo from './design/medi/img/doc_boc1.png'; 
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
                        <li className="dropdown nav-item">
                        <span className="nav-link"> <i className="fa fa-globe"></i> <Languages /> </span>
                        </li>                        
                    </ul>
                    </div>
                    </div>
            </nav>
        </header>
        </React.Fragment>
    );
}

export default Navbar;