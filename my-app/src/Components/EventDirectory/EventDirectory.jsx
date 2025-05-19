import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './EventDirectory.css';
import logo from '../../assets/logo.png';
import calendar from '../../assets/calendar.png';
import twitter from '../../assets/twitter.png';
import facebook from '../../assets/facebook.png';
import instagram from '../../assets/instagram.png';
import youtube from '../../assets/youtube.png';
import linkedin from '../../assets/linkedin.png';
import { useAuth } from '../../contexts/AuthContext';

const EventDirectory = () => {
    const navigate = useNavigate();
    const { user, refreshUserData } = useAuth();
    const location = useLocation();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Remove these separate state variables
    // const [studentName, setStudentName] = useState('');
    // const [studentID, setStudentID] = useState('');
    // const studentEmail = localStorage.getItem('studentEmail');

    const navigateToClub = (clubId, clubName) => {
        // If clubId is missing or undefined
        if (!clubId || clubId === 'undefined') {
            console.error(`Invalid club ID for ${clubName || 'unknown club'}`);
            
            // Navigate to error page with custom error information
            navigate('/error', { 
                state: { 
                    errorCode: '500',
                    errorMessage: 'Invalid Club Reference',
                    errorDetails: `Cannot load the club page for "${clubName || 'this club'}" because the club ID is missing or invalid.`
                }
            });
        } else {
            // Normal navigation to the club page
            navigate(`/club/${clubId}`);
        }
    };

    useEffect(() => {
        // Fetch events from the backend
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await fetch('https://curtinunihubplus.com/api/event/add_event/', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                const formattedEvents = data.map(event => ({
                    id: event.id,
                    name: event.name,
                    description: event.description,
                    imageUrl: event.banner,
                    date: event.date,
                    time: event.time,
                    place: event.location,
                    unit: event.unit || '',
                    club: {
                        name: event.club_details.name,
                        logoUrl: event.club_details.logo,
                        id: event.club_details.id, // Make sure to include the club ID
                    },
                }));
                setEvents(formattedEvents);
            } catch (error) {
                console.error("Error fetching events:", error);
                setError("Failed to load events.");
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
        
        // If we don't have user data yet, refresh it
        if (!user && !localStorage.getItem('isGuest')) {
            refreshUserData();
        }
    }, [refreshUserData, user]);

    // useEffect(() => {
    //     if (studentEmail) {
    //         const fetchStudentData = async () => {
    //             try {
    //                 const response = await fetch(`https://curtinunihubplus.com/api/profile/?email=${studentEmail}`);
    //                 if (!response.ok) {
    //                     throw new Error(`HTTP error! status: ${response.status}`);
    //                 }
    //                 const data = await response.json();
    //                 setStudentName(data.full_name || "Student");
    //                 setStudentID(data.studentid || "Unknown ID");
    //             } catch (error) {
    //                 console.error("Error fetching student data:", error);
    //                 setStudentName("Unknown Student");
    //                 setStudentID("Unknown ID");
    //             }
    //         };

    //         fetchStudentData();
    //     }
    // }, [studentEmail]);

    const handleLogoClick = () => navigate('/club-directory');
    const handleClubLogoClick = (event, club) => {
        event.stopPropagation(); // Prevent event bubbling to event card
        navigateToClub(club?.id, club?.name);
    };
    const handleClubsClick = () => navigate('/club-directory');
    const handleEventsClick = () => navigate('/event-directory');
    const handleActivityClick = () => navigate('/my-activity');
    const handleProfileClick = () => navigate('/profile');
    const handleCalendarClick = () => navigate('/calendar');

    const getInitials = (fullName) => {
        if (!fullName) return '';
        const names = fullName.trim().split(' ');
        const initials = names[0]?.charAt(0).toUpperCase() + (names[1]?.charAt(0).toUpperCase() || '');
        return initials;
    };

    const isGuest = user?.isGuest || localStorage.getItem('isGuest') === 'true';

    return (
        <div className="event-directory-page">
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
                <div
                        className="profile-icon"
                        onClick={() => navigate(isGuest ? '/login' : '/profile')}
                        style={{
                            cursor: 'pointer',
                            fontSize: isGuest ? '14px' : '24px',
                            backgroundImage: user?.profile_picture ? `url(${user.profile_picture})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {isGuest ? 'LOGIN' : (!user?.profile_picture && getInitials(user?.full_name || ""))}
                    </div>
                    <img src={calendar} alt="Calendar" className="calendar-icon"
                        onClick={handleCalendarClick}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
            </div>

            {/* Event Directory Body */}
            <div className="event-body">
                {/* Featured Event */}
                <div className="featured-event">
                    <div className="featured-event-container">
                        {/* Display the first event as featured */}
                        {!loading && events.length > 0 && (() => {
                            const event = events[0];
                            return (
                                <div
                                    className="featured-event-box"
                                    onClick={() => navigate(`/event/${encodeURIComponent(event.name)}`)}
                                >
                                    <img
                                        src={event.imageUrl}
                                        alt={event.name}
                                        className="featured-event-image"
                                    />
                                    <div className="featured-event-header">
                                        <div className="featured-event-name">{event.name}</div>
                                        {event.club?.logoUrl && (
                                            <img
                                                src={event.club.logoUrl}
                                                alt={event.club.name}
                                                className="featured-event-logo"
                                            />
                                        )}
                                    </div>
                                </div>
                            );
                        })()}
                        {loading && <div className="loading-text">Loading featured event...</div>}
                        {error && <div className="error-text">{error}</div>}
                    </div>
                </div>

                {/* Explore Events */}
                <div className="event-explore">
                    <div className="event-explore-container">
                        <div className="event-explore-title">Explore</div>
                        {error && <div className="error-text" style={{ marginBottom: '1rem' }}>{error}</div>}
                        <div className="events-grid">
                            {events.length > 1 && events.slice(1).map((event, index) => (
                                <div
                                    key={index}
                                    className="event-card-wrapper"
                                    onClick={() => navigate(`/event/${encodeURIComponent(event.name)}`)}
                                >
                                    <div className="event-card">
                                        <img
                                            src={event.imageUrl}
                                            alt={event.name}
                                            className="event-card-banner"
                                        />
                                        <div className="event-card-content">
                                            <div className="event-card-name">{event.name}</div>
                                            <div className="event-card-description">{event.description}</div>
                                            <div className="spacer"></div>
                                            {/* Using backend fields for meta */}
                                            <div className="event-card-meta">
                                                Date: {event.date} | Time: {event.time} | Place: {event.place}, {event.unit}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Club logo section */}
                                    <div className="event-club-section" onClick={(e) => handleClubLogoClick(e, event.club)}>
                                        {event.club?.logoUrl ? (
                                            <img src={event.club.logoUrl} alt={event.club.name} className="event-club-icon" />
                                        ) : (
                                            <div className="event-club-icon-placeholder">Logo</div>
                                        )}
                                        <div className="event-club-name">{event.club?.name}</div>
                                    </div>
                                </div>
                            ))}
                            {events.length === 0 && !loading && (
                                <div className="error-text">No events available</div>
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
        </div>
    );
};

export default EventDirectory;