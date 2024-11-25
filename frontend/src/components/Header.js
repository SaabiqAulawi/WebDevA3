import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';  // Pastikan untuk membuat dan mengimpor CSS yang sesuai
import { useAuthStore } from '../store/authStore';

const Header = () => {
    const navigate = useNavigate();
    const {logout} = useAuthStore();

    // Fungsi untuk menangani logout
    const handleLogout = () => {
        logout();
        navigate('/login')
    };

    return (
        <header className="header">
            <div className="header-left">
                <Link to="/" className="logo">BiLk21</Link>
            </div>
            <div className="header-middle">
                <input type="text" placeholder="Search Drama" className="search-bar" />
            </div>
            <div className="header-right">
                {/* Tambahkan tombol Logout */}
                <button onClick={handleLogout} className="header-button">Logout</button>

                {/* Tampilkan tombol Login dan Signup */}
                <Link to="/login" className="header-button">Login</Link>
                <Link to="/registration" className="header-button">Signup</Link>
            </div>
        </header>
    );
};

export default Header;
