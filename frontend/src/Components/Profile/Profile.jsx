/* Profile.jsx */
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import './Profile.css';
import logo from '../../assets/logo.png';
import calendar from '../../assets/calendar.png';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { motion } from 'framer-motion';
const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const { logout } = useCurrentUser();

    const isGuest = localStorage.getItem('isGuest') === 'true';
    
    // Get studentId from either URL params or location state
    const requestedStudentId = params.student_id || (location.state && location.state.studentId);
    const [isOwnProfile, setIsOwnProfile] = useState(true);

    const [studentName, setStudentName] = useState('');
    const [studentID, setStudentID] = useState('');
    const [studentEmail, setStudentEmail] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    // Add a separate state for the current user's profile picture
    const [currentUserProfilePic, setCurrentUserProfilePic] = useState('');
    const [currentUserName, setCurrentUserName] = useState('');
    const [leadershipClubs, setLeadershipClubs] = useState([]);
    const [membershipClubs, setMembershipClubs] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditingProfilePic, setIsEditingProfilePic] = useState(false);
    const [newProfilePicture, setNewProfilePicture] = useState(null);
    const [profilePicPreview, setProfilePicPreview] = useState(null);
    const profilePicInputRef = useRef(null);

    // Set the current user's profile information from localStorage on component mount
    useEffect(() => {
        const currentUserData = JSON.parse(localStorage.getItem('profile') || '{}');
        const profilePicUrl = currentUserData.profile_picture || '';
        
        setCurrentUserName(currentUserData.full_name || currentUserData.name || '');
        setCurrentUserProfilePic(profilePicUrl.startsWith('http') ? profilePicUrl : 
                                profilePicUrl ? `http://54.169.81.75:8000${profilePicUrl}` : '');
    }, []);

        
    
        useEffect(() => {
            const fetchProfileData = async () => {
                setLoading(true);
                try {
                    const accessToken = localStorage.getItem('access_token');
                    const currentUserData = JSON.parse(localStorage.getItem('profile') || '{}');
                    
                    // Determine if we're viewing our own profile or someone else's
                    const isViewingOwnProfile = !requestedStudentId || 
                        requestedStudentId === currentUserData.studentid;
                    
                    setIsOwnProfile(isViewingOwnProfile);
                    
                    // Choose the appropriate endpoint
                    const endpoint = isViewingOwnProfile
                        ? 'http://54.169.81.75:8000/profile/profile/' 
                        : `http://54.169.81.75:8000/profile/students/${requestedStudentId}/`;
    
                    console.log(`Fetching profile from: ${endpoint}`, 
                        isViewingOwnProfile ? '(own profile)' : `(student ID: ${requestedStudentId})`);
    
                    const response = await fetch(endpoint, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        },
                    });
    
                    if (response.ok) {
                        const data = await response.json();
                        console.log('Profile API response:', data);  // Debug the full response
                        
                        // Handle different field names from backend
                        setStudentName(data.full_name || data.name || 'Unknown Student');
                        setStudentID(data.studentid || 'Unknown ID');
                        setStudentEmail(data.email || 'Unknown Email');
                        
                        // Handle profile picture with absolute URL check
                        const profilePicUrl = data.profile_picture || '';
                        setProfilePicture(profilePicUrl.startsWith('http') ? profilePicUrl : 
                                         profilePicUrl ? `http://54.169.81.75:8000${profilePicUrl}` : '');
                        
                        // Process club data to ensure logos have complete URLs
                        const processClubImages = (clubs) => {
                            return clubs.map(club => ({
                                ...club,
                                logo: club.logo ? (club.logo.startsWith('http') ? club.logo : 
                                      `http://54.169.81.75:8000${club.logo}`) : ''
                            }));
                        };
                        
                        setLeadershipClubs(processClubImages(data.leadership_clubs || []));
                        setMembershipClubs(processClubImages(data.clubsjoined || []));
                        console.log('Processed club data:', {
                            leadership: processClubImages(data.leadership_clubs || []),
                            membership: processClubImages(data.clubsjoined || [])
                        });
                    } else {
                        const errorText = await response.text();
                        console.error('Profile fetch failed:', response.status, errorText);
                        setError(`Failed to fetch profile data. Status: ${response.status}`);
                    }
                } catch (err) {
                    console.error('Error fetching profile data:', err);
                    setError('An error occurred while fetching profile data.');
                } finally {
                    setLoading(false);
                }
            };
    
            fetchProfileData();
        }, [requestedStudentId]); // Re-fetch when the requested student ID changes

    const handleCreateClick = () => {
        navigate('/creation-club');
    };

    const decodeHTMLEntities = (text) => {
    if (!text) return '';
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
    };

    // Modify the getInitials function
    const getInitials = (fullName) => {
        const decodedName = decodeHTMLEntities(fullName || '');
        const names = decodedName.trim().split(' ');
        const initials = names[0]?.charAt(0).toUpperCase() + (names[1]?.charAt(0).toUpperCase() || '');
        return initials;
    };

    const renderProfileActions = () => {
        if (isOwnProfile) {
            return (
                <div className="profile-action-buttons">
                    <div className="create-club" onClick={handleCreateClick}>
                        Create Club
                    </div>
                    <button className="logout-button" onClick={logout}>
                        Log Out
                    </button>
                </div>
            );
        }
        return null;
    };

    const renderClubList = (clubs, type) => {
        if (clubs.length === 0) {
            return (
                <div className="no-clubs-text">
                    You haven't {type === 'leadership' ? 'created or managed' : 'joined'} any clubs yet...
                </div>
            );
        }
        return (
            <div className="club-list">
                {clubs.map((club, index) => (
                    <div className="club-item" key={index}>
                        {club.logo ? (
                            <img src={club.logo} alt={club.name} className="club-icon" />
                        ) : (
                            <div className="club-icon-placeholder">N/A</div>
                        )}
                        <div className="club-name">{club.name || 'Unknown Club'}</div>
                    </div>
                ))}
            </div>
        );
    };

    const handleNav = path => () => navigate(path);
    const handleProfilePicChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        let previewUrl; // Define previewUrl at the function level so it's accessible in finally block
        
        try {
            // Show temporary preview while uploading
            previewUrl = URL.createObjectURL(file); // Assign to the variable instead of declaring with const
            setProfilePicture(previewUrl);
            
            const formData = new FormData();
            formData.append('profile_picture', file);
            
            const accessToken = localStorage.getItem('access_token');
            const response = await fetch('http://54.169.81.75:8000/profile/update-picture/', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: formData
            });
            
            if (response.ok) {
                const data = await response.json();
                
                // Update profile picture in state and localStorage
                const profilePicUrl = data.profile_picture;
                setProfilePicture(profilePicUrl);
                setCurrentUserProfilePic(profilePicUrl);
                
                // Update localStorage profile
                const currentProfile = JSON.parse(localStorage.getItem('profile') || '{}');
                currentProfile.profile_picture = profilePicUrl;
                localStorage.setItem('profile', JSON.stringify(currentProfile));
                
            } else {
                const errorText = await response.text();
                console.error('Failed to update profile picture:', errorText);
                // Optionally show an error message to the user
            }
        } catch (err) {
            console.error('Error updating profile picture:', err);
            // Optionally show an error message to the user
        } finally {
            // Clean up any preview URL if needed
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        }
    };

    if (error) return <div className="error-text">{error}</div>;

    return (
        <div className="profile-page">
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
                {!isGuest ? (
                    <div
                        className="profile-icon"
                        onClick={handleNav('/profile')}
                        style={{
                            backgroundImage: currentUserProfilePic ? `url(${currentUserProfilePic})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            cursor: 'pointer',
                        }}
                    >
                        {!currentUserProfilePic && getInitials(currentUserName)}
                    </div>
                ) : (
                    <div className="profile-icon guest" onClick={handleNav('/login')}>
                        LOGIN
                    </div>
                )}
                <img
                    src={calendar}
                    alt="Calendar"
                    className="calendar-icon"
                    onClick={handleNav('/calendar')}
                    style={{ cursor: 'pointer' }}
                />
            </div>
            </div>

            <div className="profile-container">
    <motion.div
        className="name-box"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
    >
        <div className="name-title-container">
            <div className="profile-pic-container">
                <div
                    className="main-profile-icon"
                    style={{
                        backgroundImage: `url(${profilePicture || ''})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        cursor: isOwnProfile ? 'pointer' : 'default',
                    }}
                    onClick={isOwnProfile ? () => profilePicInputRef.current.click() : undefined}
                >
                    {!profilePicture && getInitials(studentName || 'Unknown Student')}
                </div>
            </div>
            <div className="name-title">{studentName || 'Unknown Student'}</div>
        </div>

        <div className="main-buttons">
            {renderProfileActions()}

        </div>
    </motion.div>

    <div className="detail-leadership-row">
        <motion.div
            className="detail-box"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <div className="box-title">User Details</div>
            <div className="email-detail">
                <div className="box-subtitle">Email address</div>
                <div className="box-information">{studentEmail || 'Unknown Email'}</div>
                <div className="box-text">(Visible to other platform users)</div>
            </div>
            <div className="ID-detail">
                <div className="box-subtitle">StudentID</div>
                <div className="box-information">{studentID || 'Unknown ID'}</div>
            </div>
        </motion.div>

        <motion.div
            className="leadership-box"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
        >
            <div className="box-title">Club Leadership</div>
            <div className="club-content">{renderClubList(leadershipClubs, 'leadership')}</div>
        </motion.div>
    </div>

    <motion.div
        className="membership-box"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
    >
        <div className="box-title">Memberships</div>
        <div className="club-content">{renderClubList(membershipClubs, 'membership')}</div>
    </motion.div>
                 </div>
                 <input
                    type="file"
                    ref={profilePicInputRef}
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleProfilePicChange}
                />
                </div>
    );
};

export default Profile;