import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import ColorThief from 'colorthief';
import chroma from 'chroma-js';
import './Club.css';
import mockClubMembers from '../../data/mockClubMembers';
import logo from '../../assets/logo.png';
import calendar from '../../assets/calendar.png';
import collaborationIcon from '../../assets/collaboration.png';
import membersIcon from '../../assets/members.png';
import defaultLeaderPic from '../../assets/leader.jpeg';
import mockClubs from '../../data/mockClubs';
import Exit from '../../assets/Exit.png';
import deleteIcon from '../../assets/delete_white.png';
import Sidebar from '../CollabSidebar/Sidebar';
import editIcon from '../../assets/edit.png';

const Club = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { clubName } = useParams();
    const [club, setClub] = useState(null);
    const [loading, setLoading] = useState(true);
    const [studentName, setStudentName] = useState('');
    const [joined, setJoined] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showMembersPanel, setShowMembersPanel] = useState(false);
    const [hidingPanel, setHidingPanel] = useState(false);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [overlayHiding, setOverlayHiding] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const currentStudentID = localStorage.getItem('studentID');
    const [hidingExit, setHidingExit] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [deleteConfirmText, setDeleteConfirmText] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isEditingClub, setIsEditingClub] = useState(false);
    const [editedClubName, setEditedClubName] = useState(club?.name || '');
    const [editedBannerUrl, setEditedBannerUrl] = useState(club?.bannerUrl || '');
    const [editedLogoUrl, setEditedLogoUrl] = useState(club?.logoUrl || '');
    const bannerInputRef = useRef(null);
    const logoInputRef = useRef(null);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [descriptionText, setDescriptionText] = useState('');
    const maxDescriptionLength = 1500;

    useEffect(() => {
        if (club) {
            setDescriptionText(club.description || '');
        }
    }, [club]);

    const toggleMembersPanel = () => {
        if (showMembersPanel) {
            handleClosePanel();
        } else {
            setShowMembersPanel(true);
        }
    };

    const handleClosePanel = () => {
        setOverlayHiding(true);
        setHidingExit(true);
        setHidingPanel(true);
        setTimeout(() => {
            setShowMembersPanel(false);
            setOverlayHiding(false);
            setHidingExit(false);
            setHidingPanel(false);
        }, 300);
    };

    const handleLogoClick = () => navigate('/club-directory');
    const handleClubsClick = () => navigate('/club-directory');
    const handleEventsClick = () => navigate('/event-directory');
    const handleActivityClick = () => navigate('/my-activity');
    const handleProfileClick = () => navigate('/profile');
    const handleCalendarClick = () => navigate('/calendar');
    const handleEventCreationClick = () => {
        window.open('/creation-event/', '_blank');
    };
    const handleManageRolesClick = () => {
        window.open('/manage-roles/' + encodeURIComponent(clubName), '_blank');
    };

    const getInitials = (fullName) => {
        const names = fullName.trim().split(' ');
        return names[0]?.charAt(0).toUpperCase() + (names[1]?.charAt(0).toUpperCase() || '');
    };

    const splitLeaderName = (fullName) => {
        const names = fullName.trim().split(' ');
        if (names.length === 0) return { firstName: '', lastName: '' };
        if (names.length === 1) return { firstName: names[0], lastName: '' };
        return { firstName: names[0], lastName: names[names.length - 1] };
    };

    const createGradientFromPalette = (palette, stopCount = 5) => {
        const colors = palette.map((rgb) => `rgb(${rgb.join(',')})`);
        const scale = chroma.scale(colors).mode('lab').colors(stopCount);
        return `linear-gradient(to right, ${scale.join(', ')})`;
    };

    useEffect(() => {
        setShowSearchResults(false);
    }, [searchTerm]);

    useEffect(() => {
        const selectedClub = mockClubs.find(
            (c) => c.name.toLowerCase() === decodeURIComponent(clubName).toLowerCase()
        );

        if (!selectedClub) {
            setClub(null);
            setLoading(false);
            return;
        }

        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = selectedClub.bannerUrl;

        img.onload = () => {
            const colorThief = new ColorThief();
            try {
                const palette = colorThief.getPalette(img, 3);
                const gradientFromPalette = createGradientFromPalette(palette, 5);
                const rgb = colorThief.getColor(img);
                const darkColor = chroma(rgb[0], rgb[1], rgb[2]).desaturate(0.4).darken(2).css();
                const darkGradient = `linear-gradient(to top, ${darkColor}, transparent)`;

                selectedClub.bannerColor = gradientFromPalette;
                selectedClub.bannerGradient = darkGradient;
                selectedClub.darkColor = darkColor;
            } catch {
                selectedClub.bannerColor = '#888888';
                selectedClub.bannerGradient = 'linear-gradient(to top, #000000, transparent)';
                selectedClub.darkColor = '#000000';
            }

            selectedClub.members = mockClubMembers[selectedClub.name] || [];
            setClub(selectedClub);
            setEditedClubName(selectedClub.name);
            setEditedBannerUrl(selectedClub.bannerUrl);
            setEditedLogoUrl(selectedClub.logoUrl);
            setLoading(false);
        };

        img.onerror = () => {
            selectedClub.bannerColor = '#888888';
            setClub(selectedClub);
            setLoading(false);
        };
    }, [clubName]);

    if (loading) return <div>Loading...</div>;
    if (!club) return <div>Club not found.</div>;

    const isClubLeader = currentStudentID === club.leaderId;
    const isGuest = localStorage.getItem('isGuest') === 'true';

    return (
        <div className="club-page">
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
                        onClick={() => navigate(isGuest ? '/login' : '/profile')}
                        style={{ cursor: 'pointer', fontSize: isGuest ? '14px' : '24px' }}
                    >
                        {isGuest ? 'LOGIN' : getInitials(studentName || 'John BROWN')}
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

            {/* Club Banner */}
            <div className="club-banner-wrapper" style={{ background: club.bannerColor }}>
                <div className="club-banner">
                    <img
                        src={isEditingClub ? editedBannerUrl : club.bannerUrl}
                        alt="Club Banner"
                        className="club-banner-img"
                        onClick={() => isEditingClub && bannerInputRef.current?.click()}
                        style={{ cursor: isEditingClub ? 'pointer' : 'default' }}
                    />
                    <div className="banner-overlay" style={{ background: club.bannerGradient }}></div>
                    <div className="club-banner-content">
                        <div className="club-banner-left">
                            {isClubLeader && (
                                <div className="delete-club-info">
                                    <img
                                        src={deleteIcon}
                                        alt="Delete Club"
                                        className="delete-club-icon"
                                        onClick={() => setShowDeletePopup(true)}
                                    />
                                    <div className="delete-club-title">Delete Club</div>
                                </div>
                            )}

                            {showDeletePopup && (
                                <div className="delete-popup-overlay">
                                    <div className="delete-popup-box">
                                        <div className="delete-popup-header">
                                            <span className="delete-popup-title">Are you sure you want to delete this club?</span>
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
                                                        navigate('/club-directory');
                                                    }
                                                }}
                                            >
                                                Delete Club
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {!isClubLeader && (
                                <div
                                    className="club-collaboration-info"
                                    style={isGuest ? { opacity: 0.4, cursor: 'not-allowed' } : {}}
                                    onClick={!isGuest ? () => setSidebarOpen(true) : undefined}
                                >
                                    <img src={collaborationIcon} alt="Collab" className="collaboration-icon" />
                                    <div className="club-collaboration-title">Collaboration</div>
                                </div>
                            )}
                        </div>

                        <div className="club-banner-right">
                            <div className="club-leader-info">
                                <img
                                    src={club.leaderPhoto || defaultLeaderPic}
                                    alt="Leader"
                                    className="leader-photo"
                                />
                                <div className="club-leader-name">
                                    {(() => {
                                        const { firstName, lastName } = splitLeaderName(club.leaderName);
                                        return (
                                            <>
                                                <div className="leader-firstname">{firstName}</div>
                                                <div className="leader-surname">{lastName}</div>
                                            </>
                                        );
                                    })()}
                                </div>
                            </div>
                            <div className="club-members-info" onClick={toggleMembersPanel}>
                                <img src={membersIcon} alt="Members" className="members-icon" />
                                <div className="club-members-title">Members</div>
                            </div>
                        </div>

                        <div className="club-banner-center">
                            <img
                                src={isEditingClub ? editedLogoUrl : club.logoUrl}
                                alt="Club Logo"
                                className="club-logo"
                                onClick={() => isEditingClub && logoInputRef.current?.click()}
                                style={{
                                    boxShadow: `0px 4px 10px ${club.darkColor}`,
                                    cursor: isEditingClub ? 'pointer' : 'default'
                                }}
                            />
                            {isEditingClub ? (
                                <input
                                    className="edit-club-name-input"
                                    value={editedClubName}
                                    onChange={(e) => setEditedClubName(e.target.value)}
                                />
                            ) : (
                                <h1 className="club-page-name" style={{ textShadow: `2px 2px 4px ${club.darkColor}` }}>
                                    {club.name}
                                </h1>
                            )}
                        </div>
                        {isClubLeader ? (
                            isEditingClub ? (
                                <div className="club-edit-buttons">
                                    <button
                                        className="save-edit"
                                        onClick={() => {
                                            club.name = editedClubName;
                                            club.logoUrl = editedLogoUrl;
                                            club.bannerUrl = editedBannerUrl;
                                            setIsEditingClub(false);
                                        }}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="cancel-edit"
                                        onClick={() => {
                                            setEditedClubName(club.name);
                                            setEditedLogoUrl(club.logoUrl);
                                            setEditedBannerUrl(club.bannerUrl);
                                            setIsEditingClub(false);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="change-club-banner-button"
                                        onClick={() => bannerInputRef.current?.click()}
                                    >
                                        Change Banner
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className="edit-club-button"
                                    onClick={() => setIsEditingClub(true)}
                                    style={{ boxShadow: `0px 2px 8px ${club.darkColor}` }}
                                >
                                    Edit
                                </button>
                            )
                        ) : (
                            <button
                                className="join-button"
                                onClick={() => setJoined((prev) => !prev)}
                                style={{
                                    boxShadow: `0px 2px 8px ${club.darkColor}`,
                                    background: joined ? '#CF2424' : '#2074AC',
                                }}
                            >
                                {joined ? 'Leave' : 'Join'}
                            </button>
                        )}
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        ref={bannerInputRef}
                        style={{ display: 'none' }}
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => setEditedBannerUrl(reader.result);
                                reader.readAsDataURL(file);
                            }
                        }}
                    />

                    <input
                        type="file"
                        accept="image/*"
                        ref={logoInputRef}
                        style={{ display: 'none' }}
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => setEditedLogoUrl(reader.result);
                                reader.readAsDataURL(file);
                            }
                        }}
                    />
                </div>
            </div>

            {/* Description & Events */}
            <div className="club-details">
                <div className="club-description-container">
                    <div className="club-description-header">
                        <div className="club-description-title">Description</div>
                        {isClubLeader && (
                            <button
                                className="edit-club-description"
                                onClick={() => setIsEditingDescription(true)}
                            >
                                <img src={editIcon} alt="Edit" />
                            </button>
                        )}
                    </div>
                    <div className="club-description">
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
                                        className={`description-char-counter ${descriptionText.length === maxDescriptionLength ? 'red' : ''}`}
                                    >
                                        {descriptionText.length}/{maxDescriptionLength}
                                    </div>
                                </div>
                                <div className="edit-description-controls">
                                    <button
                                        className="save-description-button"
                                        onClick={() => {
                                            club.description = descriptionText;
                                            setIsEditingDescription(false);
                                        }}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="cancel-description-button"
                                        onClick={() => {
                                            setDescriptionText(club.description);
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

                <div className="club-events">
                    <div className="club-event-container">
                        <div className="club-event-header">
                            <div className="club-event-title">Events</div>
                            {isClubLeader && (
                                <button className="create-event-button" onClick={handleEventCreationClick}>
                                    <span className="plus-icon">+</span>
                                </button>
                            )}
                        </div>
                        {club.events && club.events.length > 0 ? (
                            <div className="club-events-grid">
                                {club.events.map((event) => (
                                    <div
                                        key={event.id}
                                        className="club-event-card-wrapper"
                                        onClick={() => navigate(`/event/${encodeURIComponent(event.title)}`)}
                                    >
                                        <div className="club-event-card">
                                            <img
                                                src={event.bannerUrl}
                                                alt={event.name}
                                                className="club-event-card-banner"
                                            />
                                            <div className="club-event-card-content">
                                                <div className="club-event-card-name">{event.title}</div>
                                                <div className="club-event-card-description">{event.description}</div>
                                                <div className="club-spacer"></div>
                                                <div className="club-event-card-meta">
                                                    Date: {event.date} | Time: {event.time} | Place: {event.place}, {event.unit}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="club-error-text">No upcoming events.</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Members Panel */}
            {showMembersPanel && (
                <>
                    <div className={`overlay ${overlayHiding ? 'hide' : ''}`} onClick={toggleMembersPanel}></div>
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
                                    <h2 className="members-title">Members</h2>
                                </div>
                                <div className="members-header-center">
                                    <span className="total-members">Total: {club.members?.length || 0}</span>
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
                                            onClick={() => {
                                                setSearchQuery(searchTerm.trim());
                                                setShowSearchResults(true);
                                            }}
                                        >
                                            SEARCH
                                        </button>
                                    </div>
                                </div>
                                {isClubLeader && (
                                    <div className="members-header-right">
                                        <button className="manage-roles" onClick={handleManageRolesClick}>
                                            Manage Roles +
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="members-panel-header-border"></div>
                            <div className="members-body">
                                {(!searchQuery || club.leaderName.toLowerCase().includes(searchQuery.toLowerCase())) && (
                                    <div className="role-section">
                                        <div className="role-title">Leader</div>
                                        <div className="person-card">
                                            <div className="person-icon">{getInitials(club.leaderName)}</div>
                                            <div className="person-info">
                                                <div className="person-name">{club.leaderName}</div>
                                                <div className="person-id">234608</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {club.roles &&
                                    club.roles.map((role) => {
                                        const member = role.assignedMember;
                                        if (!member) return null;
                                        const match =
                                            member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            member.id.toLowerCase().includes(searchQuery.toLowerCase());
                                        if (searchQuery && !match) return null;
                                        return (
                                            <div key={role.id} className="role-section">
                                                <div className="role-title">{role.name}</div>
                                                <div className="person-card">
                                                    <div className="person-icon">{getInitials(member.name)}</div>
                                                    <div className="person-info">
                                                        <div className="person-name">{member.name}</div>
                                                        <div className="person-id">{member.id}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                {club.members
                                    .filter((m) => {
                                        const isAssigned = club.roles?.some((r) => r.assignedMember?.id === m.id);
                                        const isLeader = club.leaderName.toLowerCase() === m.name.toLowerCase();
                                        const match =
                                            m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            m.id.toLowerCase().includes(searchQuery.toLowerCase());
                                        return !isAssigned && !isLeader && (!searchQuery || match);
                                    })
                                    .length > 0 && (
                                        <div className="role-section">
                                            <div className="role-title">Members</div>
                                            {club.members
                                                .filter((m) => {
                                                    const isAssigned = club.roles?.some((r) => r.assignedMember?.id === m.id);
                                                    const isLeader = club.leaderName.toLowerCase() === m.name.toLowerCase();
                                                    const match =
                                                        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                        m.id.toLowerCase().includes(searchQuery.toLowerCase());
                                                    return !isAssigned && !isLeader && (!searchQuery || match);
                                                })
                                                .map((m, idx) => (
                                                    <div className="person-card" key={idx}>
                                                        <div className="person-icon">{getInitials(m.name)}</div>
                                                        <div className="person-info">
                                                            <div className="person-name">{m.name}</div>
                                                            <div className="person-id">{m.id}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                </>
            )}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </div>
    );
};

export default Club;