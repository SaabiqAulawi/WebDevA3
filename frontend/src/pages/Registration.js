import React from 'react';
import './Auth.css';

const Registration = () => {
    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Registration</h2>
                <form>
                    <div className="input-group">
                        <label>Username</label>
                        <input type="text" name="username" />
                    </div>
                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" name="email" />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" name="password" />
                    </div>
                    <button className="btn-primary" type="submit">Sign up</button>
                    <button className="btn-secondary" type="button">Sign up with Google</button>
                </form>
            </div>
        </div>
    );
};

export default Registration;
