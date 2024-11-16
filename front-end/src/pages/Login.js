import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        // Handle login logic here
        console.log('Email:', email);
        console.log('Password:', password);
        navigate('/dashboard');
    };

    return (
        <div className="container">
            <div className="row">
                <div className='d-flex justify-content-center align-items-center'>
                    <h2>Login</h2>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ margin: '10px 0', padding: '10px', width: '300px' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ margin: '10px 0', padding: '10px', width: '300px' }}
                />
                <button onClick={handleLogin} style={{ padding: '10px 20px', cursor: 'pointer' }}>
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;