import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './Club.css';
import logo from '../../assets/logo.png';
import calendar from '../../assets/calendar.png';
import collaborationIcon from '../../assets/collaboration.png';
import membersIcon from '../../assets/members.png';
import Sidebar from '../CollabSidebar/Sidebar';

// Reusable component for displaying a member category
const MemberCategorySection = ({ title, members, searchQuery, getInitials }) => {
    if (!members || members.length === 0) return null;

    return (
        <>
            <div className="member-category">{title}</div>
            {members
                .filter(m => !searchQuery || 
                    (m.full_name && m.full_name.toLowerCase().includes(searchQuery.toLowerCase())) || 
                    (m.studentid && String(m.studentid).includes(searchQuery)))
                .map((m, idx) => (
                    <div className="person-card" key={`${title.toLowerCase()}-${idx}`}>
                        <div
                            className="person-icon"
                            style={{
                                backgroundImage: m.profile_picture ? `url(${m.profile_picture})` : 'none',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {!m.profile_picture && getInitials(m.full_name || '?')}
                        </div>
                        <div className="person-info">
                            <div className="person-name">{m.full_name || 'Unknown'}</div>
                            <div className="person-id">{m.studentid || m.student_id || 'No ID'}</div>
                        </div>
                    </div>
                ))}
        </>
    );
};

const Club = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { club_id } = useParams();

    // State variables
    const [club, setClub] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [joined, setJoined] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profilePicture, setProfilePicture] = useState('');
    const [studentName, setStudentName] = useState('');
    const [showMembersPanel, setShowMembersPanel] = useState(false);
    const [members, setMembers] = useState([]);
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [overlayHiding, setOverlayHiding] = useState(false);
    const [hidingExit, setHidingExit] = useState(false);
    const [hidingPanel, setHidingPanel] = useState(false);
    const [collabSidebarOpen, setCollabSidebarOpen] = useState(false);
    const [presidentEmail, setPresidentEmail] = useState('');

    const isGuest = localStorage.getItem('isGuest') === 'true';

    // Fetch user profile
    useEffect(() => {
        const profile = JSON.parse(localStorage.getItem('profile'));
        if (profile) {
            setStudentName(profile.full_name || 'Unknown Student');
            setProfilePicture(profile.profile_picture || '');
        }
    }, []);

    // Fetch club details
    useEffect(() => {
        const fetchClubDetails = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await fetch(`http://18.141.193.54:8000/clubs/clubs/${club_id}/`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Club API Response:', data);
                    setClub(data);
                    if (data.president && data.president.email) {
                        setPresidentEmail(data.president.email);
                    }
                } else {
                    setError('Failed to fetch club details.');
                }
            } catch (err) {
                console.error('Error fetching club details:', err);
                setError('An error occurred while fetching club details.');
            } finally {
                setLoading(false);
            }
        };

        fetchClubDetails();
    }, [club_id, navigate]);

    // Fetch events created by the club
    useEffect(() => {
        const fetchClubEvents = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await fetch(`http://18.141.193.54:8000/api/event/add_event/?club_id=${club_id}`, {
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
                setEvents(data);
            } catch (error) {
                console.error("Error fetching club events:", error);
                setError("Failed to load club events.");
            }
        };
    
        if (club_id) {
            fetchClubEvents();
        }
    }, [club_id]);

    // Update the fetchClubMembers function
    const fetchClubMembers = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`http://18.141.193.54:8000/clubs/clubs/${club_id}/members/`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Members API Response:', data);
                
                // Process the data
                let membersArray = [];
                if (data.results) {
                    membersArray = data.results;
                } else if (Array.isArray(data)) {
                    membersArray = data;
                } else if (typeof data === 'object') {
                    membersArray = [data];
                }
                
                setMembers(membersArray);
            } else {
                const errorText = await response.text();
                console.error('Failed to fetch club members. Status:', response.status, 'Error:', errorText);
                
                // For testing: Add mock data if API fails
                const mockMembers = [
                    { full_name: 'Hans Hartowidjojo', studentid: '21449723', position: 'President' },
                    { full_name: 'Emily Johnson', studentid: '234609', position: 'Treasurer' },
                    { full_name: 'Emily Johnson', studentid: '234609', position: 'Event Coordinator' },
                    { full_name: 'Benjamin Smith', studentid: '234608', position: 'Member' },
                    { full_name: 'Lucas Brown', studentid: '234610', position: 'Member' },
                    { full_name: 'Dummy1 User', studentid: '21100001', position: 'Member' }
                ];
                setMembers(mockMembers);
            }
        } catch (err) {
            console.error('Error fetching club members:', err);
            setMembers([]);
        }
    };

    // Group members by position
    const getMembersByPosition = (position) => {
        return members.filter(m => 
            (m.position === position) || 
            (m.role === position) || 
            (position === 'Member' && (!m.position && !m.role))
        );
    };

    const openCollabSidebar = () => {
        if (club && club.president && club.president.email) {
            setPresidentEmail(club.president.email);
            setCollabSidebarOpen(true);
        } else {
            console.error('President email not found.');
        }
    };

    const closeCollabSidebar = () => {
        setCollabSidebarOpen(false);
    };

    const toggleMembersPanel = () => {
        if (showMembersPanel) {
            handleClosePanel();
        } else {
            fetchClubMembers();
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

    const getInitials = (fullName) => {
        const names = fullName.trim().split(' ');
        return names[0]?.charAt(0).toUpperCase() + (names[1]?.charAt(0).toUpperCase() || '');
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-text">{error}</div>;
    if (!club) return <div>Club not found.</div>;

    return (
        <div className="club-page">
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

            {/* Club Banner with Enhanced Structure */}
            <div 
                className="club-banner-wrapper"
                style={{
                    background: club.shadow_color ? 
                        `linear-gradient(to top, rgb(${club.shadow_color.join(',')}), transparent)` : 
                        'transparent',
                }}
            >
                <div className="club-banner">
                    <div 
                        className="banner-shadow"
                        style={{
                            background: club.shadow_color ? 
                                `linear-gradient(to top, rgb(${club.shadow_color.join(',')}), transparent)` : 
                                'transparent',
                        }}
                    ></div>
                    <img src={club.banner} alt="Club Banner" className="club-banner-img" />
                    <div className="club-banner-content">
                        <div className="club-banner-left">
                            <div className="club-collaboration-info" onClick={openCollabSidebar}>
                                <img src={collaborationIcon} alt="Collaboration Icon" className="collaboration-icon" />
                                <div className="club-collaboration-title">Collaboration</div>
                            </div>
                        </div>
                        <div className="club-banner-center">
                            <img
                                src={club.logo}
                                alt="Club Logo"
                                className="club-logo"
                                style={{
                                    boxShadow: club.shadow_color ? 
                                        `0px 4px 10px rgb(${club.shadow_color.join(',')})` : 
                                        'none',
                                }}
                            />
                            <h1 
                                className="club-page-name"
                                style={{
                                    textShadow: club.shadow_color ? 
                                        `2px 2px 4px rgb(${club.shadow_color.join(',')})` : 
                                        'none',
                                }}
                            >
                                {club.name}
                            </h1>
                            <button
                                className="join-button"
                                onClick={() => setJoined((prev) => !prev)}
                                style={{
                                    background: joined ? '#CF2424' : '#2074AC',
                                }}
                            >
                                {joined ? 'Leave' : 'Join'}
                            </button>
                        </div>
                        <div className="club-banner-right">
                            <div className="club-leader-info">
                                <img
                                    src={club.president?.profile_picture}
                                    alt="Leader"
                                    className="leader-photo"
                                    onClick={() => club.president?.id && navigate(`/profile/students/${club.president.id}`)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <div className="club-leader-name">
                                    <div className="leader-fullname">{club.president?.full_name}</div>
                                </div>
                            </div>
                            <div className="club-members-info" onClick={toggleMembersPanel}>
                                <img src={membersIcon} alt="Members Icon" className="members-icon" />
                                <div className="club-members-title">{club.members?.length || 0} Members</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

                        {/* Add this NEW container for Description & Events */}
                        <div className="club-details">
                {/* Description Section */}
                <div className="club-description-container">
                    <div className="club-description-header">
                        <div className="club-description-title">Description</div>
                    </div>
                    <div className="club-description">
                        {club.description ? (
                            club.description.split('\n').map((line, index) => <p key={index}>{line}</p>)
                        ) : (
                            <p>No description available.</p>
                        )}
                    </div>
                </div>

            {/* Events Section */}
            <div className="club-events-container">
                <div className="club-events-header">
                    <div className="club-events-title">Events</div>
                </div>
                
                {events.length > 0 ? (
                    <div className="club-events-grid">
                        {events.map((event) => (
                            <div
                                key={event.id}
                                className="club-event-card-wrapper"
                                onClick={() => navigate(`/event/${encodeURIComponent(event.name)}`)}
                            >
                                <div className="club-event-card">
                                    <img
                                        src={event.banner}
                                        alt={event.name}
                                        className="club-event-card-banner"
                                    />
                                    <div className="club-event-card-content">
                                        <div className="club-event-card-name">{event.name}</div>
                                        <div className="club-event-card-description">{event.description}</div>
                                        <div className="club-spacer"></div>
                                        <div className="club-event-card-meta">
                                            Date: {event.date} | Time: {event.time} | Place: {event.location}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-events-message">No events created by this club yet.</p>
                )}
            </div>

            {/* Members Panel */}
            {showMembersPanel && (
                <>
                    <div className={`overlay ${overlayHiding ? 'hide' : ''}`} onClick={toggleMembersPanel}></div>
                    <div className={`members-panel ${hidingPanel ? 'slide-out' : 'slide-in'}`}>
                        <div className={`exit-button ${hidingExit ? 'hide' : ''}`} onClick={handleClosePanel}>✖</div>
                        <div className="members-panel-content">
                            <div className="members-panel-header">
                                <h2 className="members-title">Members</h2>
                                <span className="total-members">Total: {members.length}</span>
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
                            <div className="members-body">
                                <MemberCategorySection
                                    title="Leader"
                                    members={getMembersByPosition('President')}
                                    searchQuery={searchQuery}
                                    getInitials={getInitials}
                                />
                                <MemberCategorySection
                                    title="Treasurer"
                                    members={getMembersByPosition('Treasurer')}
                                    searchQuery={searchQuery}
                                    getInitials={getInitials}
                                />
                                <MemberCategorySection
                                    title="Event Coordinator"
                                    members={getMembersByPosition('Event Coordinator')}
                                    searchQuery={searchQuery}
                                    getInitials={getInitials}
                                />
                                <MemberCategorySection
                                    title="Members"
                                    members={getMembersByPosition('Member')}
                                    searchQuery={searchQuery}
                                    getInitials={getInitials}
                                />
                                <MemberCategorySection
                                    title="Other Roles"
                                    members={members.filter(m =>
                                        m.position !== 'President' &&
                                        m.position !== 'Treasurer' &&
                                        m.position !== 'Event Coordinator' &&
                                        m.position !== 'Member' &&
                                        m.role !== 'President' &&
                                        m.role !== 'Treasurer' &&
                                        m.role !== 'Event Coordinator' &&
                                        m.role !== 'Member'
                                    )}
                                    searchQuery={searchQuery}
                                    getInitials={getInitials}
                                />
                                {members.filter(m => !searchQuery ||
                                    (m.full_name && m.full_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                                    (m.studentid && String(m.studentid).includes(searchQuery))
                                ).length === 0 && (
                                    <div className="no-results">No members found matching your search.</div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}

                {/* Sidebar */}
                <Sidebar
                    isOpen={collabSidebarOpen}
                    onClose={closeCollabSidebar}
                    presidentEmail={presidentEmail}
                />
            </div>
        </div>
    );
};

export default Club;