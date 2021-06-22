import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

function Nav(props) {
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
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
            </ul> 
        );
    }else {
        links = (
            <ul className="navbar-nav my-2 my-lg-0">
                <li className="nav-item">
                <img style={{ width: 50, height: 50 }} alt="profile pic" src={"http://127.0.0.1:8000/storage/patients/" + props.user.image}/>
                    <Link style={{ display: "inline-block" }} to="/profile" className="nav-link">Profile</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" onClick={logout} className="nav-link">Logout</Link>
                </li>
            </ul>
        );
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-primary">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/site" className="nav-link">Site</Link>
                </li>
            </ul>

            {links}
        </nav>
    );
}

export default Nav;