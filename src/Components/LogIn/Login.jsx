import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [student_id, setstudent_id] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGuestClick = () => {
        const eventName = "Board Game Tournament";
        window.open("/feedback/" + encodeURIComponent(eventName), '_blank');
    };

    const handleLoginClick = async () => {
        if (!student_id || !password) {
            setError("Login was unsuccessful. Please correct the errors and try again.\nInvalid Curtin ID or password.");
            return;
        }
    
        setIsLoading(true);
        try {
            // Post to the /api/token/ endpoint to receive access and refresh tokens.
            const response = await fetch('http://18.141.193.54:8000/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Send the student_id in the "username" field as expected by the default serializer.
                body: JSON.stringify({ username: student_id, password }),
            });
    
            const data = await response.json();
            setIsLoading(false);
    
            if (response.ok && data.access) {
                // Store the tokens and student ID for later use.
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                localStorage.setItem('student_id', student_id);
    
                // Fetch the profile data using the access token.
                const accessToken = localStorage.getItem('access_token'); // Retrieve the token from localStorage
                const profileResponse = await fetch('http://18.141.193.54:8000/profile/profile/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`, // Include the token in the Authorization header
                        'Content-Type': 'application/json',
                    },
                });
    
                const profileData = await profileResponse.json();
    
                if (profileResponse.ok) {
                    // Store the profile data in localStorage or state for later use.
                    localStorage.setItem('profile', JSON.stringify(profileData));
                    navigate('/club-directory');
                } else {
                    setError("Failed to fetch profile data. Please try again.");
                }
            } else {
                setError("Login was unsuccessful. Please check your Curtin ID or password.");
            }
        } catch (error) {
            setIsLoading(false);
            setError("Login was unsuccessful. Please try again later.");
        }
    };

    return (
        <div className="login-page">
            <div>
                <div className="login-header">
                    <div className="login-title">Unihub+</div>
                </div>
                <div className="login-container">
                    <div className="login-inputs">
                        <div className="login-input-group">
                            <div className="login-text">Curtin ID</div>
                            <input
                                type="text"
                                className="login-input"
                                value={student_id}
                                onChange={(e) => setstudent_id(e.target.value)}
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
                            <div 
                                className="login-submit" 
                                onClick={!isLoading ? handleLoginClick : undefined}
                                style={{ opacity: isLoading ? 0.7 : 1 }}
                            >
                                {isLoading ? 'Logging in...' : 'Login to Unihub+'}
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
};

export default Login;
