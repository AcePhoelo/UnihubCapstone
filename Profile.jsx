/* Profile.jsx */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Profile.css';
import logo from '../../assets/logo.png';
import calendar from '../../assets/calendar.png';
import sampleClubIcon from '../../assets/club-logo.png';

const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [studentName, setStudentName] = useState('');
    const [studentID, setStudentID] = useState('');
    const studentEmail = localStorage.getItem('studentEmail');
    const [leadershipClubs, setLeadershipClubs] = useState([]);
    const [membershipClubs, setMembershipClubs] = useState([]);

    useEffect(() => {
        if (studentEmail) {
            fetch(`https://mocki.io/v1/your-api-endpoint?email=${studentEmail}`)
                .then(response => response.json())
                .then(data => {
                    setStudentName(data.name || "Student");
                    setStudentID(data.studentID || "Unknown ID");
                })
                .catch(error => {
                    console.error("Error fetching student data:", error);
                    setStudentName("Unknown Student");
                    setStudentID("Unknown ID");
                });
        }

        /* Sample Clubs */
        setLeadershipClubs([
            {
                name: 'Board Games Club',
                iconUrl: sampleClubIcon
            },
            {
                name: 'CCSC',
                iconUrl: sampleClubIcon
            },
            {
                name: 'IT Club',
                iconUrl: sampleClubIcon
            }
        ]);

        setMembershipClubs([
            {
                name: 'Art Society',
                iconUrl: sampleClubIcon
            },
            {
                name: 'Music Club',
                iconUrl: sampleClubIcon
            },
            {
                name: 'Curtin Sports',
                iconUrl: sampleClubIcon
            },
            {
                name: 'Future Chefs',
                iconUrl: sampleClubIcon
            },
            {
                name: 'Esports Club',
                iconUrl: sampleClubIcon
            },
            {
                name: 'Chess Club',
                iconUrl: sampleClubIcon
            },
            {
                name: 'Movie Critics Club',
                iconUrl: sampleClubIcon
            }
        ]);

        /*
        fetch('https://mocki.io/v1/your-club-api-endpoint')
            .then(response => response.json())
            .then(data => {
                if (data.leadershipClubs && data.membershipClubs) {
                    setLeadershipClubs(data.leadershipClubs);
                    setMembershipClubs(data.membershipClubs);
                } else {
                    setClubError('Club data not found.');
                }
            })
            .catch(err => {
                console.error("Error fetching clubs:", err);
                setClubError('Failed to load club data.');
            });
        */

        /*
        setLeadershipClubs([]);
        setMembershipClubs([]);
        */

    }, [studentEmail]);

    const handleClubsClick = () => navigate('/club-directory');
    const handleEventsClick = () => navigate('/event-directory');
    const handleActivityClick = () => navigate('/my-activity');
    const handleCreateClick = () => navigate('/create-club');

    const getInitials = (fullName) => {
        const names = fullName.trim().split(' ');
        const initials = names[0]?.charAt(0).toUpperCase() + (names[1]?.charAt(0).toUpperCase() || '');
        return initials;
    };

    const renderClubList = (clubs, type) => {
        /*
        if (clubError) {
            return <div className="club-error">{clubError}</div>;
        }
        */

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
                        {club.iconUrl ? (
                            <img src={club.iconUrl} alt={club.name} className="club-icon" />
                        ) : (
                            <div className="club-icon-placeholder">N/A</div>
                        )}
                        <div className="club-name">{club.name || "Unknown Club"}</div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div>
            {/* Navbar */}
            <div className="navbar">
                <img src={logo} alt="Logo" className="curtin-logo" />

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
                    <div className="profile-icon">{getInitials(studentName || "John BROWN")}</div>
                    <img src={calendar} alt="Calendar" className="calendar-icon" />
                </div>
            </div>

            {/* Profile Main */}
            <div className="profile-container">
                <div className="name-box">
                    <div className="name-title-container">
                        <div className="main-profile-icon">{getInitials(studentName || "John BROWN")}</div>
                        <div className="name-title">{studentName || "John BROWN"}</div>
                    </div>
                    <div className="create-club-container">
                        <div className="create-club" onClick={handleCreateClick}>Create Club</div>
                    </div>
                </div>

                {/* Details & Leadership */}
                <div className="detail-leadership-row">
                    <div className="detail-box">
                        <div className="box-title">User Details</div>
                        <div className="email-detail">
                            <div className="box-subtitle">Email address</div>
                            <div className="box-information">{studentEmail || "21545689@student.curtin.edu.au"}</div>
                            <div className="box-text">(Visible to other platform users)</div>
                        </div>
                        <div className="ID-detail">
                            <div className="box-subtitle">StudentID</div>
                            <div className="box-information">{studentID || "21545689"}</div>
                        </div>
                    </div>

                    {/* Leadership Clubs */}
                    <div className="leadership-box">
                        <div className="box-title">Club Leadership</div>
                        <div className="club-content">
                            {renderClubList(leadershipClubs, 'leadership')}
                        </div>
                    </div>
                </div>

                {/* Membership Clubs */}
                <div className="membership-box">
                    <div className="box-title">Memberships</div>
                    <div className="club-content">
                        {renderClubList(membershipClubs, 'membership')}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;