/* EventDirectory.jsx */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './EventDirectory.css';
import logo from '../../assets/logo.png';
import calendar from '../../assets/calendar.png';
import twitter from '../../assets/twitter.png';
import facebook from '../../assets/facebook.png';
import instagram from '../../assets/instagram.png';
import youtube from '../../assets/youtube.png';
import linkedin from '../../assets/linkedin.png';

const EventDirectory = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [studentName, setStudentName] = useState('');
    const [setStudentID] = useState('');
    const studentEmail = localStorage.getItem('studentEmail');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        /*
        fetch('https://your-django-backend.com/api/events/')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Django should return a list of events with these fields:
                // name, description, image_url, club: { name, logo_url }
                const formattedEvents = data.map(event => ({
                    name: event.name,
                    description: event.description,
                    imageUrl: event.image_url,
                    club: {
                        name: event.club.name,
                        logoUrl: event.club.logo_url
                    }
                }));
                setEvents(formattedEvents);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching events:", error);
                setError("Failed to load events.");
                setLoading(false);
            });
        */

        // MOCK DATA (REMOVE AFTER API READY)
        const sampleBoardGamesEventBanner = 'https://i.imgur.com/TEiuhlN.png';
        const sampleCCSCEventBanner = 'https://i.imgur.com/SiiPQBO.png';
        const sampleITEventBanner = 'https://i.imgur.com/42DvgLm.png';
        const sampleArtEventBanner = 'https://i.imgur.com/dMN8qUn.png';

        const mockEvents = [
            {
                name: "Board Games Night",
                imageUrl: sampleBoardGamesEventBanner,
                description: "Join us for an unforgettable evening filled with the most exciting, strategic, and fun board games ever! Whether you are a seasoned board game enthusiast or a curious newcomer, there's something for everyone. Challenge your friends, participate in tournaments, win amazing prizes, and meet like-minded people who share your passion. We'll have classic games, new releases, cooperative games, competitive games, and everything in between. Free snacks and drinks included! Don't miss this opportunity to sharpen your wits, form alliances, and test your strategy skills. This event will run for several hours, with dedicated areas for different types of games, expert demonstrations, and game tutorials. Prepare yourself for a night of laughter, competition, and a whole lot of fun! Feel free to bring your favorite game to share with others.",
                club: {
                    name: "Board Games Club",
                    logoUrl: "https://i.imgur.com/IquR4rn.png"
                }
            },
            {
                name: 'Curtin Community Volunteering Fair',
                imageUrl: sampleCCSCEventBanner,
                description: "Discover how you can make a real difference at the Curtin Community Volunteering Fair! Hosted by CCSC, this event connects students with a wide variety of local charities, non-profits, and community service organizations in need of enthusiastic volunteers. Explore opportunities to contribute your time and skills, whether it's supporting environmental causes, helping vulnerable communities, or participating in campus- led initiatives.Attendees can join interactive booths, sign up for volunteer programs on the spot, and attend guest talks from experienced volunteers and community leaders.Volunteering not only benefits the community—it enhances your leadership skills, builds networks, and enriches your university experience.Free snacks, certificates of participation, and a chance to win volunteering awards are included.Be part of something bigger—join us!",
                club: {
                    name: "CCSC",
                    logoUrl: "https://i.imgur.com/OFYpDfS.png"

                }
            },
            {
                name: "Annual Hackathon Showdown",
                imageUrl: sampleITEventBanner,
                description: "Get ready to code, collaborate, and conquer! Curtin's Annual Hackathon Showdown is here, and it's bigger and better than ever. Form your dream team or join a new one, and compete in a 24-hour coding marathon designed to test your creativity, problem-solving, and development skills. From web apps to machine learning, all ideas are welcome. Industry mentors will be present throughout to guide you, provide technical advice, and judge final submissions. Winning teams receive amazing prizes, recognition, and the chance to pitch to real companies. Food, drinks, and sleeping areas provided. Even if you're new to hackathons, there will be beginner workshops, so everyone can participate!",
                club: {
                    name: "IT Club",
                    logoUrl: "https://i.imgur.com/oIeX78g.png"
                }
            },
            {
                name: "Curtin Arts Festival 2025",
                imageUrl: sampleArtEventBanner,
                description: "Celebrate creativity and expression at the Curtin Arts Festival 2025! This week-long event features art installations, live painting sessions, workshops, and a grand exhibition showcasing the talent of our university's most creative minds. Engage with artists, learn new techniques, and participate in collaborative art projects. Highlights include interactive digital art showcases, photography contests, sculpture displays, and an evening gala featuring performances and awards. Whether you're an artist or just appreciate beautiful works, this festival promises inspiration and excitement. Attendees will also have access to pop-up markets, live music, and exclusive merchandise. Don't miss your chance to immerse yourself in the vibrant world of art and design!",
                club: {
                    name: "Art Society",
                    logoUrl: "https://i.imgur.com/SXbupr8.png"
                }
            }
        ];

        setEvents(mockEvents);
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
        <div className="event-directory-page">
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

            {/* Event Directory Body */}
            <div className="event-body">
                {/* Featured Event */}
                <div className="featured-event">
                    <div className="featured-event-container">
                        {!loading && events.length > 0 && (() => {
                            const event = events[0];
                            return (
                                <div
                                    className="featured-event-box"
                                    onClick={() => navigate(`/event/${encodeURIComponent(event.name)}`)}
                                >
                                    <img
                                        src={event.imageUrl}
                                        alt={event.name}
                                        className="featured-event-image"
                                    />
                                    <div className="featured-event-header">
                                        <div className="featured-event-name">{event.name}</div>
                                        {event.club?.logoUrl && (
                                            <img
                                                src={event.club.logoUrl}
                                                alt=""
                                                className="featured-event-logo"
                                            />
                                        )}
                                    </div>

                                </div>
                            );
                        })()}
                        {loading && <div className="loading-text">Loading featured event...</div>}
                        {error && <div className="error-text">{error}</div>}
                    </div>
                </div>

                {/* Explore Events */}
                <div className="event-explore">
                    <div className="event-explore-container">
                        <div className="event-explore-title">Explore</div>
                        {error && <div className="error-text" style={{ marginBottom: '1rem' }}>{error}</div>}
                        <div className="events-grid">
                            {events.length > 1 && events.slice(1).map((event, index) => (
                                <div
                                    key={index}
                                    className="event-card-wrapper"
                                    onClick={() => navigate(`/event/${encodeURIComponent(event.name)}`)}
                                >
                                    <div className="event-card">
                                        <img
                                            src={event.imageUrl}
                                            alt={event.name}
                                            className="event-card-banner"
                                        />
                                        <div className="event-card-content">
                                            <div className="event-card-name">{event.name}</div>
                                            <div className="event-card-description">{event.description}</div>
                                            <div className="spacer"></div>
                                            <div className="event-card-meta">
                                                Date: TBD | Time: TBD | Place: TBD
                                            </div>
                                        </div>
                                    </div>

                                    {/* Club logo */}
                                    <div className="event-club-section" onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/club/${encodeURIComponent(event.club.name)}`);
                                    }}>
                                        {event.club?.logoUrl ? (
                                            <img src={event.club.logoUrl} alt={event.club.name} className="event-club-icon" />
                                        ) : (
                                            <div className="event-club-icon-placeholder">Logo</div>
                                        )}
                                        <div className="event-club-name">{event.club?.name}</div>
                                    </div>
                                </div>
                            ))}
                            {events.length === 0 && !loading && (
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
        </div>
    );
};

export default EventDirectory;