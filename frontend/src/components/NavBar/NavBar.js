import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './NavBar.css';

import UserContext from '../../Contexts/UserContext';

import DarkModeToggle from './DarkModeToggle/DarkModeToggle';

const NavBar = () => {
    const { user, setUser } = useContext(UserContext);

    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get('http://localhost:5000/api/users/info', { headers: { 'authorization': token }})
            .then(response => setUser(response.data))
            .catch(error => console.log(error));
    }, [setUser, user, token]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <nav className="navbar">
            <Link to="/">
                <div className="logo-container">
                    <img src="/logo96.png" alt="LNMania" className="logo" />
                    <h1>LNMania</h1>
                </div>
            </Link>
            <div className="user-container">
                {user ? (
                    <div className="user-info">
                        <span>{user.name}</span>
                        <div className="dropdown">
                            <button className="dropbtn">&#9660;</button>
                            <div className="dropdown-content">
                                <div className="">
                                    <Link to="/library">
                                    <a href='/'>Library</a>
                                    </Link>
                                </div>
                                {user.authority === 'ADMIN' && (
                                    <div className="">
                                        <Link to="/control">
                                            <a href='/'>Control Room</a>
                                        </Link>
                                    </div>
                                )}
                                <div className="">
                                    <Link to="/">
                                        <a onClick={handleLogout} href='/'>Logout</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div> 
                ) : (
                    <Link to="/login">
                        <button className="login-btn">Sign In/Register</button>
                    </Link>
                )}
            </div>
            {/* Substitute the search bar with a Link to the search page */}
            <div className="search-bar">
                <Link to="/search">
                    <button className="search-btn">Search</button>
                </Link>
            </div>
            <DarkModeToggle />
        </nav>
    );
};

export default NavBar;
