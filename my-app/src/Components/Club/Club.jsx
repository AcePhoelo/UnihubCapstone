import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './Club.css';
import logo from '../../assets/logo.png';
import calendar from '../../assets/calendar.png';
import collaborationIcon from '../../assets/collaboration.png';
import membersIcon from '../../assets/members.png';
import editIcon from '../../assets/edit.png'; // Add this import
import Exit from '../../assets/Exit.png'; // Add this import
import deleteIcon from '../../assets/delete.png'; // Add this import
import Sidebar from '../CollabSidebar/Sidebar';

// Reusable component for displaying a member category

const MemberCategorySection = ({ title, members, searchQuery, getInitials }) => {
    if (!members || members.length === 0) return null;

    return (
        <>
            <div className="role-title">{title}</div>
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
    // Add this to your state variables at the top of the Club component
    const [clubRoles, setClubRoles] = useState([]);
    const [error, setError] = useState(null);
    const [isUserMember, setIsUserMember] = useState(false);
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
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [descriptionText, setDescriptionText] = useState('');
    // Add these state variables
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedClubName, setEditedClubName] = useState('');
    const [newLogo, setNewLogo] = useState(null);
    const [newBanner, setNewBanner] = useState(null);
    const logoInputRef = useRef(null);
    const bannerInputRef = useRef(null);
    const maxDescriptionLength = 1500;
    
    const isGuest = localStorage.getItem('isGuest') === 'true';
    
    // Check if the logged-in user is the club president
    const [isClubPresident, setIsClubPresident] = useState(false);

    const navigateToProfile = (user) => {
        if (!user?.id) {
            navigate('/error', { 
                state: { 
                    errorCode: '404',
                    errorMessage: 'Profile Not Found',
                    errorDetails: 'The requested profile information is not available.'
                }
            });
        } else {
            navigate(`/profile/students/${user.id}`);
        }
    };
    
    // Update description text when club changes
    useEffect(() => {
        if (club) {
            setDescriptionText(club.description || '');
            setEditedClubName(club.name || '');
        }
    }, [club]);

    // Update the membership check in fetchClubDetails
    const fetchClubDetails = async () => {
        try {
            const token = localStorage.getItem('access_token');
            
            const response = await fetch(`https://54.169.81.75:8000/clubs/clubs/${club_id}/`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Error status: ${response.status}, Details:`, errorText);
                throw new Error(`Server returned ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Club API Response:', data);
            setClub(data);
            if (data.president && data.president.email) {
                setPresidentEmail(data.president.email);
            }

            // Check if the user is the club president
            const profile = JSON.parse(localStorage.getItem('profile'));
            if (profile && data.president) {
                setIsClubPresident(profile.studentid === data.president.studentid);
            }

            // Check if the user is a member
            if (profile && profile.studentid) {
                console.log('Members data structure:', data.members);
                
                const isMember = data.members.some(member => {
                    if (member.studentid && member.studentid === profile.studentid) {
                        return true;
                    }
                    
                    if (member.student && member.student.studentid === profile.studentid) {
                        return true;
                    }
                    
                    if (member.student_id && member.student_id === profile.studentid) {
                        return true;
                    }
                    
                    return false;
                });
                
                console.log(`User ${profile.studentid} membership status:`, isMember);
                setIsUserMember(isMember);
                localStorage.setItem(`club_member_${club_id}`, isMember ? 'true' : 'false');
            }
        } catch (err) {
            console.error('Error fetching club details:', err);
            setError(`Failed to load club: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };
    
    // Fetch user profile
    useEffect(() => {
        const profile = JSON.parse(localStorage.getItem('profile'));
        if (profile) {
            setStudentName(profile.full_name || 'Unknown Student');
            setProfilePicture(profile.profile_picture || '');
        }
    }, []);
    
    // Fetch events created by the club
    useEffect(() => {
        const fetchClubEvents = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await fetch(`https://54.169.81.75:8000/api/event/add_event/?club_id=${club_id}`, {
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

    useEffect(() => {
        const cachedMembership = localStorage.getItem(`club_member_${club_id}`);
        if (cachedMembership === 'true' || cachedMembership === 'false') {
            setIsUserMember(cachedMembership === 'true');
        }
        
        fetchClubDetails();
    }, [club_id]);

    const fetchClubMembers = async () => {
        try {
            const token = localStorage.getItem('access_token');
            
            // Fetch members
            const membersResponse = await fetch(`https://54.169.81.75:8000/clubs/clubs/${club_id}/members/`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
    
            if (membersResponse.ok) {
                const membersData = await membersResponse.json();
                const processedMembers = (membersData.results || []).map(member => ({
                    full_name: member.full_name || 
                            (member.student && member.student.full_name) || 
                            member.name || 
                            'Unknown',
                    
                    studentid: member.studentid || 
                            (member.student && member.student.studentid) || 
                            member.studentid || 
                            'No ID',
                    
                    position: member.position || 'Member',
                    custom_position: member.custom_position || '',
                    
                    profile_picture: member.profile_picture || 
                                    (member.student && member.student.profile_picture) || 
                                    null
                }));
                setMembers(processedMembers);
            }
            
            // Fetch roles (including custom ones)
            const rolesResponse = await fetch(`https://54.169.81.75:8000/clubs/clubs/${club_id}/roles/`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            
            if (rolesResponse.ok) {
                const rolesData = await rolesResponse.json();
                setClubRoles(rolesData.roles || []);
            }
            
        } catch (err) {
            console.error('Error fetching club data:', err);
        }
    };

    // Join a club
    const joinClub = async () => {
        if (isGuest) {
            navigate('/login');
            return;
        }

        try {
            const token = localStorage.getItem('access_token');
            const profile = JSON.parse(localStorage.getItem('profile'));

            if (!profile || !profile.studentid) {
                console.error('Student ID not found in profile');
                return;
            }

            const joinButton = document.querySelector('.join-button');
            if (joinButton) {
                joinButton.disabled = true;
                joinButton.textContent = 'Joining...';
            }

            const response = await fetch(`https://54.169.81.75:8000/clubs/clubs/${club_id}/members/add/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    student_id: profile.studentid,
                    position: 'Member',
                }),
            });

            if (response.ok) {
                setIsUserMember(true);
                localStorage.setItem(`club_member_${club_id}`, 'true');
                
                if (club && club.members) {
                    const updatedMembers = [...club.members];
                    updatedMembers.push({
                        studentid: profile.studentid,
                        full_name: profile.full_name,
                        position: 'Member' || 'Executive Committee',
                        profile_picture: profile.profile_picture,
                    });
                    setClub({
                        ...club,
                        members: updatedMembers
                    });
                }
                
                if (showMembersPanel) {
                    fetchClubMembers();
                }
            } else {
                console.error('Failed to join club.');
            }
        } catch (err) {
            console.error('Error joining club:', err);
        } finally {
            const joinButton = document.querySelector('.join-button');
            if (joinButton) {
                joinButton.disabled = false;
                joinButton.textContent = 'Leave';
            }
        }
    };

    // Leave a club
    const leaveClub = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const profile = JSON.parse(localStorage.getItem('profile'));

            if (!profile || !profile.studentid) {
                console.error('Student ID not found in profile');
                return;
            }

            const leaveButton = document.querySelector('.join-button');
            if (leaveButton) {
                leaveButton.disabled = true;
                leaveButton.textContent = 'Leaving...';
            }

            const response = await fetch(`https://54.169.81.75:8000/clubs/clubs/${club_id}/members/${profile.studentid}/remove/`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            console.log('Leave club response status:', response.status);
            
            setIsUserMember(false);
            localStorage.setItem(`club_member_${club_id}`, 'false');

            window.location.reload();
            
        } catch (err) {
            console.error('Error leaving club:', err);
            window.location.reload();
        }
    };

    const toggleMembersPanel = () => {
        if (showMembersPanel) {
            handleClosePanel();
        } else {
            fetchClubMembers();
            setShowMembersPanel(true);
        }
    };

        // Handle logo change
    const handleLogoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setNewLogo(e.target.files[0]);
        }
    };

    // Handle banner change
    const handleBannerChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setNewBanner(e.target.files[0]);
        }
    };

    // Handle save changes
    const handleSaveChanges = async () => {
        try {
            const token = localStorage.getItem('access_token');
            
            const formData = new FormData();
            formData.append('name', editedClubName);
            formData.append('description', descriptionText);
            
            if (newLogo) {
                formData.append('logo', newLogo);
            }
            
            if (newBanner) {
                formData.append('banner', newBanner);
            }
            
            const response = await fetch(`https://54.169.81.75:8000/clubs/clubs/${club_id}/update/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            
            if (response.ok) {
                const updatedClub = await response.json();
                setClub(updatedClub.club);
                setIsEditMode(false);
                setNewLogo(null);
                setNewBanner(null);
            } else {
                console.error('Failed to update club');
            }
        } catch (err) {
            console.error('Error updating club:', err);
        }
    };

    // Handle cancel edit
    const handleCancelEdit = () => {
        setIsEditMode(false);
        setEditedClubName(club.name || '');
        setDescriptionText(club.description || '');
        setNewLogo(null);
        setNewBanner(null);
    };
    
    // Handle closing the members panel with animation
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

    const handleDeleteClub = async () => {
        if (!window.confirm('Are you sure you want to delete this club? This action cannot be undone.')) {
            return;
        }
        
        try {
            const token = localStorage.getItem('access_token');
            
            const response = await fetch(`https://54.169.81.75:8000/clubs/clubs/${club_id}/delete/`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                alert('Club deleted successfully');
                navigate('/club-directory');
            } else {
                const errorData = await response.json().catch(() => ({ error: 'Failed to delete club' }));
                console.error('Failed to delete club:', errorData);
                alert(`Failed to delete club: ${errorData.error || 'Unknown error'}`);
            }
        } catch (err) {
            console.error('Error deleting club:', err);
            alert('Error deleting club');
        }
    };
    
    // Handle event creation click
    const handleEventCreationClick = () => {
        window.open('/creation-event/', '_blank');
    };
    
    // Handle manage roles click
    const handleManageRolesClick = () => {
        window.open(`/manage-roles/${club_id}`, '_blank');
    };

    const getInitials = (fullName) => {
        const names = fullName.trim().split(' ');
        return names[0]?.charAt(0).toUpperCase() + (names[1]?.charAt(0).toUpperCase() || '');
    };
    
    const updateClubDescription = async () => {
        try {
            const token = localStorage.getItem('access_token');
            
            const response = await fetch(`https://54.169.81.75:8000/clubs/clubs/${club_id}/update/`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    description: descriptionText
                }),
            });

            if (response.ok) {
                setClub({
                    ...club,
                    description: descriptionText
                });
                setIsEditingDescription(false);
            } else {
                console.error('Failed to update description');
            }
        } catch (err) {
            console.error('Error updating description:', err);
        }
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
                        style={{ color: location.pathname.includes('/club/') ? '#000000' : '#999999' }}
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

            {/* Club Banner */}
            <div 
                className="club-banner-wrapper"
                style={{
                    background: club.banner
                        ? `linear-gradient(to bottom, rgb(${club.dominant_color?.join(',')}), rgb(${club.shadow_color?.join(',')}))`
                        : 'linear-gradient(to bottom, #000000, #333333)',
                }}
            >
                <div className="club-banner">
                    {club.banner && (
                        <img
                            src={club.banner}
                            alt="Club Banner"
                            className="club-banner-img"
                        />
                    )}
                    <div className="banner-overlay" style={{ 
                        background: club.banner 
                            ? 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'
                            : 'transparent' 
                    }}></div>
                    <div className="club-banner-content">
                        <div className="club-banner-left">
                        {isClubPresident ? (
                            <div className="club-delete-info" onClick={() => handleDeleteClub()}>
                                <img src={deleteIcon} alt="Delete Icon" className="delete-icon" />
                                <div className="club-delete-title">Delete Club</div>
                            </div>
                        ) : (
                            <div className="club-collaboration-info" onClick={() => setCollabSidebarOpen(true)}>
                                <img src={collaborationIcon} alt="Collaboration Icon" className="collaboration-icon" />
                                <div className="club-collaboration-title">Collaboration</div>
                            </div>
                        )}
                        </div>
                        <div className="club-banner-center">
                            {/* Club Logo */}
                            <img
                                src={club.logo}
                                alt="Club Logo"
                                className="club-logo"
                                onClick={isEditMode ? () => logoInputRef.current.click() : undefined}
                                style={isEditMode ? { cursor: 'pointer', border: '2px dashed white' } : {}}
                            />

                            {/* Club Title */}
                            {isEditMode ? (
                                <input
                                    type="text"
                                    value={editedClubName}
                                    onChange={(e) => setEditedClubName(e.target.value)}
                                    className="edit-club-name-input"
                                />
                            ) : (
                                <h1 className="club-page-name">{club.name}</h1>
                            )}

                            {/* Buttons */}
                            {isEditMode ? (
                                <div className="club-banner-buttons">
                                    <button className="club-banner-button save-edit" onClick={handleSaveChanges}>
                                        Save
                                    </button>
                                    <button className="club-banner-button cancel-edit" onClick={handleCancelEdit}>
                                        Cancel
                                    </button>
                                    <button
                                        className="club-banner-button change-club-banner-button"
                                        onClick={() => bannerInputRef.current.click()}
                                    >
                                        Change Banner
                                    </button>
                                </div>
                            ) : (
                                <div className="club-banner-buttons">
                                    {isClubPresident && (
                                        <button
                                            className="club-banner-button edit-club-button"
                                            onClick={() => setIsEditMode(true)}
                                        >
                                            Edit
                                        </button>
                                    )}
                                    <button
                                        className="club-banner-button join-button"
                                        onClick={isUserMember ? leaveClub : joinClub}
                                        style={{
                                            background: isUserMember ? '#CF2424' : '#2074AC',
                                        }}
                                    >
                                        {isUserMember ? 'Leave' : 'Join'}
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="club-banner-right">
                            <div className="club-leader-info">
                                    <img
                                        src={club.president?.profile_picture || '/default-profile.png'}
                                        alt="Leader"
                                        className="leader-photo"
                                        onClick={() => navigateToProfile(club.president)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                <div className="club-leader-name">
                                    {(() => {
                                        const fullName = club.president?.full_name || 'No Leader';
                                        const names = fullName.trim().split(' ');
                                        const firstName = names[0] || '';
                                        const lastName = names.length > 1 ? names[names.length - 1] : '';
                                        
                                        return (
                                            <>
                                                <div className="leader-firstname">{firstName}</div>
                                                <div className="leader-surname">{lastName.toUpperCase()}</div>
                                            </>
                                        );
                                    })()}
                                </div>
                            </div>
                            <div className="club-members-info" onClick={toggleMembersPanel}>
                                <img src={membersIcon} alt="Members Icon" className="members-icon" />
                                <div className="club-members-title">Members</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Club Details */}
            <div className="club-details">
                <div className="club-description-container">
                    <div className="club-description-header">
                        <div className="club-description-title">Description</div>
                        {isClubPresident && (
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
                                        onClick={updateClubDescription}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="cancel-description-button"
                                        onClick={() => {
                                            setDescriptionText(club.description || '');
                                            setIsEditingDescription(false);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            club.description ? (
                                club.description.split('\n').map((line, index) => <p key={index}>{line}</p>)
                            ) : (
                                <p>No description available.</p>
                            )
                        )}
                    </div>
                </div>

                <div className="club-event-container">
                    <div className="club-event-header">
                        <div className="club-event-title">Events</div>
                        {isClubPresident && (
                            <button className="create-event-button" onClick={handleEventCreationClick}>
                                <span className="plus-icon">+</span>
                            </button>
                        )}
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
                        <p className="club-error-text">No events created by this club yet.</p>
                    )}
                </div>
            </div>

            {/* Members Panel */}
            {showMembersPanel && (
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
                                    <h2 className="members-title">Members</h2>
                                </div>
                                <div className="members-header-center">
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
                                {isClubPresident && (
                                    <div className="members-header-right">
                                        <button className="manage-roles" onClick={handleManageRolesClick}>
                                            Manage Roles +
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="members-panel-header-border"></div>
                            <div className="members-body">
                            {/* Standard roles first (for consistent ordering) */}
                            <MemberCategorySection
                                title="Leader"
                                members={members.filter(m => m.position === 'President')}
                                searchQuery={searchQuery}
                                getInitials={getInitials}
                            />
                            
                            <MemberCategorySection
                                title="Members"
                                members={members.filter(m => m.position === 'Member' && !m.custom_position)}
                                searchQuery={searchQuery}
                                getInitials={getInitials}
                            />
                            
                            {/* Dynamic rendering for all other roles from the API */}
                            {clubRoles
                                .filter(role => !['President', 'Member'].includes(role.name)) // Skip the ones we've already shown
                                .map(role => (
                                    <MemberCategorySection
                                        key={role.id}
                                        title={role.name}
                                        members={members.filter(m => {
                                            // Match standard positions OR custom positions
                                            return m.position === role.name || m.custom_position === role.name;
                                        })}
                                        searchQuery={searchQuery}
                                        getInitials={getInitials}
                                    />
                                ))
                            }
                            
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
                onClose={() => setCollabSidebarOpen(false)}
                presidentEmail={presidentEmail}
            />
            {/* Hidden file inputs */}
            <input
                type="file"
                ref={logoInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleLogoChange}
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

export default Club;