import React from 'react';
import {
    Link
} from "react-router-dom";
import { useLocation } from 'react-router-dom';
// import {useHistory} from 'react-router';

export default function Navbar() {
    const location = useLocation();
    // const history = useHistory();

    // const handleLogout = ()=>{
    //     localStorage.removeItem('jwt-token');
    //     history.push('/login');
    // };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/home' ? 'active' : ''}`} to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
                        </li>
                    </ul>
                </div>

                
            </div>
        </nav>
    )
}
