// Login.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css'; // Import CSS file
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login, authToken } = useAuth();

    useEffect(() => {
        // Check if the user is already authenticated on component mount
        if (authToken) {
            navigate('/admin');
        }
    }, [authToken, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                username,
                password,
            });

            if (response.data.success) {
                login(response.data.data.token, response.data.data.name, response.data.data.id, response.data.data.foto_user);
                navigate('/admin'); // Redirect to /admin on successful login
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="login-container">
            <div className="ui form">
                <div className="form-title">Selamat Datang</div>
                <form className="user" onSubmit={handleLogin}>
                    <div className="field">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control form-control-user"
                            placeholder="Masukkan Username..."
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control form-control-user"
                            placeholder="Masukkan Password.."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="button-container">
                        <button type="submit" className="btn btn-user btn-block">
                            Login
                        </button>
                    </div>
                </form>
                <div className="register-link">
                    <p>
                        Belum Punya Akun?{' '}
                        <Link to="/register" className="register-link-text">
                            Register!
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
