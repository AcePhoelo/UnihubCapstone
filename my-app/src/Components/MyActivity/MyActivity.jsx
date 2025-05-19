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
    const [profilePicture, setProfilePicture] = useState('');
    const [clubs, setClubs] = useState([]); // Regular memberships
    const [leadershipClubs, setLeadershipClubs] = useState([]); // Leadership roles
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

    // Fetch user data and their clubs/events
    useEffect(() => {
        // Get user profile from localStorage
        const profile = JSON.parse(localStorage.getItem('profile'));
        const token = localStorage.getItem('access_token');
        
        if (!profile || !token) {
            setError("You must be logged in to view your activity");
            setLoading(false);
            return;
        }
        
        setStudentName(profile.full_name || "Unknown Student");
        setStudentID(profile.studentid || "Unknown ID");
        setProfilePicture(profile.profile_picture || "");
        
        // Fetch the user's clubs and events
        const fetchUserActivity = async () => {
            try {
                // Fetch user's clubs (memberships)
                const clubsResponse = await fetch(`https://curtinunihubplus.com/profile/students/${profile.studentid}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                
                if (clubsResponse.status === 404) {
                    // The server may be redirecting to a login page that doesn't exist
                    console.error("Authentication error: Token might be invalid or expired");
                    localStorage.removeItem('access_token'); // Clear invalid token
                    setError("Your session has expired. Please log in again.");
                    setLoading(false);
                    
                    // Optional: redirect to login page after 2 seconds
                    setTimeout(() => navigate('/login'), 2000);
                    return;
                } else if (!clubsResponse.ok) {
                    throw new Error(`Error fetching clubs: ${clubsResponse.statusText}`);
                }
                
                const userData = await clubsResponse.json();
                
                // Check if the response contains the expected data structure
                if (!userData || !userData.clubsjoined) {
                    console.error("Invalid response format:", userData);
                    setError("Received invalid data format from server");
                    setLoading(false);
                    return;
                }
                
                // Format clubs data for display
                const userClubs = Array.isArray(userData.clubsjoined) 
                    ? userData.clubsjoined.map(club => ({
                        id: club.id || "",
                        name: club.name || club,  // Handle both object and string formats
                        description: club.description || "",
                        imageUrl: club.banner ? `https://curtinunihubplus.com${club.banner}` : null,
                        logoUrl: club.logo ? `https://curtinunihubplus.com${club.logo}` : null
                    }))
                    : [];
                    
                // Format leadership clubs data
                const leaderClubs = Array.isArray(userData.leadership_clubs) 
                    ? userData.leadership_clubs.map(club => {
                        // If it's an object with full club details
                        if (typeof club === 'object' && club !== null) {
                            return {
                                id: club.id || "",
                                name: club.name || "",
                                description: club.description || "Club Leader",
                                imageUrl: club.banner ? `https://curtinunihubplus.com${club.banner}` : null,
                                logoUrl: club.logo ? `https://curtinunihubplus.com${club.logo}` : null,
                                role: "Leader"
                            };
                        } 
                        // If it's just a club name string
                        else {
                            // Try to find matching club in userClubs for more details
                            const matchingClub = userClubs.find(c => c.name === club);
                            return matchingClub ? 
                                {...matchingClub, role: "Leader"} : 
                                { name: club, description: "Club Leader", role: "Leader" };
                        }
                    })
                    : [];
                
                setClubs(userClubs);
                setLeadershipClubs(leaderClubs);
                
                // Fetch user's event registrations - using try/catch for better error handling
                try {
                    const eventsResponse = await fetch(`https://curtinunihubplus.com/api/event/event_registration/?user_id=${profile.user_id || profile.id}&student_name=${encodeURIComponent(profile.full_name || '')}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    
                    if (!eventsResponse.ok) {
                        throw new Error(`Error fetching events: ${eventsResponse.statusText}`);
                    }
                    
                    const registrationsData = await eventsResponse.json();
                    
                    // Get full event details for each registration
                    const registeredEventIds = registrationsData.results?.map(reg => reg.event) || [];
                    
                    if (registeredEventIds.length === 0) {
                        setEvents([]);
                        return;
                    }
                    
                    const uniqueEventIds = [...new Set(registeredEventIds)];
                    
                    // Fetch details for all events
                    const allEventsResponse = await fetch(`https://curtinunihubplus.com/api/event/add_event/`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    
                    if (!allEventsResponse.ok) {
                        throw new Error(`Error fetching event details: ${allEventsResponse.statusText}`);
                    }
                    
                    const allEvents = await allEventsResponse.json();
                    
                    // Filter only the registered events
                    const userEvents = allEvents
                        .filter(event => uniqueEventIds.includes(event.id))
                        .map(event => ({
                            id: event.id,
                            name: event.name,
                            description: event.description,
                            imageUrl: event.banner,
                            date: event.date,
                            time: event.time,
                            place: event.location,
                            club: {
                                id: event.club_id || event.club,
                                name: event.club_details?.name || "Unknown Club",
                                logoUrl: event.club_details?.logo || null
                            }
                        }));
                    
                    setEvents(userEvents);
                } catch (eventError) {
                    console.error("Error fetching user's event registrations:", eventError);
                    // Don't fail the whole function, just set events to empty
                    setEvents([]);
                }
            } catch (err) {
                console.error("Error fetching user activity:", err);
                setError("Failed to load your activity data.");
            } finally {
                setLoading(false);
            }
        };
        
        fetchUserActivity();
    }, []);

    // Remove the mock data useEffect since we're now using real data

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

    if (loading) {
        return (
            <div className="my-activity-page">
                {/* Navbar code */}
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <div>Loading your activity...</div>
                </div>
            </div>
        );
    }

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
                        style={{ 
                            cursor: 'pointer',
                            backgroundImage: profilePicture ? `url(${profilePicture})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        {!profilePicture && getInitials(studentName)}
                    </div>
                    <img src={calendar} alt="Calendar" className="calendar-icon"
                        onClick={handleCalendarClick}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
            </div>
            <div className="activity-section">
                {/* Leadership Clubs */}
                {leadershipClubs.length > 0 && (
                    <div className="activity-club-explore">
                        <div className="activity-club-explore-title">Clubs I Lead</div>
                        <div className="activity-clubs-grid">
                            {leadershipClubs.map((club, index) => (
                                <div
                                    key={`leader-${index}`}
                                    className="activity-explore-club-box"
                                    onClick={() => navigate(`/club/${club.id}`)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="activity-club-card leadership-club">
                                        <div className="leadership-badge">Club Leader</div>
                                        <img
                                            src={club.imageUrl || '/default-club-banner.png'} 
                                            alt={club.name}
                                            className="activity-club-card-banner"
                                            onError={(e) => {e.target.onerror = null; e.target.src = '/default-club-banner.png'}}
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
                        </div>
                    </div>
                )}
                
                {/* Regular Clubs */}
                <div className="activity-club-explore">
                    <div className="activity-club-explore-title">My Clubs</div>
                    {error && <div className="error-text" style={{ marginBottom: '1rem' }}>{error}</div>}
                    <div className="activity-clubs-grid">
                        {clubs.length > 0 ? clubs.map((club, index) => (
                            <div
                                key={index}
                                className="activity-exlore-club-box"
                                onClick={() => navigateToClub(club.id, club.name)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="activity-club-card">
                                    <img
                                        src={club.imageUrl || '/default-club-banner.png'} 
                                        alt={club.name}
                                        className="activity-club-card-banner"
                                        onError={(e) => {e.target.onerror = null; e.target.src = '/default-club-banner.png'}}
                                    />
                                    <div className="activity-club-card-name">
                                        {club.name}
                                    </div>
                                    <div className="activity-club-card-description">
                                        {club.description}
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="no-content-message">
                                You haven't joined any clubs yet. 
                                <button className="browse-button" onClick={handleClubsClick}>
                                    Browse Clubs
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="activity-section">
                {/* Events */}
                <div className="activity-event-explore">
                    <div className="activity-event-explore-container">
                        <div className="activity-event-explore-title">My Events</div>
                        {error && <div className="error-text" style={{ marginBottom: '1rem' }}>{error}</div>}
                        <div className="activity-events-grid">
                            {events.length > 0 ? events.map((event, index) => (
                                <div
                                    key={index}
                                    className="activity-event-card-wrapper"
                                    onClick={() => navigateToEvent(event)}
                                >
                                    <div className="activity-event-card">
                                        <img
                                            src={event.imageUrl || '/default-event-banner.png'}
                                            alt={event.name}
                                            className="activity-event-card-banner"
                                            onError={(e) => {e.target.onerror = null; e.target.src = '/default-event-banner.png'}}
                                        />
                                        <div className="activity-event-card-content">
                                            <div className="activity-event-card-name">{event.name}</div>
                                            <div className="activity-event-card-description">{event.description}</div>
                                            <div className="activity-spacer"></div>
                                            <div className="activity-event-card-meta">
                                                Date: {event.date} | Time: {event.time} | Place: {event.place}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Club logo */}
                                    <div className="activity-event-club-section" onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/club/${event.club?.id || ''}`);
                                    }}>
                                        {event.club?.logoUrl ? (
                                            <img src={event.club.logoUrl} alt={event.club.name} className="activity-event-club-icon" />
                                        ) : (
                                            <div className="activity-event-club-icon-placeholder">Logo</div>
                                        )}
                                        <div className="activity-event-club-name">{event.club?.name}</div>
                                    </div>
                                </div>
                            )) : (
                                <div className="no-content-message">
                                    You haven't registered for any events yet.
                                    <button className="browse-button" onClick={handleEventsClick}>
                                        Browse Events
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="footer">
                {/* Footer content */}
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