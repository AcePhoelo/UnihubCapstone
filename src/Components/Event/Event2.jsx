import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import './Event.css';
import logo from '../../assets/logo.png';
import calendar from '../../assets/calendar.png';
import collaborationIcon from '../../assets/collaboration.png';
import membersIcon from '../../assets/members.png';
import editIcon from '../../assets/edit.png';
import deleteIcon from '../../assets/delete_white.png';
import blackDeleteIcon from '../../assets/delete.png';
import Exit from '../../assets/Exit.png';
import mockEventParticipants from '../../data/mockEventParticipants';

const Event = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { eventName } = useParams();
    const decodedName = decodeURIComponent(eventName);

    // State variables
    const [studentName, setStudentName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [isEditingDetails, setIsEditingDetails] = useState(false);
    const [detailsDate, setDetailsDate] = useState('');
    const [detailsTime, setDetailsTime] = useState('');
    const [detailsPlace, setDetailsPlace] = useState('');
    const [detailsUnit, setDetailsUnit] = useState('');
    const [isEditingEvent, setIsEditingEvent] = useState(false);
    const [editedEventName, setEditedEventName] = useState('');
    const [descriptionText, setDescriptionText] = useState('');
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [deleteConfirmText, setDeleteConfirmText] = useState('');
    const [bannerGradient, setBannerGradient] = useState('linear-gradient(to top, #000000, transparent)');
    const [darkColor, setDarkColor] = useState('#000000');
    const [showParticipantsPanel, setShowParticipantsPanel] = useState(false);
    const [hidingPanel, setHidingPanel] = useState(false);
    const [overlayHiding, setOverlayHiding] = useState(false);
    const [hidingExit, setHidingExit] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [event, setEvent] = useState(null);
    const [profilePicture, setProfilePicture] = useState('');

    const bannerInputRef = useRef(null);
    const maxDescriptionLength = 1500;

    const isGuest = localStorage.getItem('isGuest') === 'true';

        // Add this useEffect to fetch profile data
    useEffect(() => {
        const profile = JSON.parse(localStorage.getItem('profile'));
        if (profile) {
            setStudentName(profile.full_name || 'Unknown Student');
            setProfilePicture(profile.profile_picture || '');
        }
    }, []);

    // Fetch event details
    useEffect(() => {
        const fetchEventDetails = async () => {
                try {
                    const token = localStorage.getItem('access_token');
        
                    // Fetch all events to find the ID for the given event name
                    const eventListResponse = await fetch('http://54.169.81.75:8000/api/event/add_event/', {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
        
                    if (!eventListResponse.ok) {
                        setError('Failed to fetch event list.');
                        return;
                    }
        
                    const eventList = await eventListResponse.json();
                    const eventMatch = eventList.find(event => event.name.toLowerCase() === decodedName.toLowerCase());
        
                    if (!eventMatch) {
                        setError('Event not found.');
                        return;
                    }
        
                    // Use the event ID to fetch event details
                    const response = await fetch(`http://54.169.81.75:8000/api/event/event_page/event-page/${eventMatch.id}/`, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
        
                    if (response.ok) {
                        const data = await response.json();
                        setEvent(data);
                        setDescriptionText(data.description);
        
                        // Set banner gradient and shadow color from backend
                        if (data.dominant_color && data.shadow_color) {
                            const shadowColor = `rgb(${data.shadow_color.join(',')})`;
                            setBannerGradient(`linear-gradient(to top, ${shadowColor}, transparent)`);
                            setDarkColor(shadowColor);
                        }
                    } else {
                        setError('Failed to fetch event details.');
                    }
                } catch (err) {
                    console.error('Error fetching event details:', err);
                    setError('An error occurred while fetching event details.');
                } finally {
                    setLoading(false);
                }
            };
        
            fetchEventDetails();
        }, [decodedName]);
    if (error) return <div className="error-text">{error}</div>;
    if (!event) return <div className="event-not-found">No event found.</div>;

    const participants = mockEventParticipants[event.title] || [];

    const toggleParticipantsPanel = () => setShowParticipantsPanel(prev => !prev);
    const handleClosePanel = () => {
        setOverlayHiding(true);
        setHidingExit(true);
        setHidingPanel(true);
        setTimeout(() => {
            setShowParticipantsPanel(false);
            setOverlayHiding(false);
            setHidingExit(false);
            setHidingPanel(false);
        }, 300);
    };

    const getInitials = fullName => {
        const [first, second] = fullName.trim().split(' ');
        return `${first?.[0]?.toUpperCase() || ''}${second?.[0]?.toUpperCase() || ''}`;
    };

    return (
        <div className="event-page">
            {/* Navbar */}
            <div className="navbar">
                <img src={logo} alt="Logo" className="curtin-logo" onClick={() => navigate('/club-directory')} />
                <div className="navbar-text">
                    <div
                        className="clubs-navbar"
                        onClick={() => navigate('/club-directory')}
                        style={{ color: location.pathname === '/club-directory' ? '#000000' : '#999999' }}
                    >
                        Clubs
                    </div>
                    <div
                        className="events-navbar"
                        onClick={() => navigate('/event-directory')}
                        style={{ color: location.pathname === '/event-directory' ? '#000000' : '#999999' }}
                    >
                        Events
                    </div>
                    {!isGuest && (
                        <div
                            className="activity-navbar"
                            onClick={() => navigate('/my-activity')}
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
                            onClick={() => navigate('/profile')}
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
                            {!profilePicture && getInitials(studentName || 'Unknown')}
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
                        onClick={() => navigate('/calendar')}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
            </div>
    
            {/* Event Banner */}
            <div className="event-banner-wrapper" style={{ background: bannerGradient }}>
                <div className="event-banner">
                    <img
                        src={event.banner_image}
                        alt="Event Banner"
                        className="event-banner-img"
                        style={{ cursor: isEditingEvent ? 'pointer' : 'default' }}
                    />
                    <div className="banner-overlay" style={{ background: bannerGradient }}></div>
                    <div className="event-banner-content">
                        {/* Collaboration Icon */}
                        <div className="event-collaboration-info">
                            <img src={collaborationIcon} alt="Collaboration" className="collaboration-icon" />
                            <div className="event-collaboration-title">Collaboration</div>
                        </div>
    
                        {/* Participants Icon */}
                        <div className="event-participants-info" onClick={toggleParticipantsPanel}>
                            <img src={membersIcon} alt="Participants" className="participants-icon" />
                            <div className="event-participants-title">Participants</div>
                        </div>
    
                        {/* Center Content */}
                        <div className="event-banner-center">
                            <img
                                src={event.club_logo}
                                alt="Club Logo"
                                className="event-club-logo"
                                onClick={() => navigate(`/club/${encodeURIComponent(event.club_name)}`)}
                                style={{ boxShadow: `0px 4px 10px ${darkColor}`, cursor: 'pointer' }}
                            />
                            <h1 className="event-page-name" style={{ textShadow: `2px 2px 4px ${darkColor}` }}>
                                {event.title}
                            </h1>
                            <button className="register-button" onClick={() => navigate(`/register-event/${encodeURIComponent(event.title)}`)}>
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    
            {/* Description and Details Sections */}
            <div className="event-details">
                <div className="event-description-container">
                    <div className="event-description-header">
                        <div className="event-description-title">Description</div>
                    </div>
                    <div className="event-description">
                        {descriptionText
                            ? descriptionText.split('\n').map((line, index) => <p key={index}>{line}</p>)
                            : <p>No description available.</p>}
                    </div>
                </div>
    
                <div className="details-event-container">
                    <div className="details-event-header">
                        <div className="meta-event-title">Details</div>
                    </div>
                    <div className="event-page-date">
                        <strong>Date:</strong> {event.date}
                    </div>
                    {event.time && (
                        <div className="event-page-time">
                            <strong>Time:</strong> {event.time}
                        </div>
                    )}
                    {event.location && (
                        <div className="event-page-location">
                            <strong>Location:</strong> {event.location}
                        </div>
                    )}
                </div>
            </div>
    
            {/* Feedback Button */}
            <div className="feedback-button-wrapper">
                <button className="feedback-button" onClick={() => window.open(`/feedback/${encodeURIComponent(event.title)}`, '_blank')}>
                    Feedback
                </button>
            </div>
    
            {/* Participants Panel */}
            {showParticipantsPanel && (
                <>
                    <div className={`overlay ${overlayHiding ? 'hide' : ''}`} onClick={toggleParticipantsPanel}></div>
                    <img src={Exit} alt="Exit" className={`exit-icon ${hidingExit ? 'hide-exit' : ''}`} onClick={handleClosePanel} />
                    <div className={`participants-panel ${hidingPanel ? 'slide-out' : 'slide-in'}`}>
                        <div className="participants-panel-content">
                            <div className="participants-panel-header">
                                <div className="participants-header-left">
                                    <h2 className="participants-title">Participants</h2>
                                </div>
                                <div className="participants-header-center">
                                    <span className="total-participants">Total: {participants.length}</span>
                                    <div className="search-bar-wrapper">
                                        <input
                                            type="text"
                                            className="participants-search-input"
                                            placeholder="Search by name or ID"
                                            value={searchTerm}
                                            onChange={e => setSearchTerm(e.target.value)}
                                        />
                                        <button className="participants-search-button" onClick={() => setSearchQuery(searchTerm.trim())}>
                                            SEARCH
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="participants-panel-header-border"></div>
                            <div className="participants-body">
                                {participants.filter(p => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase())).map((p, idx) => (
                                    <div className="person-card" key={idx}>
                                        <div className="person-icon">{getInitials(p.name)}</div>
                                        <div className="person-info">
                                            <div className="person-name">{p.name}, {p.role}</div>
                                            <div className="person-id">{p.id}</div>
                                        </div>
                                        <img src={blackDeleteIcon} alt="Remove" className="remove-participant-icon" onClick={() => console.log(`Remove ${p.name}`)} />
                                    </div>
                                ))}
                                {participants.length === 0 && <p style={{ marginTop: '16px', color: '#666' }}>No participants found.</p>}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Event;