import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Login = () => {
    return (
        <div className="auth-container">
            <div className="header-right">
                <Link to="/" className="logo">BiLk21</Link>
            </div>
            <div className="auth-box">
                <h2>Login</h2>
                <form>
                    <div className="input-group">
                        <label>Username</label>
                        <input type="text" name="username" />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" name="password" />
                    </div>
                    <button className="btn-primary" type="submit">Sign in</button>
                    <button className="btn-secondary" type="button">Sign in with Google</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
