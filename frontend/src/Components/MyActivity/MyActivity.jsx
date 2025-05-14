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
import { motion } from 'framer-motion';
import { decodeHTMLEntities } from '../../utils';

const MyActivity = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [studentName, setStudentName] = useState('');
    const [studentID, setStudentID] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [clubs, setClubs] = useState([]);
    const [leadershipClubs, setLeadershipClubs] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigateToClub = (clubId, clubName) => {
        if (!clubId || clubId === 'undefined') {
            console.error(`Invalid club ID for ${clubName || 'unknown club'}`);
            navigate('/error', { 
                state: { 
                    errorCode: '500',
                    errorMessage: 'Club Not Found',
                    errorDetails: `Cannot load "${clubName || 'this club'}" because the club ID is missing or invalid.`
                }
            });
        } else {
            navigate(`/club/${clubId}`);
        }
    };
    const navigateToEvent = (event) => {
        if (!event || !event.name) {
            navigate('/error', { 
                state: { 
                    errorCode: '404',
                    errorMessage: 'Event Not Found',
                    errorDetails: 'The requested event information is not available.'
                }
            });
        } else {
            navigate(`/event/${encodeURIComponent(event.name)}`);
        }
    };

    useEffect(() => {
        const fetchProfileIfNeeded = async () => {
            let profile = JSON.parse(localStorage.getItem('profile'));
            const token = localStorage.getItem('access_token');
    
            if (!profile || !profile.studentid) {
                try {
                    const response = await fetch('http://54.169.81.75:8000/profile/profile/', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
    
                    if (response.ok) {
                        profile = await response.json();
                        localStorage.setItem('profile', JSON.stringify(profile));
                    } else {
                        setError("Failed to fetch profile data.");
                        setLoading(false);
                        return;
                    }
                } catch (err) {
                    console.error("Error fetching profile data:", err);
                    setError("An error occurred while fetching profile data.");
                    setLoading(false);
                    return;
                }
            }
    
            setStudentName(decodeHTMLEntities(profile.full_name || "Unknown Student"));
            setStudentID(profile.studentid || "Unknown ID");

            const profilePicUrl = profile.profile_picture || '';
            setProfilePicture(profilePicUrl.startsWith('http') ? profilePicUrl : 
            profilePicUrl ? `http://54.169.81.75:8000${profilePicUrl}` : '');
        };
    
        fetchProfileIfNeeded();
    }, []);

    useEffect(() => {
        const fetchProfileAndActivity = async () => {
            let profile = JSON.parse(localStorage.getItem('profile'));
            const token = localStorage.getItem('access_token');
    
            if (!token) {
                setError("You must be logged in to view your activity");
                setLoading(false);
                return;
            }
    
            // Fetch profile if it's missing or incomplete
            if (!profile || !profile.studentid) {
                try {
                    const response = await fetch('http://54.169.81.75:8000/profile/profile/', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
    
                    if (response.ok) {
                        profile = await response.json();
                        localStorage.setItem('profile', JSON.stringify(profile));
                    } else {
                        setError("Failed to fetch profile data.");
                        setLoading(false);
                        return;
                    }
                } catch (err) {
                    console.error("Error fetching profile data:", err);
                    setError("An error occurred while fetching profile data.");
                    setLoading(false);
                    return;
                }
            }
    
            setStudentName(profile.full_name || "Unknown Student");
            setStudentID(profile.studentid || "Unknown ID");
            const profilePicUrl = profile.profile_picture || '';
            setProfilePicture(profilePicUrl.startsWith('http') ? profilePicUrl : 
            profilePicUrl ? `http://54.169.81.75:8000${profilePicUrl}` : '');
    
            // Fetch user activity
            const fetchUserActivity = async () => {
                try {
                    const clubsResponse = await fetch(`http://54.169.81.75:8000/profile/students/${profile.studentid}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
    
                    if (clubsResponse.status === 401 || clubsResponse.status === 403) {
                        // Handle token refresh
                        const refreshToken = localStorage.getItem('refresh_token');
                        if (refreshToken) {
                            const refreshResponse = await fetch('http://54.169.81.75:8000/api/token/refresh/', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ refresh: refreshToken }),
                            });
    
                            if (refreshResponse.ok) {
                                const tokenData = await refreshResponse.json();
                                localStorage.setItem('access_token', tokenData.access);
    
                                // Retry the original request with the new token
                                const newResponse = await fetch(`http://54.169.81.75:8000/profile/students/${profile.studentid}`, {
                                    headers: {
                                        'Authorization': `Bearer ${tokenData.access}`,
                                        'Content-Type': 'application/json',
                                    },
                                });
    
                                if (newResponse.ok) {
                                    const userData = await newResponse.json();
                                    processUserActivity(userData);
                                    return;
                                }
                            }
                        }
    
                        setError("Your session has expired. Please log in again.");
                        setLoading(false);
                        setTimeout(() => navigate('/login'), 2000);
                        return;
                    }
    
                    if (!clubsResponse.ok) {
                        throw new Error(`Error fetching clubs: ${clubsResponse.statusText}`);
                    }
    
                    const userData = await clubsResponse.json();
                    processUserActivity(userData);
                } catch (err) {
                    console.error("Error fetching user activity:", err);
                    setError("Failed to load your activity data.");
                } finally {
                    setLoading(false);
                }
            };
    

            const processUserActivity = (userData) => {
                if (!userData || !userData.clubsjoined) {
                    console.error("Invalid response format:", userData);
                    setError("Received invalid data format from server");
                    setLoading(false);
                    return;
                }

                // Process "Clubs I Lead" section first
                const leaderClubs = Array.isArray(userData.leadership_clubs)
                    ? userData.leadership_clubs.map(club => ({
                        id: club.id || "",
                        name: decodeHTMLEntities(club.name || "Unknown Club"),
                        description: decodeHTMLEntities(club.description || "Club Leader"),
                        // Fix banner URLs with complete paths
                        logo: club.logo ? (club.logo.startsWith('http') ? club.logo : `http://54.169.81.75:8000${club.logo}`) : null,
                        banner: club.banner ? (club.banner.startsWith('http') ? club.banner : `http://54.169.81.75:8000${club.banner}`) : null,
                        imageUrl: club.banner ? (club.banner.startsWith('http') ? club.banner : `http://54.169.81.75:8000${club.banner}`) : null,
                        logoUrl: club.logo ? (club.logo.startsWith('http') ? club.logo : `http://54.169.81.75:8000${club.logo}`) : null
                    }))
                    : [];
                
                // Get list of leadership club IDs
                const leadershipClubIds = leaderClubs.map(club => club.id);
                
                // Process "My Clubs" section, filtering out any clubs that appear in "Clubs I Lead"
                const userClubs = Array.isArray(userData.clubsjoined)
                    ? userData.clubsjoined
                        .filter(club => !leadershipClubIds.includes(club.id))
                        .map(club => ({
                            id: club.id || "",
                            name: decodeHTMLEntities(club.name || "Unknown Club"), 
                            description: decodeHTMLEntities(club.description || ""),
                            imageUrl: club.banner ? (club.banner.startsWith('http') ? club.banner : `http://54.169.81.75:8000${club.banner}`) : null,
                            logoUrl: club.logo ? (club.logo.startsWith('http') ? club.logo : `http://54.169.81.75:8000${club.logo}`) : null,
                        }))
                    : [];

                setLeadershipClubs(leaderClubs);
                setClubs(userClubs);
            };
    
            fetchUserActivity();
        };
    
        fetchProfileAndActivity();
    }, []);

    useEffect(() => {
        const fetchUserEvents = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const profile = JSON.parse(localStorage.getItem('profile') || '{}');
                if (!profile.studentid) {
                    console.log("No student ID found in profile");
                    return;
                }
                
                // Step 1: Use the existing EventRegistrationListView endpoint with user_id parameter
                const registrationsResponse = await fetch(
                    `http://54.169.81.75:8000/api/event/event_registration/?user_id=${profile.studentid}`, 
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                
                if (!registrationsResponse.ok) {
                    console.error('Failed to fetch event registrations:', registrationsResponse.status);
                    return;
                }
                
                const registrationsData = await registrationsResponse.json();
                console.log("Fetched registrations:", registrationsData);
                
                // Extract event IDs and fetch full event details
                if (registrationsData.results && registrationsData.results.length > 0) {
                    // Create array of event objects from the registration data
                    const formattedEvents = registrationsData.results.map(registration => {
                        const event = registration.event;

                        let imageUrl = event.banner || null;
                    if (imageUrl && !imageUrl.startsWith('http')) {
                        imageUrl = `http://54.169.81.75:8000${imageUrl}`;
                    }
                        return {
                            id: event.id,
                            name: decodeHTMLEntities(event.name),
                            description: decodeHTMLEntities(event.description || 'No description'),
                            imageUrl: imageUrl || null,
                            date: event.date || 'TBA',
                            time: event.time || 'TBA',
                            place: decodeHTMLEntities(event.location || 'TBA'),
                            club: event.club_details || null,
                            // Add color information for hover effects if available
                            hoverColor: event.shadow_color ? 
                                `rgba(${event.shadow_color.join(',')}, 0.6)` : 
                                'rgba(100, 100, 100, 0.3)',
                            hoverBackground: event.dominant_color ? 
                                `rgba(${event.dominant_color.join(',')}, 0.1)` : 
                                'rgba(240, 240, 240, 0.8)',
                        };
                    });
                    
                    setEvents(formattedEvents);
                } else {
                    console.log("No registered events found");
                    setEvents([]);
                }
            } catch (err) {
                console.error("Error fetching user events:", err);
            }
        };
        
        fetchUserEvents();
    }, []);

    const handleLogoClick = () => navigate('/club-directory');
    const handleClubsClick = () => navigate('/club-directory');
    const handleEventsClick = () => navigate('/event-directory');
    const handleActivityClick = () => navigate('/my-activity');
    const handleProfileClick = () => navigate('/profile');
    const handleCalendarClick = () => navigate('/calendar');

    // Modify the getInitials function
    const getInitials = (fullName) => {
        const decodedName = decodeHTMLEntities(fullName || '');
        const names = decodedName.trim().split(' ');
        const initials = names[0]?.charAt(0).toUpperCase() + (names[1]?.charAt(0).toUpperCase() || '');
        return initials;
    };

    if (loading) {
        return (
            <div className="my-activity-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <div>Loading your activity...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="my-activity-page">
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
                        style={{
                            cursor: 'pointer',
                            backgroundImage: profilePicture ? `url(${profilePicture})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        {!profilePicture && getInitials(studentName)}
                    </div>
                    <img
                        src={calendar}
                        alt="Calendar"
                        className="calendar-icon"
                        onClick={handleCalendarClick}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
            </div>

            <div className="activity-content-wrapper">
                <div className="activity-left-column">
                    {leadershipClubs.length > 0 && (
                        <div className="activity-club-explore">
                            <div className="activity-club-explore-title">Clubs I Lead</div>
                            <div className="activity-clubs-grid">
                                {leadershipClubs.map((club, index) => (
                                    <motion.div
                                        key={index}
                                        className="activity-explore-club-box"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.2 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <motion.div
                                            className="activity-club-card leadership-club"
                                            onClick={() => navigate(`/club/${club.id}`)}
                                            whileHover={{
                                                scale: 1.05,
                                            }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <div className="leadership-badge">Club Leader</div>
                                            <img
                                                src={club.imageUrl || club.banner || '/default-club-banner.png'}
                                                alt={club.name}
                                                className="activity-club-card-banner"
                                                onError={(e) => { 
                                                    console.log("Image error:", e.target.src);
                                                    e.target.onerror = null; 
                                                    e.target.src = '/default-club-banner.png'; 
                                                }}
                                            />
                                            <div className="activity-club-card-name">{decodeHTMLEntities(club.name)}</div>
                                            <div className="activity-club-card-description">{decodeHTMLEntities(club.description)}</div>
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="activity-club-explore">
                        <div className="activity-club-explore-title">My Clubs</div>
                        {error && <div className="error-text">{error}</div>}
                        <div className="activity-clubs-grid">
                            {clubs.map((club, idx) => (
                                <motion.div
                                    key={club.id}
                                    className="activity-explore-club-box"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <motion.div
                                        className="activity-club-card"
                                        onClick={() => navigateToClub(club.id, club.name)}
                                        style={{
                                            '--hover-bg': club.hoverBackground,
                                            '--hover-shadow': club.hoverColor
                                        }}
                                        whileHover={{
                                            scale: 1.05,
                                            background: club.hoverBackground,
                                            boxShadow: `0 0 25px ${club.hoverColor}`
                                        }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        {club.role === 'Leader' && <div className="leadership-badge">Club Leader</div>}
                                        <img
                                            src={club.imageUrl || '/default-club-banner.png'}
                                            alt={club.name}
                                            className="activity-club-card-banner"
                                            onError={e => { e.target.onerror = null; e.target.src = '/default-club-banner.png' }}
                                        />
                                        <div className="activity-club-card-name">{club.name}</div>
                                        <div className="activity-club-card-description">{club.description}</div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="activity-event-explore">
                        <div className="activity-event-explore-title">My Events</div>
                        {error && <div className="error-text">{error}</div>}
                        <div className="activity-events-grid">
                            {events.map((evt, idx) => (
                                <motion.div
                                    key={evt.id}
                                    className="activity-event-card-wrapper"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <motion.div
                                        className="activity-event-card"
                                        onClick={() => navigateToEvent(evt)}
                                        style={{
                                            '--hover-bg': evt.hoverBackground,
                                            '--hover-shadow': evt.hoverColor
                                        }}
                                        whileHover={{
                                            scale: 1.05,
                                            background: evt.hoverBackground,
                                            boxShadow: `0 0 25px ${evt.hoverColor}`
                                        }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <img
                                            src={evt.imageUrl || '/default-event-banner.png'}
                                            alt={evt.name}
                                            className="activity-event-card-banner"
                                            onError={e => { e.target.onerror = null; e.target.src = '/default-event-banner.png' }}
                                        />
                                        <div className="activity-event-card-content">
                                            <div className="activity-event-card-name">{decodeHTMLEntities(evt.name)}</div>
                                            <div className="activity-event-card-description">{decodeHTMLEntities(evt.description)}</div>
                                            <div className="activity-spacer" />
                                            <div className="activity-event-card-meta">
                                                Date: {evt.date} | Time: {evt.time} | Place: {decodeHTMLEntities(evt.place)}
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <aside className="activity-stats">
                    <div className="profile-card">
                        <div className="profile-picture-container">
                            {profilePicture ? (
                                <img
                                    src={profilePicture}
                                    alt="Profile"
                                    className="profile-picture"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.style.display = 'none';
                                        const parent = e.target.parentElement;
                                        const initials = document.createElement('div');
                                        initials.className = "profile-picture";
                                        initials.style.display = "flex";
                                        initials.style.alignItems = "center";
                                        initials.style.justifyContent = "center";
                                        initials.style.backgroundColor = "#2074AC";
                                        initials.style.color = "white";
                                        initials.style.fontSize = "36px";
                                        initials.innerText = getInitials(studentName);
                                        parent.appendChild(initials);
                                    }}
                                />
                            ) : (
                                <div
                                    className="profile-picture"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "#2074AC",
                                        color: "white",
                                        fontSize: "36px"
                                    }}
                                >
                                    {getInitials(studentName)}
                                </div>
                            )}
                        </div>
                        <div className="profile-name">{decodeHTMLEntities(studentName) || "User's full name"}</div>
                        <div className="profile-student-id">Student ID: {studentID || "User's student ID"}</div>
                        
                        <div className="profile-divider"></div>
                    </div>
                    
                    <div className="stats-box">
                        <div className="stats-number">{leadershipClubs.length + clubs.length}</div>
                        <div className="stats-label">Clubs joined</div>
                    </div>
                    
                    <div className="stats-box">
                        <div className="stats-number">{events.length}</div>
                        <div className="stats-label">Events visited</div>
                    </div>
                </aside>
            </div>

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
                            <img src={twitter} alt="Twitter" />
                        </a>
                        <a href="https://www.facebook.com/curtinuniversity" target="_blank" rel="noopener noreferrer">
                            <img src={facebook} alt="Facebook" />
                        </a>
                        <a href="https://www.instagram.com/curtinuniversity/" target="_blank" rel="noopener noreferrer">
                            <img src={instagram} alt="Instagram" />
                        </a>
                        <a href="https://www.youtube.com/user/CurtinUniversity" target="_blank" rel="noopener noreferrer">
                            <img src={youtube} alt="YouTube" />
                        </a>
                        <a href="https://www.linkedin.com/school/8788/" target="_blank" rel="noopener noreferrer">
                            <img src={linkedin} alt="LinkedIn" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyActivity;