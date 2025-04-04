/* ClubDirectory.jsx */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ClubDirectory.css';
import logo from '../../assets/logo.png';
import calendar from '../../assets/calendar.png';
import twitter from '../../assets/twitter.png';
import facebook from '../../assets/facebook.png';
import instagram from '../../assets/instagram.png';
import youtube from '../../assets/youtube.png';
import linkedin from '../../assets/linkedin.png';

const ClubDirectory = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [studentName, setStudentName] = useState('');
    const [setStudentID] = useState('');
    const studentEmail = localStorage.getItem('studentEmail');
    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        /*
        fetch('https://mocki.io/v1/your-clubs-api-endpoint')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
            // Django should return a list of events with these fields:
            // name, description, image_url
                const formattedClubs = data.map(club => ({
                    name: club.name,
                    description: club.description,
                    imageUrl: club.image_url
                }));
                setClubs(formattedClubs);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching clubs:", error);
                setError("Failed to load clubs.");
                setLoading(false);
            });
        */

        const sampleBoardGamesBanner = 'https://i.imgur.com/UXpOp6P.png';
        const sampleCCSCBanner = 'https://i.imgur.com/87INjr7.png';
        const sampleITBanner = 'https://i.imgur.com/chZp8k7.png';
        const sampleArtBanner = 'https://i.imgur.com/LArlm9Z.png';
        const sampleMusicBanner = 'https://i.imgur.com/AEShXl2.png';
        const sampleSportsBanner = 'https://i.imgur.com/46w02QX.png';
        const sampleChefsBanner = 'https://i.imgur.com/58i0x0k.png';
        const sampleEsportsBanner = 'https://i.imgur.com/kKQuIQ5.png';
        const sampleChessBanner = 'https://i.imgur.com/w5BFPFc.png';
        const sampleMovieBanner = 'https://i.imgur.com/64gR5Uo.jpg';
        const sampleUnderwaterBanner = 'https://i.imgur.com/tDaZLt7.png';
        const samplePhotograthyBanner = 'https://i.imgur.com/4yg5DDu.png';

        const mockClubs = [
            {
                name: 'Board Games Club',
                imageUrl: sampleBoardGamesBanner,
                description: 'Join us for fun board game nights, tournaments, and strategy sessions. Perfect for all board game lovers!'
            },
            {
                name: 'CCSC',
                imageUrl: sampleCCSCBanner,
                description: 'Curtin Computing Students Club: for all IT and computing enthusiasts, networking, workshops, and tech talks.'
            },
            {
                name: 'IT Club',
                imageUrl: sampleITBanner,
                description: 'Dedicated to IT students. Join coding sessions, hackathons, and tech events to sharpen your skills.'
            },
            {
                name: 'Art Society',
                imageUrl: sampleArtBanner,
                description: 'For creative artists, painters, and designers. Attend workshops, exhibitions, and showcase your talent.'
            },
            {
                name: 'Music Club',
                imageUrl: sampleMusicBanner,
                description: 'Dedicated to musicians and performers interested in jamming, composing, and live events.'
            },
            {
                name: 'Curtin Sports',
                imageUrl: sampleSportsBanner,
                description: 'Join sports activities, tournaments, and fitness sessions. All levels welcome!'
            },
            {
                name: 'Future Chefs',
                imageUrl: sampleChefsBanner,
                description: 'Learn culinary skills, exchange recipes, and participate in cooking competitions to become a master chef.'
            },
            {
                name: 'Esports Club',
                imageUrl: sampleEsportsBanner,
                description: 'For competitive gamers. Engage in tournaments, strategy sessions, and team matches.'
            },
            {
                name: 'Chess Club',
                imageUrl: sampleChessBanner,
                description: 'Sharpen your strategic thinking with weekly chess matches, coaching, and competitions.'
            },
            {
                name: 'Movie Critics Club',
                imageUrl: sampleMovieBanner,
                description: 'Discuss, analyze, and critique the latest films. Explore cinematography, storytelling, and film theory.'
            },
            {
                name: 'Underwater Fishes',
                imageUrl: sampleUnderwaterBanner,
                description: 'Dive into adventure, explore marine life, and learn scuba diving skills with experienced divers. This club is perfect for both beginners and seasoned divers. We organize regular trips to the most stunning underwater locations, offer professional training sessions, and conduct marine conservation activities. Become part of a growing community passionate about the ocean, environmental protection, underwater photography, and more. Don’t miss out on exclusive certifications and workshops that can take your diving skills to the next level!'
            },
            {
                name: 'Photography Enthusiasts',
                imageUrl: samplePhotograthyBanner,
                description: "Capture moments, learn photography techniques, and join photo walks and editing workshops. Whether you're an amateur looking to improve your skills or a professional photographer wanting to share your knowledge, our club offers a space for collaboration, critique, and growth. Participate in exhibitions, attend guest lectures from renowned photographers, and get hands-on experience with the latest gear. We also conduct contests, portfolio reviews, and trips to scenic locations to perfect your craft. There’s always something new to learn and capture."
            }
        ];

        setClubs(mockClubs);
        setLoading(false);
    }, []);


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
    }, [studentEmail]);

    const handleLogoClick = () => navigate('/club-directory');
    const handleClubsClick = () => navigate('/club-directory');
    const handleEventsClick = () => navigate('/event-directory');
    const handleActivityClick = () => navigate('/my-activity');
    const handleProfileClick = () => navigate('/profile');
    const handleCalendarClick = () => navigate('/calendar');

    const getInitials = (fullName) => {
        const names = fullName.trim().split(' ');
        const initials = names[0]?.charAt(0).toUpperCase() + (names[1]?.charAt(0).toUpperCase() || '');
        return initials;
    };

    return (
        <div className="club-directory-page">
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
                        style={{ cursor: 'pointer' }}
                    >
                        {getInitials(studentName || "John BROWN")}
                    </div>
                    <img src={calendar} alt="Calendar" className="calendar-icon"
                        onClick={handleCalendarClick}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
            </div>

            {/* Club Directory Body */}
            <div className="club-body">
                {/* Featured Club */}
                <div className="featured-club">
                    <div className="featured-club-container">
                        {!loading && clubs.length > 0 && (() => {
                            const club = clubs[0];
                            return (
                                <div
                                    className="featured-club-box"
                                    onClick={() => navigate(`/club/${encodeURIComponent(club.name)}`)}
                                >
                                    <img
                                        src={club.imageUrl}
                                        alt={club.name}
                                        className="featured-club-image"
                                    />
                                    <div className="featured-club-name">
                                        {club.name}
                                    </div>
                                </div>
                            );
                        })()}
                        {loading && <div className="loading-text">Loading featured club...</div>}
                        {error && <div className="error-text">{error}</div>}
                    </div>
                </div>

                {/* Explore Clubs */}
                <div className="club-explore">
                    <div className="club-explore-title">Explore</div>
                    {error && <div className="error-text" style={{ marginBottom: '1rem' }}>{error}</div>}
                    <div className="clubs-grid">
                        {clubs.length > 1 && clubs.slice(1).map((club, index) => (
                            <div
                                key={index}
                                className="exlore-club-box"
                                onClick={() => navigate(`/club/${encodeURIComponent(club.name)}`)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="club-card">
                                    <img
                                        src={club.imageUrl}
                                        alt={club.name}
                                        className="club-card-banner"
                                    />
                                    <div className="club-card-name">
                                        {club.name}
                                    </div>
                                    <div className="club-card-description">
                                        {club.description}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {clubs.length === 0 && !loading && (
                            <div className="error-text">No clubs available</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="footer">
                <div className="footer-left">
                    <a
                        href="https://www.curtin.edu.au/socialmedia/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="follow-link"
                    >
                        Follow Curtin
                    </a>
                    <div className="social-media">
                        <a href="https://x.com/curtinuni" target="_blank" rel="noopener noreferrer">
                            <img src={twitter} alt="Twitter" className="twitter" />
                        </a>
                        <a href="https://www.facebook.com/curtinuniversity" target="_blank" rel="noopener noreferrer">
                            <img src={facebook} alt="Facebook" className="facebook" />
                        </a>
                        <a href="https://www.instagram.com/curtinuniversity/" target="_blank" rel="noopener noreferrer">
                            <img src={instagram} alt="Instagram" className="instagram" />
                        </a>
                        <a href="https://www.youtube.com/user/CurtinUniversity" target="_blank" rel="noopener noreferrer">
                            <img src={youtube} alt="YouTube" className="youtube" />
                        </a>
                        <a href="https://www.linkedin.com/school/8788/" target="_blank" rel="noopener noreferrer">
                            <img src={linkedin} alt="LinkedIn" className="linkedin" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClubDirectory;