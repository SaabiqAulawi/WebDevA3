import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Auth.css';

const Registration = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Lakukan request ke backend untuk registrasi
            const response = await fetch('URL_BACKEND_REGISTER', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                toast.success('Registrasi berhasil!'); // Menampilkan notifikasi
                setTimeout(() => navigate('/'), 2000); // Mengarahkan ke halaman utama setelah 2 detik
            } else {
                const data = await response.json();
                toast.error(data.message || 'Registrasi gagal');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Terjadi kesalahan dalam registrasi');
        }
    };

    return (
        <div className="auth-container">
            <ToastContainer /> {/* Tambahkan ToastContainer untuk menampilkan notifikasi */}
            <div className="auth-box">
                <h2>Registration</h2>
                <form onSubmit={handleRegister}>
                    <div className="input-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="btn-primary" type="submit">Sign up</button>
                    <button className="btn-secondary" type="button">Sign up with Google</button>
                </form>
            </div>
        </div>
    );
};

export default Registration;
