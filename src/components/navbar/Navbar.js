import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import 'react-dropdown/style.css';
import logo from '../patient/design/medi/img/logo.png'; 
import Languages from '../patient/Languages';
import Cookies from 'universal-cookie';


function Navbar(props) {
    const cookies = new Cookies();
    const isAuthenticated = cookies.get("jwt");
    const logout = () => {

        fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        }).then(res => {
            console.log(res);
            props.setUser('');
            props.setLogin();
        }).catch(err => console.log(err));

    }

    let links;

    if(typeof isAuthenticated === "undefined")
    {
        links = (
            <ul className="navbar-nav my-2 my-lg-0">
                <li className="nav-item">
                    <Link to="/login" className="nav-link mt-2">Login</Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link mt-2">Register</Link>
                </li>
            </ul> 
        );
    }else {
        links = (
            <ul className="navbar-nav my-2 my-lg-0">
                <li className="nav-item">
                <img style={{ width: 40, height: 40 }} className="rounded-circle" alt="profile pic" src={"http://127.0.0.1:8000/storage/patients/" + props.user.image}/>
                    <Link style={{ display: "inline-block" }} to="/profile" className="nav-link">Profile</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" onClick={logout} className="nav-link">Logout</Link>
                </li>
                
            </ul>
        );
    }

    return (
        <React.Fragment>
            <header role="banner" data-aos="fade-up">
            
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                <Link className="navbar-brand" to="/site">
                    <img src={logo} alt="doctor-booking" />
                </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExample05">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link mt-2" to="/" >Home </Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link mt-2" href="http://localhost:8000/doctor/">Doctors System</a>
                        </li>
                        <li className="dropdown nav-item">
                        <span className="nav-link"> <i className="fa fa-globe"></i> <Languages /> </span>
                        </li>                        
                    </ul>
                    {links}
                    </div>
                    </div>
            </nav>
        </header>
        </React.Fragment>
    );
}

export default Navbar;