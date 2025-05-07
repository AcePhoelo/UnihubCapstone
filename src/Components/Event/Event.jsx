import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import './Event.css';
import logo from '../../assets/logo.png';
import calendar from '../../assets/calendar.png';
import collaborationIcon from '../../assets/collaboration.png';
import membersIcon from '../../assets/members.png';
import deleteIcon2 from '../../assets/delete.png';
import deleteIcon from '../../assets/delete_white.png';
import Exit from '../../assets/Exit.png';
import Sidebar from '../CollabSidebar/Sidebar';

const Event = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { eventName } = useParams();
    const decodedName = decodeURIComponent(eventName);

    const [isEditMode, setIsEditMode] = useState(false);
    const [editedEventName, setEditedEventName] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [editedDate, setEditedDate] = useState('');
    const [editedTime, setEditedTime] = useState('');
    const [editedLocation, setEditedLocation] = useState('');
    const [newBanner, setNewBanner] = useState(null);
    const [isEventCreator, setIsEventCreator] = useState(false);
    const [isUserRegistered, setIsUserRegistered] = useState(false);

    // State variables
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isClubLeaderForEvent, setIsClubLeaderForEvent] = useState(false);
    const [showParticipantsPanel, setShowParticipantsPanel] = useState(false);
    const [participants, setParticipants] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [overlayHiding, setOverlayHiding] = useState(false);
    const [hidingExit, setHidingExit] = useState(false);
    const [hidingPanel, setHidingPanel] = useState(false);
    const [profilePicture, setProfilePicture] = useState('');
    const [studentName, setStudentName] = useState('');
    const [collabSidebarOpen, setCollabSidebarOpen] = useState(false);
    const bannerInputRef = useRef(null);
    const studentID = localStorage.getItem('studentID');
    const isGuest = localStorage.getItem('isGuest') === 'true';

    // Add this function to fetch participants
    const fetchEventParticipants = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`http://54.169.81.75:8000/api/event/event_registration/${event.id}/participants/`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setParticipants(data.results || []);
            } else {
                console.error('Failed to fetch participants');
            }
        } catch (err) {
            console.error('Error fetching participants:', err);
        }
    };

    // Add this function to toggle the participants panel
    const toggleParticipantsPanel = () => {
        if (showParticipantsPanel) {
            handleClosePanel();
        } else {
            fetchEventParticipants();
            setShowParticipantsPanel(true);
        }
    };

    // Add this function to close the panel with animation
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

    // Add this function to get user initials
    const getInitials = (fullName) => {
        if (!fullName) return '?';
        const names = fullName.trim().split(' ');
        return names[0]?.charAt(0).toUpperCase() + (names[1]?.charAt(0).toUpperCase() || '');
    };

    // Add this useEffect
    useEffect(() => {
        // Check local storage for recent registration
        const justRegisteredEventId = localStorage.getItem('just_registered_event');
        if (event && justRegisteredEventId === event.id?.toString()) {
            setIsUserRegistered(true);
            localStorage.removeItem('just_registered_event');
            fetchEventParticipants();
        }
    }, [event]);
    

    // Fetch user profile for navbar
    useEffect(() => {
            if (!isGuest) {
                const profile = JSON.parse(localStorage.getItem('profile'));
                if (profile) {
                    setStudentName(profile.full_name || 'Unknown Student');
                    setProfilePicture(profile.profile_picture || '');
                }
            }
    }, [isGuest]);
    
    // Fetch event data from the backend
    // Add this to your useEffect that fetches event data
    useEffect(() => {
        const fetchEventData = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('access_token');
                const studentID = localStorage.getItem('student_id');
                
                // Fetch event details
                const response = await fetch(`http://54.169.81.75:8000/api/event/add_event/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': token ? `Bearer ${token}` : '',
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    setError('Failed to fetch event details');
                    setLoading(false);
                    return;
                }

                const data = await response.json();
                const event = data.find((e) => e.name === decodedName);
                
                if (event) {
                    setEvent(event);
                    setEditedEventName(event.name);
                    setEditedDescription(event.description || '');
                    setEditedDate(event.date || '');
                    setEditedTime(event.time || '');
                    setEditedLocation(event.location || '');
                    setIsEventCreator(event.created_by?.id === parseInt(localStorage.getItem('user_id')));
                    
                    // Check if the current user is the club president
                    const isClubLeader = event.club_details?.president?.user_id === parseInt(localStorage.getItem('user_id'));
                    setIsClubLeaderForEvent(isClubLeader);
                    
                    // Fetch participants to check if user is registered
                    if (!isGuest && studentID) {
                        try {
                            const participantsResponse = await fetch(
                                `http://54.169.81.75:8000/api/event/event_registration/${event.id}/participants/`,
                                {
                                    headers: {
                                        'Authorization': `Bearer ${token}`,
                                        'Content-Type': 'application/json',
                                    },
                                }
                            );
                            
                            if (participantsResponse.ok) {
                                const participantsData = await participantsResponse.json();
                                const userRegistration = participantsData.results?.find(
                                    p => p.student && p.student.studentid === studentID
                                );
                                
                                // Set registration status based on whether user is found in participants list
                                setIsUserRegistered(!!userRegistration);
                            }
                        } catch (err) {
                            console.error('Error checking registration status:', err);
                        }
                    }
                } else {
                    setError('Event not found');
                }
                
                setLoading(false);
            } catch (err) {
                console.error('Error fetching event data:', err);
                setError('An error occurred while fetching event data');
                setLoading(false);
            }
        };

        fetchEventData();
    }, [decodedName]);

    // Add this effect to check and update user registration status on load
useEffect(() => {
    if (event && !isGuest) {
        // First check if we have a cached registration status
        const registrationKey = `event_registered_${event.id}`;
        const cachedRegistration = localStorage.getItem(registrationKey);
        
        if (cachedRegistration === 'true' || cachedRegistration === 'false') {
            setIsUserRegistered(cachedRegistration === 'true');
        }
        
        // Then verify with the server
        const checkRegistrationStatus = async () => {
                    try {
                        const token = localStorage.getItem('access_token');
                        const studentID = localStorage.getItem('studentID') || localStorage.getItem('student_id');
                        console.log("Checking registration with student ID:", studentID);
                        
                        const response = await fetch(
                            `http://54.169.81.75:8000/api/event/event_registration/${event.id}/participants/`,
                            {
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'application/json',
                                },
                            }
                        );
                        
                        if (response.ok) {
                            const data = await response.json();
                            console.log("Participants data:", data.results);
                            
                            const userRegistration = data.results?.find(
                                p => p.student && 
                                (p.student.studentid === studentID || String(p.student.studentid) === studentID)
                            );
                            
                            console.log("User registration found:", !!userRegistration);
                            setIsUserRegistered(!!userRegistration);
                            
                            // Cache the result
                            localStorage.setItem(registrationKey, !!userRegistration ? 'true' : 'false');
                        }
                    } catch (err) {
                        console.error('Error checking registration:', err);
                    }
                };
                
                checkRegistrationStatus();
            }
        }, [event, isGuest]);

    useEffect(() => {
        if (event && event.created_by_details) {
            console.log("Event creator details:", event.created_by_details);
            setIsEventCreator(event.created_by_details.studentid === studentID);
        }
    }, [event, studentID]);

    const handleDeleteEvent = async () => {
        if (!window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
            return;
        }
        
        try {
            const token = localStorage.getItem('access_token');
            
            const response = await fetch(`http://54.169.81.75:8000/api/event/delete_event/${event.id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (response.ok) {
                alert('Event deleted successfully');
                navigate('/event-directory');
            } else {
                alert('Failed to delete event');
            }
        } catch (err) {
            console.error('Error deleting event:', err);
            alert('Error deleting event');
        }
    };

    const handleCancelRegistration = async () => {
        if (isGuest) {
            navigate('/login');
            return;
        }
        
        if (!window.confirm('Are you sure you want to cancel your registration for this event?')) {
            return;
        }
        
        try {
            const token = localStorage.getItem('access_token');
            
            // Find the user's registration in participants list
            const userRegistration = participants.find(p => 
                p.student && p.student.studentid === studentID
            );
            
            if (!userRegistration) {
                console.error('User registration not found');
                return;
            }
            
            const response = await fetch(`http://54.169.81.75:8000/api/event/event_registration/delete/${userRegistration.id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            
            if (response.ok) {
                setIsUserRegistered(false);
                localStorage.setItem(`event_registered_${event.id}`, 'false');
                
                // Update participants list to remove the user
                setParticipants(participants.filter(p => 
                    !p.student || p.student.studentid !== studentID
                ));
                
                // Refresh participants panel if open
                if (showParticipantsPanel) {
                    fetchEventParticipants();
                }
            } else {
                alert('Failed to cancel registration');
            }
        } catch (err) {
            console.error('Error cancelling registration:', err);
            alert('Error cancelling registration');
        }
    };

    const handleCancelEdit = () => {
        setIsEditMode(false);
        setEditedEventName(event.name || '');
        setEditedDescription(event.description || '');
        setEditedDate(event.date || '');
        setEditedTime(event.time || '');
        setEditedLocation(event.location || '');
        setNewBanner(null);
    };

    const handleBannerChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setNewBanner(e.target.files[0]);
        }
    };
    
    const handleSaveChanges = async () => {
        try {
            const token = localStorage.getItem('access_token');
            
            const formData = new FormData();
            formData.append('name', editedEventName);
            formData.append('description', editedDescription);
            formData.append('date', editedDate);
            formData.append('time', editedTime);
            formData.append('location', editedLocation);
            
            if (newBanner) {
                formData.append('banner', newBanner);
            }
            
            const response = await fetch(`http://54.169.81.75:8000/api/event/add_event/${event.id}/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            
            if (response.ok) {
                const updatedEvent = await response.json();
                setEvent(updatedEvent);
                setIsEditMode(false);
                
                // If name changed, navigate to the new URL
                if (updatedEvent.name !== decodedName) {
                    navigate(`/event/${encodeURIComponent(updatedEvent.name)}`);
                }
            } else {
                console.error('Failed to update event');
            }
        } catch (err) {
            console.error('Error updating event:', err);
        }
    };

    // Handlers
    const handleRegisterClick = () => navigate(`/register-event/${encodeURIComponent(decodedName)}`);

    const handleRemoveParticipant = async (participantId) => {
        // Ask for confirmation
        if (!window.confirm('Are you sure you want to remove this participant?')) {
            return;
        }
        
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`http://54.169.81.75:8000/api/event/event_registration/delete/${participantId}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (response.ok) {
                // Remove the participant from the state
                setParticipants(participants.filter((p) => p.id !== participantId));
                // Refresh the participants list
                fetchEventParticipants();
            } else {
                const errorData = await response.json();
                console.error('Failed to remove participant:', errorData);
                alert('Failed to remove participant: ' + (errorData.detail || 'Unknown error'));
            }
        } catch (err) {
            console.error('Error removing participant:', err);
            alert('Error removing participant');
        }
    };

    if (loading) {
        return <div className="loading">Loading event details...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!event) {
        return <div className="event-not-found">No event found.</div>;
    }



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
                            {!profilePicture && studentName.charAt(0)}
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
            <div 
                className="event-banner-wrapper"
                style={{
                    background: event.banner
                        ? `linear-gradient(to bottom, rgb(${event.dominant_color?.join(',')}), rgb(${event.shadow_color?.join(',')}))`
                        : 'linear-gradient(to bottom, #000000, #333333)',
                }}
            >
                <div className="event-banner">
                    {event.banner && (
                        <img
                            src={newBanner ? URL.createObjectURL(newBanner) : event.banner}
                            alt="Event Banner"
                            className="event-banner-img"
                            onClick={isEditMode ? () => bannerInputRef.current.click() : undefined}
                            style={isEditMode ? { cursor: 'pointer', opacity: '0.8' } : {}}
                        />
                    )}
                    <div className="banner-overlay" style={{ 
                        background: event.banner 
                            ? 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'
                            : 'transparent' 
                    }}></div>
                    
                    <div className="event-banner-content">
                        <div className="event-banner-left">
                            {isEventCreator && isEditMode ? (
                                <div className="event-delete-info" onClick={handleDeleteEvent}>
                                    <img src={deleteIcon} alt="Delete Icon" className="delete-icon" />
                                    <div className="event-delete-title">Delete Event</div>
                                </div>
                            ) : (
                                <div className="event-collaboration-info" onClick={() => setCollabSidebarOpen(true)}>
                                    <img src={collaborationIcon} alt="Collaboration Icon" className="collaboration-icon" />
                                    <div className="event-collaboration-title">Collaboration</div>
                                </div>
                            )}
                        </div>
                        <div className="event-banner-center">
                            <img
                                src={event.club_details?.logo || logo}
                                alt="Club Logo"
                                className="event-club-logo"
                            />
                            {isEditMode ? (
                                <input
                                    type="text"
                                    value={editedEventName}
                                    onChange={(e) => setEditedEventName(e.target.value)}
                                    className="edit-event-name-input"
                                    placeholder="Event Name"
                                />
                            ) : (
                                <h1 className="event-page-name">{event.name}</h1>
                            )}
                            
                            {isEditMode ? (
                                <div className="event-banner-buttons">
                                    <button className="event-banner-button save-edit" onClick={handleSaveChanges}>
                                        Save
                                    </button>
                                    <button className="event-banner-button cancel-edit" onClick={handleCancelEdit}>
                                        Cancel
                                    </button>
                                    <button
                                        className="event-banner-button change-event-banner-button"
                                        onClick={() => bannerInputRef.current.click()}
                                    >
                                        Change Banner
                                    </button>
                                </div>
                            ) : (
                                <div className="event-banner-buttons">
                                    {isEventCreator && (
                                        <button
                                            className="event-banner-button edit-event-button"
                                            onClick={() => setIsEditMode(true)}
                                        >
                                            Edit
                                        </button>
                                    )}
                                    <button 
                                        className="register-button" 
                                        onClick={isUserRegistered ? handleCancelRegistration : handleRegisterClick}
                                        style={{
                                            background: isUserRegistered ? '#CF2424' : '#2074AC',
                                        }}
                                    >
                                        {isUserRegistered ? 'Cancel' : 'Register'}
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="event-banner-right">
                        <div className="event-participants-info" onClick={toggleParticipantsPanel}>
                            <img src={membersIcon} alt="Participants Icon" className="participants-icon" />
                            <div className="event-participants-title">Participants</div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Description Section */}
            <div className="event-description-container">
                <div className="event-description-header">
                    <h2 className="event-description-title">Description</h2>
                </div>
                <div className="event-description">
                    {isEditMode ? (
                        <textarea
                            value={editedDescription}
                            onChange={(e) => setEditedDescription(e.target.value)}
                            className="edit-event-description"
                            placeholder="Event Description"
                        />
                    ) : (
                        event.description ? (
                            event.description.split('\n').map((line, index) => <p key={index}>{line}</p>)
                        ) : (
                            <p>No description available.</p>
                        )
                    )}
                </div>
            </div>

            {/* Details Section */}
            <div className="details-event-container">
                <div className="details-event-header">
                    <h2 className="meta-event-title">Details</h2>
                </div>
                {isEditMode ? (
                    <div className="edit-event-details">
                        <div className="edit-event-detail-row">
                            <label>Date:</label>
                            <input
                                type="date"
                                value={editedDate}
                                onChange={(e) => setEditedDate(e.target.value)}
                            />
                        </div>
                        <div className="edit-event-detail-row">
                            <label>Time:</label>
                            <input
                                type="time"
                                value={editedTime}
                                onChange={(e) => setEditedTime(e.target.value)}
                            />
                        </div>
                        <div className="edit-event-detail-row">
                            <label>Location:</label>
                            <input
                                type="text"
                                value={editedLocation}
                                onChange={(e) => setEditedLocation(e.target.value)}
                            />
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="event-page-date">Date: {event.date}</div>
                        <div className="event-page-time">Time: {event.time}</div>
                        <div className="event-page-location">Location: {event.location}</div>
                    </>
                )}
            </div>

            {/* Feedback Button */}
            <div className="feedback-box">
                <button
                    className="feedback-button"
                    onClick={() => {
                        if (isEventCreator) {
                            // Navigate to FeedbackReview page if the user can edit the event
                            navigate(`/feedback-review/${encodeURIComponent(decodedName)}`);
                        } else {
                            // Navigate to Feedback page if the user cannot edit the event
                            navigate(`/feedback/${encodeURIComponent(decodedName)}`);
                        }
                    }}
                >
                    Feedback
                </button>
            </div>

            {/* Add this JSX for the participants panel to Event.jsx */}
            {showParticipantsPanel && (
                <>
                    <div className={`overlay ${overlayHiding ? 'hide' : ''}`} onClick={handleClosePanel}></div>
                    <img
                        src={Exit}
                        alt="Exit"
                        className={`exit-icon ${hidingExit ? 'hide-exit' : ''}`}
                        onClick={handleClosePanel}
                    />
                    <div className={`members-panel ${hidingPanel ? 'slide-out' : 'slide-in'}`}>
                        <div className="members-panel-content">
                            <div className="members-panel-header">
                                <div className="members-header-left">
                                    <h2 className="members-title">Event Participants</h2>
                                </div>
                                <div className="members-header-center">
                                    <span className="total-members">Total: {participants.length}</span>
                                    <div className="search-bar-wrapper">
                                        <input
                                            type="text"
                                            className="members-search-input"
                                            placeholder="Search by name or ID"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <button
                                            className="members-search-button"
                                            onClick={() => setSearchQuery(searchTerm.trim())}
                                        >
                                            SEARCH
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="members-panel-header-border"></div>
                            <div className="members-body">
                                <div className="role-section">
                                    <div className="role-title">Registered Participants</div>
                                    {participants
                                        .filter(p => !searchQuery || 
                                            (p.student?.full_name && p.student.full_name.toLowerCase().includes(searchQuery.toLowerCase())) || 
                                            (p.student?.studentid && String(p.student.studentid).includes(searchQuery)))
                                        .map((participant, idx) => (
                                            <div className="person-card" key={idx}>
                                                <div
                                                    className="person-icon"
                                                    style={{
                                                        backgroundImage: participant.student?.profile_picture ? 
                                                            `url(${participant.student.profile_picture})` : 'none',
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    {!participant.student?.profile_picture && 
                                                        getInitials(participant.student?.full_name || '?')}
                                                </div>
                                                <div className="person-info">
                                                    <div className="person-name">
                                                        {participant.student?.full_name || 'Unknown'}
                                                    </div>
                                                    <div className="person-id">
                                                        {participant.student?.studentid || 'No ID'} • {participant.role || 'Participant'}
                                                    </div>
                                                </div>
                                                {(isEventCreator || isClubLeaderForEvent) && (
                                                    <div 
                                                        className="participant-delete-info"
                                                        onClick={() => handleRemoveParticipant(participant.id)}
                                                    >
                                                        <img src={deleteIcon2} alt="Delete Icon" className="delete-icon" />
                                                        <div className="participant-delete-title">Remove</div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    {participants.filter(p => !searchQuery || 
                                        (p.student?.full_name && p.student.full_name.toLowerCase().includes(searchQuery.toLowerCase())) || 
                                        (p.student?.studentid && String(p.student.studentid).includes(searchQuery))
                                    ).length === 0 && (
                                        <div className="no-results">No participants found matching your search.</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Sidebar */}
            <Sidebar
                isOpen={collabSidebarOpen}
                onClose={() => setCollabSidebarOpen(false)}
                presidentEmail={event.club_details?.president?.email || ''}
            />

            {/* Hidden file inputs */}
            <input
                type="file"
                ref={bannerInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleBannerChange}
            />
        </div>
    );
};

export default Event;