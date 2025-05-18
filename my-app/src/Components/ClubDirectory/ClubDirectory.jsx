import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ClubDirectory.css';
import logo from '../../assets/logo.png';
import calendar from '../../assets/calendar.png';
import twitter from '../../assets/twitter.png';
import facebook from '../../assets/facebook.png';
import instagram from '../../assets/instagram.png';
import youtube from '../../assets/youtube.png';
import linkedin from '../../assets/linkedin.png';
import { useAuth } from '../../contexts/AuthContext';

const ClubDirectory = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, refreshUserData } = useAuth();
    const studentName = user?.full_name || 'Unknown Student';
    const profilePicture = user?.profile_picture || '';
    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const isGuest = user?.isGuest || false;

    useEffect(() => {
    
        // Fetch club data from the backend
        const fetchClubs = async () => {
            try {
                const token = localStorage.getItem('access_token'); // Retrieve the token from localStorage
                const response = await fetch('https://54.169.81.75:8000/clubs/', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                        'Content-Type': 'application/json',
                    },
                });
    
                if (response.ok) {
                    const data = await response.json();
                    setClubs(data);
                } else if (response.status === 401) {
                    setError('Unauthorized: Please log in again.');
                    localStorage.removeItem('access_token'); // Clear invalid token
                    navigate('/login'); // Redirect to login page
                } else {
                    setError('Failed to fetch clubs.');
                }
            } catch (err) {
                console.error('Error fetching clubs:', err);
                setError('An error occurred while fetching clubs.');
            } finally {
                setLoading(false);
            }
        };
    
        fetchClubs();
    }, [navigate]);

    const handleLogoClick = () => navigate('/club-directory');
    const handleClubsClick = () => navigate('/club-directory');
    const handleEventsClick = () => navigate('/event-directory');
    const handleActivityClick = () => navigate('/my-activity');
    const handleCalendarClick = () => navigate('/calendar');
    const handleProfileClick = () => navigate('/profile');

    const getInitials = (fullName) => {
        const names = fullName.trim().split(' ');
        const initials = names[0]?.charAt(0).toUpperCase() + (names[1]?.charAt(0).toUpperCase() || '');
        return initials;
    };

    return (
        <div className="club-directory-page">
            {/* Navbar */}
            <div className="navbar">
                <img src={logo} alt="Logo" className="curtin-logo" onClick={handleLogoClick} />

                <div className="navbar-text">
                    <div
                        className="clubs-navbar"
                        onClick={handleClubsClick}
                        style={{ color: location.pathname === '/club-directory' ? '#000000' : '#999999' }}
                    >
                        Clubs
                    </div>
                    <div
                        className="events-navbar"
                        onClick={handleEventsClick}
                        style={{ color: location.pathname === '/event-directory' ? '#000000' : '#999999' }}
                    >
                        Events
                    </div>
                    {!isGuest && (
                        <div
                            className="activity-navbar"
                            onClick={handleActivityClick}
                            style={{ color: location.pathname === '/my-activity' ? '#000000' : '#999999' }}
                        >
                            My Activity
                        </div>
                    )}
                </div>
                <div className="navbar-right">
                    {!isGuest ? (
                        <div
                            className="profile-icon"
                            onClick={handleProfileClick}
                            style={{
                                cursor: 'pointer',
                                backgroundImage: `url(${profilePicture || ''})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                border: '2px solid #ccc',
                            }}
                        >
                            {!profilePicture && getInitials(studentName || 'Unknown Student')}
                        </div>
                    ) : (
                        <div
                            className="profile-icon"
                            onClick={() => navigate('/login')}
                            style={{
                                cursor: 'pointer',
                                fontSize: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                backgroundColor: '#f0f0f0',
                                color: '#999',
                            }}
                        >
                            LOGIN
                        </div>
                    )}
                    <img
                        src={calendar}
                        alt="Calendar"
                        className="calendar-icon"
                        onClick={handleCalendarClick}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
            </div>

            {/* Club Directory Body */}
            <div className="club-body">
                {/* Featured Club */}
                <div className="featured-club">
                    <div className="featured-club-container">
                        {!loading && clubs.length > 0 && (() => {
                            const club = clubs[0];
                            return (
                                <div
                                    className="featured-club-box"
                                    onClick={() => navigate(`/club/${club.id}`)}
                                >
                                    <img
                                        src={`https://54.169.81.75:8000${club.banner}`}
                                        alt={club.name}
                                        className="featured-club-image"
                                    />
                                    <div className="featured-club-name">
                                        {club.name}
                                    </div>
                                </div>
                            );
                        })()}
                        {loading && <div className="loading-text">Loading featured club...</div>}
                        {error && <div className="error-text">{error}</div>}
                    </div>
                </div>

                {/* Explore Clubs */}
                <div className="club-explore">
                    <div className="club-explore-title">Explore</div>
                    {error && <div className="error-text" style={{ marginBottom: '1rem' }}>{error}</div>}
                    <div className="clubs-grid">
                        {clubs.length > 1 && clubs.slice(1).map((club, index) => (
                            <div
                                key={index}
                                className="exlore-club-box"
                                onClick={() => navigate(`/club/${club.id}`)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="club-card">
                                    {club.banner ? (
                                        <img
                                            src={`https://54.169.81.75:8000${club.banner}`}
                                            alt={club.name}
                                            className="club-card-banner"
                                        />
                                    ) : (
                                        <div className="club-card-banner">
                                            No Banner Available
                                        </div>
                                    )}
                                    <div className="club-card-name">
                                        {club.name}
                                    </div>
                                    <div className="club-card-description">
                                        {club.description}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {clubs.length === 0 && !loading && (
                            <div className="error-text">No clubs available</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="footer">
                <div className="footer-left">
                    <a
                        href="https://www.curtin.edu.au/socialmedia/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="follow-link"
                    >
                        Follow Curtin
                    </a>
                    <div className="social-media">
                        <a href="https://x.com/curtinuni" target="_blank" rel="noopener noreferrer">
                            <img src={twitter} alt="Twitter" className="twitter" />
                        </a>
                        <a href="https://www.facebook.com/curtinuniversity" target="_blank" rel="noopener noreferrer">
                            <img src={facebook} alt="Facebook" className="facebook" />
                        </a>
                        <a href="https://www.instagram.com/curtinuniversity/" target="_blank" rel="noopener noreferrer">
                            <img src={instagram} alt="Instagram" className="instagram" />
                        </a>
                        <a href="https://www.youtube.com/user/CurtinUniversity" target="_blank" rel="noopener noreferrer">
                            <img src={youtube} alt="YouTube" className="youtube" />
                        </a>
                        <a href="https://www.linkedin.com/school/8788/" target="_blank" rel="noopener noreferrer">
                            <img src={linkedin} alt="LinkedIn" className="linkedin" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClubDirectory;