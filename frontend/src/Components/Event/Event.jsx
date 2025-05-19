import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import './Event.css';
import logo from '../../assets/logo.png';
import calendar from '../../assets/calendar.png';
import collaborationIcon from '../../assets/collaboration.png';
import membersIcon from '../../assets/members.png';
import deleteIcon2 from '../../assets/delete.png';
import deleteIcon from '../../assets/delete_white.png';
import editIcon from '../../assets/edit.png';
import Exit from '../../assets/Exit.png';
import Sidebar from '../CollabSidebar/Sidebar';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { AnimatePresence, motion } from 'framer-motion';
import { useNotification } from '../Notification/Context';
import { decodeHTMLEntities } from '../../utils';

const Event = () => {
    const navigate = useNavigate();
    const { currentUser } = useCurrentUser();
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

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isClubLeaderForEvent, setIsClubLeaderForEvent] = useState(false);
    const [showParticipantsPanel, setShowParticipantsPanel] = useState(false);
    const [participants, setParticipants] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const { success: success2, error: error2, confirm } = useNotification();
    const [overlayHiding, setOverlayHiding] = useState(false);
    const [hidingExit, setHidingExit] = useState(false);
    const [hidingPanel, setHidingPanel] = useState(false);
    const [profilePicture, setProfilePicture] = useState('');
    const [studentName, setStudentName] = useState('');
    const [collabSidebarOpen, setCollabSidebarOpen] = useState(false);
    const bannerInputRef = useRef(null);
    const studentID = localStorage.getItem('studentID');
    const isGuest = localStorage.getItem('isGuest') === 'true';
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [draftDescription, setDraftDescription] = useState('');
    const [descriptionText, setDescriptionText] = useState('');
    const maxDescriptionLength = 1500;

    const [isEditingDetails, setIsEditingDetails] = useState(false);

    const [draftDate, setDraftDate] = useState('');
    const [draftTime, setDraftTime] = useState('');
    const [draftLocation, setDraftLocation] = useState('');


    const saveDetails = async () => {
        const token = localStorage.getItem('access_token');
        const formData = new FormData();
        formData.append('date', draftDate);
        formData.append('time', draftTime);
        formData.append('location', draftLocation);

        const res = await fetch(
            `https://curtinunihubplus.com/api/event/add_event/${event.id}/`,
            {
                method: 'PATCH',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            }
        );

        if (res.ok) {
            setEvent({
                ...event,
                date: draftDate,
                time: draftTime,
                location: draftLocation
            });
            setIsEditingDetails(false);
        } else {
            console.error('Failed to update details');
        }
    };

    useEffect(() => {
        if (event) {
            setDraftDate(event.date);
            setDraftTime(event.time);
            setDraftLocation(event.location);
        }
    }, [event]);


    useEffect(() => {
        if (event) {
            setDraftDescription(event.description || '');
        }
    }, [event]);

    const saveDescription = async () => {
        const token = localStorage.getItem('access_token');
        const formData = new FormData();
        formData.append('description', draftDescription);

        const res = await fetch(
            `https://curtinunihubplus.com/api/event/add_event/${event.id}/`,
            {
                method: 'PATCH',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            }
        );
        if (res.ok) {
            setEvent({ ...event, description: draftDescription });
            setEditedDescription(draftDescription);
            setIsEditingDescription(false);
        } else {
            console.error('Failed to update description');
        }
    };

    const fetchEventParticipants = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const headers = {
                'Content-Type': 'application/json',
            };
            
            // Only add the Authorization header if not a guest user and token exists
            if (!isGuest && token) {
                headers.Authorization = `Bearer ${token}`;
            }
            
            const response = await fetch(`https://curtinunihubplus.com/api/event/event_registration/${event.id}/participants/`, {
                method: 'GET',
                headers: headers,
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

    const toggleParticipantsPanel = () => {
        if (showParticipantsPanel) {
            handleClosePanel();
        } else {
            fetchEventParticipants();
            setShowParticipantsPanel(true);
        }
    };

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

    // Modify the getInitials function
    const getInitials = (fullName) => {
        const decodedName = decodeHTMLEntities(fullName || '');
        const names = decodedName.trim().split(' ');
        const initials = names[0]?.charAt(0).toUpperCase() + (names[1]?.charAt(0).toUpperCase() || '');
        return initials;
    };

    useEffect(() => {
        const justRegisteredEventId = localStorage.getItem('just_registered_event');
        if (event && justRegisteredEventId === event.id?.toString()) {
            setIsUserRegistered(true);
            localStorage.removeItem('just_registered_event');
            fetchEventParticipants();
        }
    }, [event]);
    
    

    useEffect(() => {
        if (!isGuest) {
            const currentUserData = JSON.parse(localStorage.getItem('profile') || '{}');
            const profilePicUrl = currentUserData.profile_picture || '';
            
            setStudentName(currentUserData.full_name || currentUserData.name || 'Unknown Student');
            setProfilePicture(profilePicUrl.startsWith('http') ? profilePicUrl : 
                             profilePicUrl ? `https://curtinunihubplus.com${profilePicUrl}` : '');
        }
    }, [isGuest]);

    useEffect(() => {
    // Reset user-specific states when in guest mode
    if (isGuest) {
        setIsUserRegistered(false);
        setIsEventCreator(false);
        setIsClubLeaderForEvent(false);
    }
}, [isGuest]);
    
    useEffect(() => {
        const fetchEventData = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('access_token');
                const userProfile = JSON.parse(localStorage.getItem('profile') || '{}');
                const currentStudentID = userProfile.studentid;
                
                console.log("Current user studentID:", currentStudentID);
                
                // First get the event details
                const response = await fetch(`https://curtinunihubplus.com/api/event/add_event/`, {
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
                    console.log("Found event:", event.name);
                    // Important: Make sure club ID is available
                    console.log("Event club ID:", event.club);
                    
                    setEvent(event);
                    setEditedEventName(event.name);
                    setEditedDescription(event.description || '');
                    setEditedDate(event.date || '');
                    setEditedTime(event.time || '');
                    setEditedLocation(event.location || '');
                    
                    // Check if user is the event creator
                    const isCreator = 
                        currentStudentID && 
                        event.created_by_details && 
                        String(event.created_by_details.studentid) === String(currentStudentID);
                    
                    console.log("Is event creator:", isCreator);
                    setIsEventCreator(isCreator);
                    
                    // Now check club leadership if we have a clubId
                    if (!isGuest && event.club) {
                        try {
                            console.log("Fetching club data for club ID:", event.club);
                            const clubResponse = await fetch(`https://curtinunihubplus.com/clubs/clubs/${event.club}/`, {
                                headers: {
                                    'Authorization': token ? `Bearer ${token}` : '',
                                    'Content-Type': 'application/json',
                                }
                            });
                            
                            if (clubResponse.ok) {
                                const clubData = await clubResponse.json();
                                console.log("Club president ID:", clubData.president?.studentid);
                                console.log("Current user ID:", currentStudentID);
                                
                                // Check if current user is the current club president
                                const isCurrentPresident = 
                                    currentStudentID && 
                                    clubData.president && 
                                    String(clubData.president.studentid) === String(currentStudentID);
                                
                                console.log("Is club leader for event:", isCurrentPresident);
                                setIsClubLeaderForEvent(isCurrentPresident);
                                
                                // Update event with correct club details
                                setEvent(prevEvent => ({
                                    ...prevEvent,
                                    club: event.club,
                                    club_details: {
                                        ...prevEvent.club_details,
                                        president: clubData.president
                                    }
                                }));
                            } else {
                                console.error("Failed to fetch club data:", await clubResponse.text());
                            }
                        } catch (err) {
                            console.error('Error fetching current club data:', err);
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
    }, [decodedName]); // Only re-run when event name changes

const sec = event?.secondary_color ? `rgb(${event.secondary_color.join(',')})` : 'rgb(0,0,0)';
const dom = event?.dominant_color ? `rgb(${event.dominant_color.join(',')})` : 'rgb(255,255,255)';
const ter = event?.tertiary_color ? `rgb(${event.tertiary_color.join(',')})` : 'rgb(128,128,128)';
const bgOverlay = event?.banner
    ? `linear-gradient(to left, ${sec} 0%, ${dom} 33%, ${ter} 67%, ${sec} 100%)`
    : 'transparent';

// Add this near where you define the color variables:
console.log("Event color data:", {
    secondary: event?.secondary_color,
    dominant: event?.dominant_color,
    tertiary: event?.tertiary_color,
    shadow: event?.shadow_color
});
console.log("Generated gradient:", bgOverlay);

useEffect(() => {
    if (event && !isGuest) {
        const registrationKey = `event_registered_${event.id}`;
        const cachedRegistration = localStorage.getItem(registrationKey);
        
        if (cachedRegistration === 'true' || cachedRegistration === 'false') {
            setIsUserRegistered(cachedRegistration === 'true');
        }
        
        const checkRegistrationStatus = async () => {
                    try {
                        const token = localStorage.getItem('access_token');
                        const studentID = localStorage.getItem('studentID') || localStorage.getItem('student_id');
                        console.log("Checking registration with student ID:", studentID);
                        
                        const response = await fetch(
                            `https://curtinunihubplus.com/api/event/event_registration/${event.id}/participants/`,
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
                // Add debug logs to see exact values
                console.log("Event creator studentid:", event.created_by_details.studentid);
                console.log("Current studentID from localStorage:", studentID);
                console.log("Types:", typeof event.created_by_details.studentid, typeof studentID);
                console.log("Are they equal?", event.created_by_details.studentid === studentID);
                
                // Use explicit type conversion to avoid string/number comparison issues
                const isCreator = String(event.created_by_details.studentid) === String(studentID);
                console.log("After string conversion:", isCreator);
                
                setIsEventCreator(isCreator);
            }
        }, [event, studentID]);

        const handleDeleteEvent = async () => {
            const confirmed = await confirm('Are you sure you want to delete this event? This action cannot be undone.');
            
            if (!confirmed) return;
            
            try {
                const token = localStorage.getItem('access_token');
                
                const response = await fetch(`https://curtinunihubplus.com/api/event/add_event/${event.id}/`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
        
                if (response.ok) {
                    success2('Event deleted successfully');
                    navigate('/event-directory');
                } else {
                    error2('Failed to delete event');
                }
            } catch (err) {
                console.error('Error deleting event:', err);
                error2('Error deleting event');
            }
        };

        const handleCancelRegistration = async () => {
            if (isGuest) {
                navigate('/login');
                return;
            }
            
            const confirmed = await confirm('Are you sure you want to cancel your registration for this event?');
            
            if (!confirmed) return;
            
            try {
                const token = localStorage.getItem('access_token');
                
                const userRegistration = participants.find(p => 
                    p.student && p.student.studentid === studentID
                );
                
                if (!userRegistration) {
                    console.error('User registration not found');
                    return;
                }
                
                const response = await fetch(`https://curtinunihubplus.com/api/event/event_registration/delete/${userRegistration.id}/`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                
                if (response.ok) {
                    setIsUserRegistered(false);
                    localStorage.setItem(`event_registered_${event.id}`, 'false');
                    
                    setParticipants(participants.filter(p => 
                        !p.student || p.student.studentid !== studentID
                    ));
                    
                    if (showParticipantsPanel) {
                        fetchEventParticipants();
                    }
                } else {
                    error2('Failed to cancel registration');
                }
            } catch (err) {
                console.error('Error cancelling registration:', err);
                error2('Error cancelling registration');
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
            
            // Include the club_id if available in the event object
            if (event.club) {
                formData.append('club', event.club);
            }
            
            if (newBanner) {
                formData.append('banner', newBanner);
            }
            
            const response = await fetch(`https://curtinunihubplus.com/api/event/add_event/${event.id}/`, {
                method: 'PATCH', // Use PATCH instead of PUT for partial updates
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            
            if (response.ok) {
                const event = await response.json();
                setEvent(event);
                setIsEditMode(false);
                
                if (event.name !== decodedName) {
                    navigate(`/event/${encodeURIComponent(event.name)}`);
                }
            } else {
                // Better error handling - show the actual error message
                const errorData = await response.json().catch(() => ({}));
                console.error('Failed to update event:', errorData);
                
                // Display a more helpful error message
                const errorMessage = errorData.detail || 
                                    Object.values(errorData).flat().join(', ') || 
                                    'Failed to update event';
                error2(`Error: ${errorMessage}`);
            }
        } catch (err) {
            console.error('Error updating event:', err);
            error2('Error updating event: ' + err.message);
        }
    };

    const handleRegisterClick = () => {
        if (isGuest) {
            navigate('/error', {
                state: {
                    errorCode: '401',
                    errorMessage: 'Login Required',
                    errorDetails: 'Please log in to register for events.'
                }
            });
            return;
        }
        navigate(`/register-event/${encodeURIComponent(decodedName)}`);
    };

    const handleNav = path => () => navigate(path);

const handleRemoveParticipant = async (participantId) => {
    const confirmed = await confirm('Are you sure you want to remove this participant?');
    
    if (!confirmed) return;
    
    try {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`https://curtinunihubplus.com/api/event/event_registration/delete/${participantId}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            setParticipants(participants.filter((p) => p.id !== participantId));
            fetchEventParticipants();
        } else {
            const errorData = await response.json();
            console.error('Failed to remove participant:', errorData);
            error2('Failed to remove participant: ' + (errorData.detail || 'Unknown error'));
        }
    } catch (err) {
        console.error('Error removing participant:', err);
        error2('Error removing participant');
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



const isEventPassed = () => {
  if (!event || !event.date) return false;
  
  // Parse event date using the more reliable method from hasEventPassed
  const [year, month, day] = event.date.split('-').map(Number);
  const eventDate = new Date(year, month - 1, day); // Month is 0-indexed in JS
  
  // Add 1 day to get "day after event"
  const dayAfterEvent = new Date(eventDate);
  dayAfterEvent.setDate(dayAfterEvent.getDate() + 1);
  
  // Get current date without time
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Debug information
  console.log("Event date:", eventDate);
  console.log("Day after event:", dayAfterEvent);
  console.log("Today:", today);
  console.log("Is feedback available:", today >= dayAfterEvent);
  
  return today >= dayAfterEvent;
};

const hasEventPassed = () => {
  if (!event || !event.date) return false;
  
  // Parse event date (format: YYYY-MM-DD) and handle timezone issues
  const [year, month, day] = event.date.split('-').map(Number);
  const eventDate = new Date(year, month - 1, day); // Month is 0-indexed in JS
  
  // Get current date without time
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // For debugging
  console.log("Event date:", eventDate);
  console.log("Today:", today);
  console.log("Is event passed:", today > eventDate);
  
  return today > eventDate;
};

// Add this right before the return statement
console.log("RENDER - Permission Summary:");
console.log("- isEventCreator:", isEventCreator);
console.log("- isClubLeaderForEvent:", isClubLeaderForEvent);
console.log("- Can edit event:", isEventCreator || isClubLeaderForEvent);

    return (
        <div className="event-page">
            <div className="navbar">
                <img src={logo} alt="Logo" className="curtin-logo" onClick={handleNav('/club-directory')} />
                <div className="navbar-text">
                    <div
                        className="clubs-navbar"
                        onClick={handleNav('/club-directory')}
                        style={{ color: location.pathname === '/club-directory' ? '#000' : '#999' }}
                    >
                        Clubs
                    </div>
                    <div
                        className="events-navbar"
                        onClick={handleNav('/event-directory')}
                        style={{ color: location.pathname === '/event-directory' ? '#000' : '#999' }}
                    >
                        Events
                    </div>
                    {!isGuest && (
                        <div
                            className="activity-navbar"
                            onClick={handleNav('/my-activity')}
                            style={{ color: location.pathname === '/my-activity' ? '#000' : '#999' }}
                        >
                            My Activity
                        </div>
                    )}
                </div>
                <div className="navbar-right">
                    {isGuest ? (
                        <div
                            onClick={handleNav('/login')}
                            style={{
                                cursor: 'pointer',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                color: '#000',
                                fontFamily: 'Effra, sans-serif'
                            }}
                        >
                            LOGIN
                        </div>
                    ) : (
                        <div
                            className="profile-icon"
                            onClick={handleNav('/profile')}
                            style={{
                                backgroundImage: profilePicture ? `url(${profilePicture})` : 'none',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                cursor: 'pointer',
                            }}
                        >
                            {!profilePicture && getInitials(studentName)}
                        </div>
                    )}
                    {!isGuest && (
                        <img
                            src={calendar}
                            alt="Calendar"
                            className="calendar-icon"
                            onClick={handleNav('/calendar')}
                            style={{ cursor: 'pointer' }}
                        />
                    )}
                </div>
            </div>

                <div 
                    className={`event-banner-wrapper ${isEditMode ? 'edit-mode' : ''}`} 
                    style={{ 
                        background: bgOverlay,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        position: 'relative'
                    }}
                >  
                    {event.banner && (
                        <img
                            src={newBanner ? URL.createObjectURL(newBanner) : event.banner}
                            alt="Event Banner"
                            className="event-banner-img"
                            onClick={isEditMode ? () => bannerInputRef.current.click() : undefined}
                            style={isEditMode ? { cursor: 'pointer' } : {}}
                        />
                    )}
                    <div
                        className="banner-overlay"
                        style={{
                            background: event.banner && event.shadow_color
                                ? `linear-gradient(to top, rgb(${event.shadow_color.join(',')}), transparent 70%)`
                                : 'transparent',
                            position: 'absolute',
                            bottom: 0,
                            height: '100%',
                            zIndex: 1
                        }}
                    />
                    <div className="event-banner-content">
                        <div className="event-banner-left">
                            {(isEventCreator || isClubLeaderForEvent) ? (
                                <div className="event-delete-info" onClick={handleDeleteEvent}>
                                    <img src={deleteIcon} alt="Delete Icon" className="event-delete-icon" />
                                    <div className="event-delete-title">Delete Event</div>
                                </div>
                            ) : (
                                !isGuest && (
                                    <div className="event-collaboration-info" onClick={() => setCollabSidebarOpen(true)}>
                                        <img src={collaborationIcon} alt="Collaboration Icon" className="collaboration-icon" />
                                        <div className="event-collaboration-title">Collaboration</div>
                                    </div>
                                )
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
                                    onChange={e => setEditedEventName(e.target.value)}
                                    className="edit-club-name-input"
                                />
                            ) : (
                                <h1 className="club-page-name">{decodeHTMLEntities(event.name)}</h1>
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
                                    {!isGuest ? (
                                        <>
                                            {(isEventCreator || isClubLeaderForEvent) && (
                                                <button
                                                    className="event-banner-button edit-event-button"
                                                    onClick={() => setIsEditMode(true)}
                                                >
                                                    Edit
                                                </button>
                                            )}
                                            <button
                                                className="register-button"
                                                onClick={hasEventPassed() ? null : (isUserRegistered ? handleCancelRegistration : handleRegisterClick)}
                                                style={{
                                                    background: hasEventPassed() ? '#999999' : (isUserRegistered ? '#CF2424' : '#2074AC'),
                                                    cursor: hasEventPassed() ? 'default' : 'pointer',
                                                }}
                                            >
                                                {hasEventPassed() ? 'Event\'s Over' : (isUserRegistered ? 'Cancel' : 'Register')}
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            className="register-button"
                                            onClick={hasEventPassed() ? null : handleRegisterClick}
                                            style={{
                                                background: hasEventPassed() ? '#999999' : '#2074AC',
                                                cursor: hasEventPassed() ? 'default' : 'pointer',
                                            }}
                                        >
                                            {hasEventPassed() ? 'Event\'s Over' : 'Register'}
                                        </button>
                                    )}
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

            <div className="event-description-container">
                <div className="event-description-header">
                    <h2 className="event-description-title">Description</h2>
                    {(isEventCreator || isClubLeaderForEvent) && !isEditingDescription && (
                        <button
                            className="edit-event-description-button"
                            onClick={() => setIsEditingDescription(true)}
                        >
                            <img src={editIcon} alt="Edit description" />
                        </button>
                    )}
                </div>
                <div className="event-description">
                    {isEditingDescription ? (
                        <>
                            <div style={{ position: 'relative' }}>
                                <textarea
                                    className="edit-event-description"
                                    value={draftDescription}
                                    onChange={(e) => setDraftDescription(e.target.value)}
                                    placeholder="Event Description"
                                />
                                <div
                                    className={`edit-description-char-counter ${descriptionText.length === maxDescriptionLength ? 'red' : ''
                                        }`}
                                >
                                    {descriptionText.length}/{maxDescriptionLength}
                                </div>
                            </div>
                            <div className="edit-description-controls">
                                <button
                                    className="save-description-button"
                                    onClick={saveDescription}
                                >
                                    Save
                                </button>
                                <button
                                    className="cancel-description-button"
                                    onClick={() => {
                                        setDraftDescription(event.description || '');
                                        setIsEditingDescription(false);
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    ) : event.description ? (
                        event.description.split('\n').map((line, i) => <p key={i}>{decodeHTMLEntities(line)}</p>)
                    ) : (
                        <p>No description available.</p>
                    )}
                </div>
            </div>

            <div className="details-event-container">
                <div className="details-event-header">
                    <h2 className="meta-event-title">Details</h2>
                    {(isEventCreator || isClubLeaderForEvent) && !isEditingDetails && (
                        <button
                            className="edit-event-details-button"
                            onClick={() => setIsEditingDetails(true)}
                        >
                            <img src={editIcon} alt="Edit details" />
                        </button>
                    )}
                </div>

                {isEditingDetails ? (
                    <div className="edit-event-details">
                        <div className="edit-event-detail-row">
                            <label>Date:</label>
                            <input
                                type="date"
                                value={draftDate}
                                onChange={e => setDraftDate(e.target.value)}
                            />
                        </div>
                        <div className="edit-event-detail-row">
                            <label>Time:</label>
                            <input
                                type="time"
                                value={draftTime}
                                onChange={e => setDraftTime(e.target.value)}
                            />
                        </div>
                        <div className="edit-event-detail-row">
                            <label>Location:</label>
                            <input
                                type="text"
                                value={draftLocation}
                                onChange={e => setDraftLocation(e.target.value)}
                            />
                        </div>
                        <div className="edit-description-controls">
                            <button
                                className="save-description-button"
                                onClick={saveDetails}
                            >
                                Save
                            </button>
                            <button
                                className="cancel-description-button"
                                onClick={() => {
                                    setDraftDate(event.date);
                                    setDraftTime(event.time);
                                    setDraftLocation(event.location);
                                    setIsEditingDetails(false);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="event-page-date"><strong>Date</strong>: {event.date}</div>
                        <div className="event-page-time"><strong>Time</strong>: {event.time}</div>
                        <div className="event-page-location"><strong>Location</strong>: {decodeHTMLEntities(event.location)}</div>
                    </>
                )}
            </div>

            <div className="feedback-box">
                {((isEventCreator || isClubLeaderForEvent) || (!isGuest && isEventPassed())) && (
                    <button
                        className="feedback-button"
                        onClick={() => {
                            if (!isEventPassed()) {
                                error2("Feedback is not available until the day after the event.");
                            } else if (isEventCreator || isClubLeaderForEvent) {
                                navigate(`/feedback-review/${encodeURIComponent(decodedName)}`);
                            } else {
                                navigate(`/feedback/${encodeURIComponent(decodedName)}`);
                            }
                        }}
                    >
                        Feedback
                    </button>
                )}
            </div>

            <AnimatePresence>
                {showParticipantsPanel && (
                    <>
                        <motion.div
                            className="participants-overlay"
                            onClick={handleClosePanel}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        />

                        <motion.div
                            className="participants-container"
                            initial={{ x: '100vw' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100vw' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                        >
                            <motion.div
                                className="participants-exit-col"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <img
                                    src={Exit}
                                    alt="Close"
                                    className="participants-exit-icon"
                                    onClick={handleClosePanel}
                                />
                            </motion.div>

                            <div className="participants-panel-col participants-panel">
                                <div className="participants-panel-content">
                                    <div className="participants-panel-header">
                                        <span className="total-participants">
                                            Total: {participants.length}
                                        </span>
                                        <div className="participants-search-bar-wrapper">
                                            <input
                                                type="text"
                                                className="participants-search-input"
                                                placeholder="Search by name or ID"
                                                value={searchTerm}
                                                onChange={e => setSearchTerm(e.target.value)}
                                            />
                                            <button
                                                className="participants-search-button"
                                                onClick={() => setSearchQuery(searchTerm.trim())}
                                            >
                                                SEARCH
                                            </button>
                                        </div>
                                    </div>

                                    <div className="participants-body">
                                        <div className="participants-role-section">
                                            <div className="participants-role-title">Registered Participants</div>

                                            {participants
                                                .filter(p =>
                                                    !searchQuery ||
                                                    (p.student?.full_name &&
                                                        p.student.full_name.toLowerCase().includes(
                                                            searchQuery.toLowerCase()
                                                        )) ||
                                                    (p.student?.studentid &&
                                                        String(p.student.studentid).includes(searchQuery))
                                                )
                                                .map((participant, idx) => (
                                                    <div className="participants-person-card" key={idx}>
                                                        <div
                                                            className="participants-person-icon"
                                                            style={{
                                                                backgroundImage: participant.student?.profile_picture
                                                                    ? `url(${participant.student.profile_picture})`
                                                                    : 'none',
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
                                                        <div className="participants-person-info">
                                                            <div className="participants-person-name">
                                                                {decodeHTMLEntities(participant.student?.full_name || 'Unknown')}
                                                            </div>
                                                            <div className="participants-person-id">
                                                                {participant.student?.studentid || 'No ID'} •{' '}
                                                                {participant.role || 'Participant'}
                                                            </div>
                                                        </div>
                                                        {(isEventCreator || isClubLeaderForEvent) && (
                                                            <div
                                                                className="participant-delete-info"
                                                                onClick={() => handleRemoveParticipant(participant.id)}
                                                            >
                                                                <img
                                                                    src={deleteIcon2}
                                                                    alt="Delete Icon"
                                                                    className="delete-icon"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}

                                            {participants.filter(p =>
                                                !searchQuery ||
                                                (p.student?.full_name &&
                                                    p.student.full_name.toLowerCase().includes(
                                                        searchQuery.toLowerCase()
                                                    )) ||
                                                (p.student?.studentid &&
                                                    String(p.student.studentid).includes(searchQuery))
                                            ).length === 0 && (
                                                    <div className="no-results">
                                                        No participants found matching your search.
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <Sidebar
                isOpen={collabSidebarOpen}
                onClose={() => setCollabSidebarOpen(false)}
                presidentEmail={event.club_details?.president?.email || ''}
            />

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