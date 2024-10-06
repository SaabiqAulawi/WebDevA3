import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';  // Pastikan untuk membuat dan mengimpor CSS yang sesuai

const Header = () => {
    return (
        <header className="header">
            <div className="header-left">
                <Link to="/" className="logo">BiLk21</Link>
            </div>
            <div className="header-middle">
                <input type="text" placeholder="Search Drama" className="search-bar" />
            </div>
            <div className="header-right">
                <Link to="/login" className="header-button">Login</Link>
                <Link to="/registration" className="header-button">Signup</Link>
            </div>
        </header>
    );
};

export default Header;
