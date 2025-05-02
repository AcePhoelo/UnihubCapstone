/* MyActivity.jsx */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './MyActivity.css';
import logo from '../../assets/logo.png';
import calendar from '../../assets/calendar.png';
import twitter from '../../assets/twitter.png';
import facebook from '../../assets/facebook.png';
import instagram from '../../assets/instagram.png';
import youtube from '../../assets/youtube.png';
import linkedin from '../../assets/linkedin.png';

const MyActivity = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [studentName, setStudentName] = useState('');
    const [studentID, setStudentID] = useState('');
    const studentEmail = localStorage.getItem('studentEmail');
    const [clubs, setClubs] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (studentEmail) {
            fetch(`https://mocki.io/v1/your-api-endpoint?email=${studentEmail}`)
                .then(response => response.json())
                .then(data => {
                    setStudentName(data.name || "Student");
                    setStudentID(data.studentID || "Unknown ID");
                    setEvents(data.events || []);
                    setClubs(data.clubs || []);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching student data:", error);
                    setError("Failed to load data.");
                    setLoading(false);
                });
        }
    }, [studentEmail]);

    useEffect(() => {
        const mockData = {
            name: "John BROWN",
            studentID: "21545689",
            clubs: [
                {
                    name: "Board Games Club",
                    imageUrl: "https://i.imgur.com/UXpOp6P.png",
                    description: 'Join us for fun board game nights, tournaments, and strategy sessions. Perfect for all board game lovers!'
                },
                {
                    name: "Art Society",
                    imageUrl: "https://i.imgur.com/LArlm9Z.png",
                    description: 'For creative artists, painters, and designers. Attend workshops, exhibitions, and showcase your talent.'
                }
            ],
            events: [
                {
                    name: "Board Games Night",
                    description: "An exciting evening of strategic board games and fun.",
                    imageUrl: "https://i.imgur.com/TEiuhlN.png",
                    club: {
                        name: "Board Games Club",
                        logoUrl: "https://i.imgur.com/IquR4rn.png"
                    }
                },
                {
                    name: "Curtin Arts Festival 2025",
                    description: "A week-long celebration of student creativity, with workshops and exhibitions.",
                    imageUrl: "https://i.imgur.com/dMN8qUn.png",
                    club: {
                        name: "Art Society",
                        logoUrl: "https://i.imgur.com/SXbupr8.png"
                    }
                }
            ]
        };

        setTimeout(() => {
            setStudentName(mockData.name);
            setStudentID(mockData.studentID);
            setClubs(mockData.clubs);
            setEvents(mockData.events);
            setLoading(false);
        },);
    }, []);

    const handleLogoClick = () => navigate('/club-directory');
    const handleClubsClick = () => navigate('/club-directory');
    const handleEventsClick = () => navigate('/event-directory');
    const handleActivityClick = () => navigate('/my-activity');
    const handleProfileClick = () => navigate('/profile');
    const handleCalendarClick = () => navigate('/calendar');

    const getInitials = (fullName) => {
        const names = fullName.trim().split(' ');
        const initials = names[0]?.charAt(0).toUpperCase() + (names[1]?.charAt(0).toUpperCase() || '');
        return initials;
    };

    return (
        <div className="my-activity-page">
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
                    <div
                        className="activity-navbar"
                        onClick={handleActivityClick}
                        style={{ color: location.pathname === '/my-activity' ? '#000000' : '#999999' }}
                    >
                        My Activity
                    </div>
                </div>
                <div className="navbar-right">
                    <div
                        className="profile-icon"
                        onClick={handleProfileClick}
                        style={{ cursor: 'pointer' }}
                    >
                        {getInitials(studentName || "John BROWN")}
                    </div>
                    <img src={calendar} alt="Calendar" className="calendar-icon"
                        onClick={handleCalendarClick}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
            </div>

            <div className="activity-section">
                {/* Clubs */}
                <div className="activity-club-explore">
                    <div className="activity-club-explore-title">Clubs</div>
                    {error && <div className="error-text" style={{ marginBottom: '1rem' }}>{error}</div>}
                    <div className="activity-clubs-grid">
                        {clubs.length > 1 && clubs.slice(0).map((club, index) => (
                            <div
                                key={index}
                                className="activity-exlore-club-box"
                                onClick={() => navigate(`/club/${encodeURIComponent(club.name)}`)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="activity-club-card">
                                    <img
                                        src={club.imageUrl}
                                        alt={club.name}
                                        className="activity-club-card-banner"
                                    />
                                    <div className="activity-club-card-name">
                                        {club.name}
                                    </div>
                                    <div className="activity-club-card-description">
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

            <div className="activity-section">

                {/* Events */}
                <div className="activity-event-explore">
                    <div className="activity-event-explore-container">
                        <div className="activity-event-explore-title">Events</div>
                        {error && <div className="error-text" style={{ marginBottom: '1rem' }}>{error}</div>}
                        <div className="activity-events-grid">
                            {events.length > 1 && events.slice(0).map((event, index) => (
                                <div
                                    key={index}
                                    className="activity-event-card-wrapper"
                                    onClick={() => navigate(`/event/${encodeURIComponent(event.name)}`)}
                                >
                                    <div className="activity-event-card">
                                        <img
                                            src={event.imageUrl}
                                            alt={event.name}
                                            className="activity-event-card-banner"
                                        />
                                        <div className="activity-event-card-content">
                                            <div className="activity-event-card-name">{event.name}</div>
                                            <div className="activity-event-card-description">{event.description}</div>
                                            <div className="activity-spacer"></div>
                                            <div className="activity-event-card-meta">
                                                Date: TBD | Time: TBD | Place: TBD
                                            </div>
                                        </div>
                                    </div>

                                    {/* Club logo */}
                                    <div className="activity-event-club-section" onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/club/${encodeURIComponent(event.club.name)}`);
                                    }}>
                                        {event.club?.logoUrl ? (
                                            <img src={event.club.logoUrl} alt={event.club.name} className="activity-event-club-icon" />
                                        ) : (
                                            <div className="activity-event-club-icon-placeholder">Logo</div>
                                        )}
                                        <div className="activity-event-club-name">{event.club?.name}</div>
                                    </div>
                                </div>
                            ))}
                            {events.length === 0 && !loading && (
                                <div className="error-text">No logo available</div>
                            )}
                        </div>
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

export default MyActivity;