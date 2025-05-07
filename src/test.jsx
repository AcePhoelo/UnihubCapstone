import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import './Event.css';
import logo from '../../assets/logo.png';
import calendar from '../../assets/calendar.png';
import collaborationIcon from '../../assets/collaboration.png';
import membersIcon from '../../assets/members.png';
import editIcon from '../../assets/edit.png';
import clubsWithEvents from '../../data/mockClubs';
import ColorThief from 'colorthief';
import chroma from 'chroma-js';
import { mockUserRoles } from '../../data/mockLoginRoles';
import deleteIcon from '../../assets/delete_white.png';
import blackDeleteIcon from '../../assets/delete.png';
import Exit from '../../assets/Exit.png';
import mockEventParticipants from '../../data/mockEventParticipants';

const Event = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { eventName } = useParams();
    const decodedName = decodeURIComponent(eventName);
    const [studentName, setStudentName] = useState('');
    const [setStudentID] = useState('');
    const studentEmail = localStorage.getItem('studentEmail');
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
    const [editedBannerUrl, setEditedBannerUrl] = useState('');
    const [descriptionText, setDescriptionText] = useState("");
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [deleteConfirmText, setDeleteConfirmText] = useState('');
    const maxDescriptionLength = 1500;
    const bannerInputRef = useRef(null);

    const [bannerColor, setBannerColor] = useState('#888888');
    const [bannerGradient, setBannerGradient] = useState('linear-gradient(to top, #000000, transparent)');
    const [darkColor, setDarkColor] = useState('#000000');

    const allEvents = clubsWithEvents.reduce((acc, club) => {
        if (club.events && club.events.length > 0) {
            const clubEvents = club.events.map((evt) => ({
                ...evt,
                clubName: club.name,
                clubBannerUrl: club.bannerUrl,
                clubLogoUrl: club.logoUrl
            }));
            return [...acc, ...clubEvents];
        }
        return acc;
    }, []);

    const event = allEvents.find((e) => e.title.toLowerCase() === decodedName.toLowerCase());
    const participants = event ? mockEventParticipants[event.title] || [] : [];

    const [showParticipantsPanel, setShowParticipantsPanel] = useState(false);
    const [hidingPanel, setHidingPanel] = useState(false);
    const [overlayHiding, setOverlayHiding] = useState(false);
    const [hidingExit, setHidingExit] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchResults, setShowSearchResults] = useState(false);

    const toggleParticipantsPanel = () => {
        if (showParticipantsPanel) {
            handleClosePanel();
        } else {
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

    useEffect(() => {
        const bannerSrc = editedBannerUrl || event?.bannerUrl;
        if (bannerSrc && !bannerSrc.startsWith('data:image')) {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = bannerSrc;

            img.onload = () => {
                const colorThief = new ColorThief();
                try {
                    const palette = colorThief.getPalette(img, 3);
                    const createGradientFromPalette = (palette, stopCount = 5) => {
                        const colors = palette.map(rgb => `rgb(${rgb.join(',')})`);
                        const scale = chroma.scale(colors).mode('lab').colors(stopCount);
                        return `linear-gradient(to right, ${scale.join(', ')})`;
                    };
                    const gradientFromPalette = createGradientFromPalette(palette, 5);
                    const rgb = colorThief.getColor(img);
                    const darkCol = chroma(rgb[0], rgb[1], rgb[2]).desaturate(0.4).darken(2).css();
                    const darkGradient = `linear-gradient(to top, ${darkCol}, transparent)`;

                    setBannerColor(gradientFromPalette);
                    setBannerGradient(darkGradient);
                    setDarkColor(darkCol);
                } catch (error) {
                    setBannerColor('#888888');
                    setBannerGradient('linear-gradient(to top, #000000, transparent)');
                    setDarkColor('#000000');
                }
            };

            img.onerror = () => {
                setBannerColor('#888888');
            };
        }
    }, [editedBannerUrl]);

    useEffect(() => {
        if (event) {
            setDescriptionText(event.description);
        }
    }, [event]);

    useEffect(() => {
        if (event) {
            setDetailsDate(event.date);
            setDetailsTime(event.time);
            setDetailsPlace(event.place);
            setDetailsUnit(event.unit);
        }
    }, [event]);

    useEffect(() => {
        if (event) {
            setEditedEventName(event.title);
            setEditedBannerUrl(event.bannerUrl);
        }
    }, [event]);

    const studentID = localStorage.getItem('studentID');
    const userRole = studentID ? mockUserRoles[studentID] : null;
    const isClubLeaderForEvent = userRole && userRole.leaderOf === event.clubName;

    const handleLogoClick = () => navigate('/club-directory');
    const handleClubsClick = () => navigate('/club-directory');
    const handleEventsClick = () => navigate('/event-directory');
    const handleActivityClick = () => navigate('/my-activity');
    const handleProfileClick = () => navigate('/profile');
    const handleCalendarClick = () => navigate('/calendar');
    const handleRegisterClick = () => navigate('/register-event/' + encodeURIComponent(decodedName));
    const handleClubLogoClick = () => {
        navigate(`/club/${encodeURIComponent(event.clubName)}`);
    };

    const handleFeedbackClick = () => {
        window.open(`/feedback/${encodeURIComponent(event.title)}`, '_blank');
    };

    const handleFeedbacksClick = () => {
        window.open(`/feedback-review/${encodeURIComponent(event.title)}`, '_blank');
    };

    const getInitials = (fullName) => {
        const names = fullName.trim().split(' ');
        const initials = names[0]?.charAt(0).toUpperCase() + (names[1]?.charAt(0).toUpperCase() || '');
        return initials;
    };

    if (!event) {
        return <div className="event-not-found">No event found.</div>;
    }

    const isGuest = localStorage.getItem('isGuest') === 'true';

    return (
        <div className="event-page">
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
                        style={{ cursor: 'pointer', fontSize: isGuest ? '14px' : '24px' }}
                    >
                        {isGuest ? 'LOGIN' : getInitials(studentName || "John BROWN")}
                    </div>
                    <img src={calendar} alt="Calendar" className="calendar-icon"
                        onClick={handleCalendarClick}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
            </div>

            {/* Event Banner */}
            <div className="event-banner-wrapper" style={{ background: bannerColor }}>
                <div className="event-banner">
                    <input
                        type="file"
                        accept="image/*"
                        ref={bannerInputRef}
                        style={{ display: 'none' }}
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    setEditedBannerUrl(reader.result);
                                };
                                reader.readAsDataURL(file);
                            }
                        }}
                    />

                    <img
                        src={editedBannerUrl}
                        alt="Event Banner"
                        className="event-banner-img"
                        style={{ cursor: isEditingEvent ? 'pointer' : 'default' }}
                        onClick={() => {
                            if (isEditingEvent) {
                                bannerInputRef.current?.click();
                            }
                        }}
                    />

                    <div className="banner-overlay" style={{ background: bannerGradient }}></div>

                    <div className="event-banner-content">
                        <div className="event-banner-left">
                            {isClubLeaderForEvent ? (
                                <div className="delete-event-info">
                                    <img
                                        src={deleteIcon}
                                        alt="Delete Event"
                                        className="delete-event-icon"
                                        onClick={() => setShowDeletePopup(true)}
                                    />
                                    <div className="delete-event-title">Delete Event</div>
                                </div>
                            ) : (
                                <div className="event-collaboration-info">
                                    <img
                                        src={collaborationIcon}
                                        alt="Collaboration"
                                        className="collaboration-icon"
                                    />
                                    <div className="event-collaboration-title">Collaboration</div>
                                </div>
                            )}

                            {showDeletePopup && (
                                <div className="delete-popup-overlay">
                                    <div className="delete-popup-box">
                                        <div className="delete-popup-header">
                                            <span className="delete-popup-title">Are you sure you want to delete this event?</span>
                                            <span className="delete-popup-close" onClick={() => setShowDeletePopup(false)}>
                                                ×
                                            </span>
                                        </div>
                                        <div className="delete-popup-body">
                                            <p>Please type <strong>DELETE</strong> to confirm.</p>
                                            <input
                                                type="text"
                                                value={deleteConfirmText}
                                                onChange={(e) => setDeleteConfirmText(e.target.value)}
                                                placeholder="Type DELETE to confirm"
                                                className="delete-popup-input"
                                            />
                                            <button
                                                className="confirm-delete-button"
                                                onClick={() => {
                                                    if (deleteConfirmText.trim().toUpperCase() === 'DELETE') {
                                                        setShowDeletePopup(false);
                                                        navigate('/event-directory'); 
                                                    }
                                                }}
                                            >
                                                Delete Event
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>

                        <div className="event-banner-right">
                            <div className="event-participants-info" onClick={toggleParticipantsPanel}>
                                <img
                                    src={membersIcon}
                                    alt="Participants"
                                    className="participants-icon"
                                />
                                <div className="event-participants-title">Participants</div>
                            </div>
                        </div>

                        <div className="event-banner-center">
                            <img
                                src={event.clubLogoUrl}
                                alt="Club Logo"
                                className="event-club-logo"
                                onClick={handleClubLogoClick}
                                style={{
                                    boxShadow: `0px 4px 10px ${darkColor}`,
                                    cursor: 'pointer'
                                }}
                            />
                            {isEditingEvent ? (
                                <input
                                    type="text"
                                    className="edit-event-title-input"
                                    value={editedEventName}
                                    onChange={(e) => setEditedEventName(e.target.value)}
                                    style={{
                                        textShadow: `2px 2px 4px ${darkColor}`,
                                    }}
                                />
                            ) : (
                                <h1
                                    className="event-page-name"
                                    style={{ textShadow: `2px 2px 4px ${darkColor}` }}
                                >
                                    {editedEventName}
                                </h1>
                            )}
                        </div>

                        {isClubLeaderForEvent ? (
                            isEditingEvent ? (
                                <div className="event-edit-buttons">
                                    <button
                                        className="save-event-edit"
                                        onClick={() => setIsEditingEvent(false)}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="cancel-event-edit"
                                        onClick={() => {
                                            setEditedEventName(event.title);
                                            setEditedBannerUrl(event.bannerUrl);
                                            setIsEditingEvent(false);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="change-banner-button"
                                        onClick={() => bannerInputRef.current?.click()}
                                    >
                                        Change Banner
                                    </button>
                                </div>
                            ) : (
                                <button className="edit-event-button" onClick={() => setIsEditingEvent(true)}>
                                    Edit
                                </button>
                            )
                        ) : (
                            <button
                                className="register-button"
                                onClick={handleRegisterClick}
                                style={{ boxShadow: `0px 2px 8px ${darkColor}` }}
                            >
                                Register
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Description & Details */}
            <div className="event-details">
                <div className="event-description-container">
                    <div className="event-description-header">
                        <div className="event-description-title">Description</div>
                        {isClubLeaderForEvent && (
                            <button
                                className="edit-event-description"
                                onClick={() => setIsEditingDescription(true)}
                            >
                                <img src={editIcon} alt="Edit" />
                            </button>
                        )}
                    </div>
                    <div className="event-description">
                        {isEditingDescription ? (
                            <>
                                <div style={{ position: 'relative' }}>
                                    <textarea
                                        className="edit-description-textarea"
                                        value={descriptionText}
                                        onChange={(e) => {
                                            if (e.target.value.length <= maxDescriptionLength) {
                                                setDescriptionText(e.target.value);
                                            } else {
                                                setDescriptionText(e.target.value.slice(0, maxDescriptionLength));
                                            }
                                        }}
                                        placeholder="Edit description..."
                                    />
                                    <div
                                        className={`description-char-counter ${descriptionText.length === maxDescriptionLength ? 'red' : ''
                                            }`}
                                    >
                                        {descriptionText.length}/{maxDescriptionLength}
                                    </div>
                                </div>
                                <div className="edit-description-controls">
                                    <button
                                        className="save-description-button"
                                        onClick={() => setIsEditingDescription(false)}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="cancel-description-button"
                                        onClick={() => {
                                            setDescriptionText(event.description);
                                            setIsEditingDescription(false);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            descriptionText
                                ? descriptionText.split('\n').map((line, index) => <p key={index}>{line}</p>)
                                : <p>No description available.</p>
                        )}
                    </div>
                </div>

                {/* Details Section */}
                <div className="details-event-container">
                    <div className="details-event-header">
                        <div className="meta-event-title">Details</div>
                        {isClubLeaderForEvent && !isEditingDetails && (
                            <button
                                className="edit-event-details"
                                onClick={() => setIsEditingDetails(true)}
                            >
                                <img src={editIcon} alt="Edit" />
                            </button>
                        )}
                        {isClubLeaderForEvent && isEditingDetails && (
                            <>
                                <button
                                    className="save-event-details"
                                    onClick={() => setIsEditingDetails(false)}
                                >
                                    Save
                                </button>
                                <button
                                    className="cancel-event-details"
                                    onClick={() => {
                                        setDetailsDate(event.date);
                                        setDetailsTime(event.time);
                                        setDetailsPlace(event.place);
                                        setDetailsUnit(event.unit);
                                        setIsEditingDetails(false);
                                    }}
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                    </div>
                    {isEditingDetails ? (
                        <>
                            <div className="event-page-date">
                                <strong>Date:</strong>
                                <input
                                    type="date"
                                    value={detailsDate}
                                    onChange={(e) => setDetailsDate(e.target.value)}
                                />
                            </div>
                            <div className="event-page-time">
                                <strong>Time:</strong>
                                <input
                                    type="time"
                                    value={detailsTime}
                                    onChange={(e) => setDetailsTime(e.target.value)}
                                />
                            </div>
                            <div className="event-page-location">
                                <strong>Location:</strong>
                                <input
                                    type="text"
                                    value={detailsPlace}
                                    onChange={(e) => setDetailsPlace(e.target.value)}
                                />
                                <input
                                    type="text"
                                    value={detailsUnit}
                                    onChange={(e) => setDetailsUnit(e.target.value)}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="event-page-date">
                                <strong>Date:</strong> {detailsDate}
                            </div>
                            <div className="event-page-time">
                                {detailsTime && <span><strong>Time:</strong> {detailsTime}</span>}
                            </div>
                            <div className="event-page-location">
                                {(detailsPlace || detailsUnit) && (
                                    <span>
                                        <strong>Location:</strong> {detailsPlace}{detailsUnit ? `, ${detailsUnit}` : ''}
                                    </span>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>


            {/* Feedback Button */}
            <div className="feedback-button-wrapper">
                <button
                    className="feedback-button"
                    onClick={isClubLeaderForEvent ? handleFeedbacksClick : handleFeedbackClick}
                >
                    {isClubLeaderForEvent ? 'Feedbacks' : 'Feedback'}
                </button>
            </div>

            <div className="invisible-footer"></div>

            {showParticipantsPanel && (
                <>
                    <div className={`overlay ${overlayHiding ? 'hide' : ''}`} onClick={toggleParticipantsPanel}></div>
                    <img
                        src={Exit}
                        alt="Exit"
                        className={`exit-icon ${hidingExit ? 'hide-exit' : ''}`}
                        onClick={handleClosePanel}
                    />
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
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <button
                                            className="participants-search-button"
                                            onClick={() => {
                                                setSearchQuery(searchTerm.trim());
                                                setShowSearchResults(true);
                                            }}
                                        >
                                            SEARCH
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="participants-panel-header-border"></div>
                            <div className="participants-body">
                                {participants.filter((p) => {
                                    const match = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase());
                                    return !searchQuery || match;
                                }).map((p, idx) => (
                                    <div className="person-card" key={idx}>
                                        <div className="person-icon">{getInitials(p.name)}</div>
                                        <div className="person-info">
                                            <div className="person-name">
                                                {p.name}, {p.role}
                                            </div>
                                            <div className="person-id">{p.id}</div>
                                        </div>
                                        {isClubLeaderForEvent && (
                                            <img
                                                src={blackDeleteIcon}
                                                alt="Remove"
                                                className="remove-participant-icon"
                                                onClick={() => {
                                                    console.log(`Remove ${p.name}`);
                                                }}
                                            />
                                        )}
                                    </div>
                                ))}
                                {participants.length === 0 && (
                                    <p style={{ marginTop: '16px', color: '#666' }}>No participants found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Event;