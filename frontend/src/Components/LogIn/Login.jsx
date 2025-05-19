import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import bg from '../../assets/login-background.jpeg';
import { decodeHTMLEntities } from '../../utils';

const Login = () => {
    const navigate = useNavigate();
    const [student_id, setstudent_id] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGuestClick = () => {
        localStorage.setItem('isGuest', 'true');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('profile');
        navigate('/club-directory');
    };


    const handleLoginClick = async () => {
        // Clear any previous errors
        setError("");
        
        // Basic client-side validation
        if (!student_id || !password) {
            setError("Login ID and password are required.");
            return;
        }
        
        // Validate Student ID format on frontend too
        if (!/^\d{8}$/.test(student_id)) {
            setError("Student ID must be exactly 8 digits.");
            return;
        }
    
        setIsLoading(true);
        try {
            const response = await fetch('https://curtinunihubplus.com/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: student_id, password }),
            });
    
            const data = await response.json();
            setIsLoading(false);
    
            if (response.ok && data.access) {
                // Handle successful login (existing code)
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                localStorage.setItem('student_id', student_id);
                localStorage.setItem('isGuest', 'false');
        
                // Fetch profile (existing code)
                const accessToken = localStorage.getItem('access_token');
                const profileResponse = await fetch('https://curtinunihubplus.com/profile/profile/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });
        
                const profileData = await profileResponse.json();
        
                if (profileResponse.ok) {
                    // Handle successful profile fetch (existing code)
                    const enhancedProfile = {
                        ...profileData,
                        id: profileData.id || profileData.user_id,
                        user_id: profileData.user_id || profileData.id,
                        studentid: profileData.studentid || student_id,
                        full_name: profileData.full_name || profileData.name || "Unknown",
                    };
        
                    localStorage.setItem('profile', JSON.stringify(enhancedProfile));
                    navigate('/club-directory');
                } else {
                    setError("Failed to fetch profile data. Please try again.");
                }
            } else {
                if (response.status === 401) {
                    setError("Invalid student ID or password.");
                } else if (response.status === 400) {
                    setError(decodeHTMLEntities(data.detail || data.message || "Invalid input. Please check your credentials."));
                } else if (response.status === 429) {
                    setError("Too many login attempts. Please try again later.");
                } else {
                    setError("Login failed. Please try again.");
                }
            }
        } catch (error) {
            setIsLoading(false);
            setError("Connection error. Please check your internet and try again.");
        }
    };

    return (
        <div className="login-page" style={{ '--login-bg': `url(${bg})` }}>
            <div>
                <div className="login-container">
                    <div className="login-title">Unihub+</div>
                    <div className="login-inputs">
                        <div className="login-input-group">
                            <input
                                type="text"
                                className="login-input"
                                placeholder="Curtin ID"
                                value={student_id}
                                onChange={(e) => setstudent_id(e.target.value)}
                            />
                        </div>
                        <div className="login-input-group">
                            <input
                                type="password"
                                className="login-input"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {error && <p className="login-error">{error}</p>}

                        <div className="login-forgot-password">
                            <span>Forgot your password?</span>
                        </div>

                        <div className="login-submit-container">
                            <div 
                                className="login-submit" 
                                onClick={!isLoading ? handleLoginClick : undefined}
                                style={{ opacity: isLoading ? 0.7 : 1 }}
                            >
                                {isLoading ? 'Logging in...' : 'Login to Unihub+'}
                            </div>
                        </div>
                        <div className="login-guest">
                            <span onClick={handleGuestClick}>Don't have an account? <strong>Continue as Guest</strong></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;