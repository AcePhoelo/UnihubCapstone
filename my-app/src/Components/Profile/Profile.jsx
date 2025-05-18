/* Profile.jsx */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom'; // Added useParams
import './Profile.css';
import logo from '../../assets/logo.png';
import calendar from '../../assets/calendar.png';
import { useCurrentUser } from '../../hooks/useCurrentUser'; // Custom hook to get current user

const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { student_id } = useParams(); // Get student_id from the URL
    const { logout } = useCurrentUser(); // Custom hook to handle logout

    const [studentName, setStudentName] = useState('');
    const [studentID, setStudentID] = useState('');
    const [studentEmail, setStudentEmail] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [leadershipClubs, setLeadershipClubs] = useState([]);
    const [membershipClubs, setMembershipClubs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const accessToken = localStorage.getItem('access_token');
                const endpoint = student_id
                    ? `https://54.169.81.75:8000/profile/students/${student_id}/` // Fetch profile by student_id
                    : 'https://54.169.81.75:8000/profile/profile/'; // Fetch logged-in user's profile

                const response = await fetch(endpoint, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setStudentName(data.full_name || 'Unknown Student');
                    setStudentID(data.studentid || 'Unknown ID');
                    setStudentEmail(data.email || 'Unknown Email');
                    setProfilePicture(data.profile_picture || '');
                    setLeadershipClubs(data.leadership_clubs || []);
                    setMembershipClubs(data.clubsjoined || []);
                } else {
                    setError('Failed to fetch profile data.');
                }
            } catch (err) {
                console.error('Error fetching profile data:', err);
                setError('An error occurred while fetching profile data.');
            }
        };

        fetchProfileData();
    }, [student_id]); // Refetch data when student_id changes

    const handleLogoClick = () => navigate('/club-directory');
    const handleClubsClick = () => navigate('/club-directory');
    const handleEventsClick = () => navigate('/event-directory');
    const handleActivityClick = () => navigate('/my-activity');
    const handleProfileClick = () => navigate('/profile');
    const handleCalendarClick = () => navigate('/calendar');
    const handleCreateClick = () => {
        window.open('/creation-club', '_blank');
    };

    const getInitials = (fullName) => {
        const names = fullName.trim().split(' ');
        const initials = names[0]?.charAt(0).toUpperCase() + (names[1]?.charAt(0).toUpperCase() || '');
        return initials;
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

    if (error) return <div className="error-text">{error}</div>;

    return (
        <div className="profile-page">
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
                            backgroundImage: `url(${profilePicture || ''})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            border: '2px solid #ccc',
                        }}
                    >
                        {!profilePicture && getInitials(studentName || 'Unknown Student')}
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

            {/* Profile Main */}
            <div className="profile-container">
                <div className="name-box">
                    <div className="name-title-container">
                        <div
                            className="main-profile-icon"
                            style={{
                                backgroundImage: `url(${profilePicture || ''})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                border: '2px solid #ccc',
                            }}
                        >
                            {!profilePicture && getInitials(studentName || 'Unknown Student')}
                        </div>
                        <div className="name-title">{studentName || 'Unknown Student'}</div>
                    </div>
                    <div className="create-club-container">
                        <div className="create-club" onClick={handleCreateClick}>
                            Create Club
                        </div>
                    </div>
                </div>

                {/* Details & Leadership */}
                <div className="detail-leadership-row">
                    <div className="detail-box">
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
                    </div>

                    {/* Leadership Clubs */}
                    <div className="leadership-box">
                        <div className="box-title">Club Leadership</div>
                        <div className="club-content">{renderClubList(leadershipClubs, 'leadership')}</div>
                    </div>
                </div>

                {/* Membership Clubs */}
                <div className="membership-box">
                    <div className="box-title">Memberships</div>
                    <div className="club-content">{renderClubList(membershipClubs, 'membership')}</div>
                </div>

            {/* Log Out Button */}
            <div className="logout-container">
                <button className="logout-button" onClick={logout}>
                    Log Out
                </button>
            </div>
            </div>
        </div>
    );
};

export default Profile;