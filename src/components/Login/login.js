import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { login } from '../../Actions/Authaction';
import './login.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const success = dispatch(login(username, password)); // Assuming login returns success status
    //     navigate('/add-stock')
    //     // if (success) {
    //     //     ; // Navigate to Add Stock page on success
    //     // } else {
    //     //     alert('Invalid credentials. Please try again.');
    //     // }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await dispatch(login(username, password));
        if (success) {
            navigate('/add-stock');
        } else {
            alert('Invalid credentials. Please try again.');
        }
    };




    return (
        <div className='container'>
            <div className='image-container'>
                <img src='../assests/store.webp' alt=''></img>
            </div>
            <div className='form-container'>
                <h1>RAJAKAKA ELECTRONICS</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">User Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </div>

                    <button type="submit" className="btn primary">Submit</button>
                </form>
            </div>
        </div>
    );
}
