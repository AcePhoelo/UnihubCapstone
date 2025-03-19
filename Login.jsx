import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [studentID, setStudentID] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleGuestClick = () => {
        const eventName = "Board Game Tournament";
        window.open("/feedback/" + encodeURIComponent(eventName), '_blank');
    };

    const handleLoginClick = () => {
        /*
        if (!studentID || !password) {
            setError("Login was unsuccessful. Please correct the errors and try again.\nInvalid Curtin ID or password.");
            return;
        }
        */

       //Remove comments and these two lines when trying to check login credentials
        localStorage.setItem('studentID', studentID);
        navigate('/club-directory');

        // Commented out API call (Skipping login verification)
        /*
        fetch('http://localhost:8000/api/login/', {  
            method: 'POST',
            body: JSON.stringify({ studentID, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'  
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    localStorage.setItem('studentID', studentID);
                    navigate('/club-directory'); 
                } else {
                    setError("Login was unsuccessful. Please correct the errors and try again.\nInvalid Curtin ID or password.");
                }
            })
            .catch(() => setError("Login was unsuccessful. Please correct the errors and try again.\nInvalid Curtin ID or password."));
        */
    };

    return (
        <div className="login-page">
            <div>
                <div className="login-header">
                    <div className="login-title">
                        Unihub+
                    </div>
                </div>
                <div className='login-container'>
                    <div className="login-inputs">
                        <div className="login-input-group">
                            <div className="login-text">Curtin ID</div>
                            <input
                                type="text"
                                className="login-input"
                                value={studentID}
                                onChange={(e) => setStudentID(e.target.value)}
                            />
                        </div>
                        <div className="login-input-group">
                            <div className="login-text">Password</div>
                            <input
                                type="password"
                                className="login-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {error && <p className="login-error">{error}</p>}

                        <div className="login-submit-container">
                            <div className="login-submit" onClick={handleLoginClick}>
                                Login to Unihub+
                            </div>
                        </div>
                    </div>
                </div>

                <div className="login-forgot-password">
                    <span>Forgot your password?</span>
                </div>
                <div className="login-guest-container">
                    <div className="login-guest" onClick={handleGuestClick}>
                        Continue as Guest
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;