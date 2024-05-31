import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../Contexts/UserContext';
import './Login.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/users/login', formData)
            .then(response => {
                console.log('Login successful:', response.data);
                localStorage.setItem('token', response.data.token); // Save token to local storage
                setUser(response.data.user); // Update user state in context
                navigate('/'); // Redirect to main page
                window.location.reload();
            })
            .catch(error => {
                console.error('Login failed:', error);
                // Handle error, e.g., display error message to user
            });
    };

    return (
        <div className="login-page">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
            <div className='signup-button'> 
                <button onClick={() => navigate('/signup')}>Sign Up</button>
            </div> 
        </div>
    );
};

export default LoginPage;
