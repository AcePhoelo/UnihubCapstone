// EventDirectory.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ColorThief from 'colorthief';
import chroma from 'chroma-js';
import './EventDirectory.css';
import logo from '../../assets/logo.png';
import calendar from '../../assets/calendar.png';
import twitter from '../../assets/twitter.png';
import facebook from '../../assets/facebook.png';
import instagram from '../../assets/instagram.png';
import youtube from '../../assets/youtube.png';
import linkedin from '../../assets/linkedin.png';
import { decodeHTMLEntities } from '../../utils';

const createGradientFromPalette = (palette, stops = 4) => {
    const colors = palette.map(c => `rgb(${c.join(',')})`);
    const scale = chroma.scale(colors).mode('lab').colors(stops);
    return `linear-gradient(to right, ${scale.join(', ')})`;
};

const EventDirectory = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [currentUserName, setCurrentUserName] = useState('');
    const [currentUserProfilePic, setCurrentUserProfilePic] = useState('');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [eventsError, setEventsError] = useState(null);
    const [colorsReady, setColorsReady] = useState(false);

    const isGuest = localStorage.getItem('isGuest') === 'true';

    const pinnedEvents = events.slice(0, 3);
    const [featuredIndex, setFeaturedIndex] = useState(0);
    const intervalRef = useRef(null);

    // Set the current user's profile information from localStorage on component mount
    useEffect(() => {
        const currentUserData = JSON.parse(localStorage.getItem('profile') || '{}');
        const profilePicUrl = currentUserData.profile_picture || '';
        
        setCurrentUserName(currentUserData.full_name || currentUserData.name || '');
        setCurrentUserProfilePic(profilePicUrl.startsWith('http') ? profilePicUrl : 
                                profilePicUrl ? `http://54.169.81.75:8000${profilePicUrl}` : '');
    }, []);

    // In the fetchEvents function, update to use backend colors directly
    const fetchEvents = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const headers = { 'Content-Type': 'application/json' };
            if (!isGuest && token) headers.Authorization = `Bearer ${token}`;

            const resp = await fetch('http://54.169.81.75:8000/api/event/add_event/', {
                headers,
            });

            if (!resp.ok) {
                const text = await resp.text();
                throw new Error(`HTTP ${resp.status}: ${text}`);
            }
            const data = await resp.json();
            const formattedEvents = data.map(event => ({
                id: event.id,
                name: event.name,
                description: event.description,
                imageUrl: event.banner?.startsWith('http') ? event.banner : 
                        event.banner ? `http://54.169.81.75:8000${event.banner}` : null,
                date: event.date,
                time: event.time,
                place: event.location,
                unit: event.unit || '',
                club: event.club_details ? {
                    id: event.club_details.id,
                    name: event.club_details.name,
                    logoUrl: event.club_details.logo,
                } : null,
                // Use the colors directly from API
                dominant_color: event.dominant_color,
                secondary_color: event.secondary_color,
                tertiary_color: event.tertiary_color,
                shadow_color: event.shadow_color,
                // Create gradients from API colors
                hoverBackground: event.dominant_color && event.secondary_color && event.tertiary_color ? 
                    createGradientFromPalette([
                        event.dominant_color, 
                        event.secondary_color, 
                        event.tertiary_color
                    ], 4) : 
                    'linear-gradient(to right, #ccc, #eee)',
                hoverColor: event.dominant_color ? 
                    `rgb(${event.dominant_color.join(',')})` : 
                    'rgba(200,200,200,0.5)',
            }));
            setEvents(formattedEvents);
            setColorsReady(true); // Colors are already set
        } catch (err) {
            console.error('Error fetching events:', err);
            setEventsError('Failed to load events.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);


    // useEffect(() => {
    //     if (!colorsReady && events.length > 0) {
    //         (async () => {
    //             const updated = await Promise.all(
    //                 events.map(async evt => {
    //                     try {
    //                         const imgRes = await fetch(evt.imageUrl);
    //                         const blob = await imgRes.blob();
    //                         const url = URL.createObjectURL(blob);
    //                         const img = new Image();
    //                         img.src = url;
    //                         await new Promise(r => (img.onload = r));
    //                         URL.revokeObjectURL(url);

    //                         const palette = new ColorThief().getPalette(img, 3);
    //                         const [r, g, b] = palette[0];
    //                         return {
    //                             ...evt,
    //                             hoverBackground: createGradientFromPalette(palette, 4),
    //                             hoverColor: `rgb(${r}, ${g}, ${b})`,
    //                         };
    //                     } catch {
    //                         return {
    //                             ...evt,
    //                             hoverBackground: 'linear-gradient(to right, #ccc, #eee)',
    //                             hoverColor: 'rgba(200,200,200,0.5)',
    //                         };
    //                     }
    //                 })
    //             );
    //             setEvents(updated);
    //             setColorsReady(true);
    //         })();
    //     }
    // }, [events, colorsReady]);

    const getInitials = name => {
        const decodedName = decodeHTMLEntities(name || '');
        const [first = '', last = ''] = decodedName.trim().split(' ');
        return (first[0] || '').toUpperCase() + (last[0] || '').toUpperCase();
    };

    useEffect(() => {
        if (!pinnedEvents.length) return;
        intervalRef.current = setInterval(() => {
            setFeaturedIndex(i => (i + 1) % pinnedEvents.length);
        }, 5000);
        return () => clearInterval(intervalRef.current);
    }, [pinnedEvents.length]);

    const pauseAutoplay = () => clearInterval(intervalRef.current);
    const resumeAutoplay = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setFeaturedIndex(i => (i + 1) % pinnedEvents.length);
        }, 5000);
    };

    const handleNav = path => () => navigate(path);
    const current = pinnedEvents[featuredIndex] || { hoverColor: '' };

    if (loading) {
        return (
            <div className="my-activity-page">
                <div className="loading-container">
                    <div className="loading-spinner" />
                    <div>Loading events...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="event-directory-page">
            <div className="navbar">
                <img
                    src={logo}
                    alt="Logo"
                    className="curtin-logo"
                    onClick={handleNav('/club-directory')}
                />
                <div className="navbar-text">
                    <div
                        className="clubs-navbar"
                        onClick={handleNav('/club-directory')}
                        style={{
                            color: location.pathname === '/club-directory' ? '#000' : '#999',
                        }}
                    >
                        Clubs
                    </div>
                    <div
                        className="events-navbar"
                        onClick={handleNav('/event-directory')}
                        style={{
                            color: location.pathname === '/event-directory' ? '#000' : '#999',
                        }}
                    >
                        Events
                    </div>
                    {!isGuest && (
                        <div
                            className="activity-navbar"
                            onClick={handleNav('/my-activity')}
                            style={{
                                color: location.pathname === '/my-activity' ? '#000' : '#999',
                            }}
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
                                    cursor: 'pointer',
                                    fontSize: '24px',
                                    backgroundImage: currentUserProfilePic
                                        ? `url(${currentUserProfilePic})`
                                        : undefined,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                {currentUserProfilePic ? '' : getInitials(currentUserName)}
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
                className={`event-body fade ${!loading ? 'visible' : ''}`}
                style={{
                    backgroundImage: current.hoverColor
                        ? `linear-gradient(to bottom, ${current.hoverColor} 0%, rgba(250,250,250,0) 50%)`
                        : undefined,
                }}
            >
                {pinnedEvents.length > 0 && (
                    <div
                        className="featured-event"
                        onMouseEnter={pauseAutoplay}
                        onMouseLeave={resumeAutoplay}
                    >
                        <button
                            className="arrow left-arrow"
                            onClick={() =>
                                setFeaturedIndex(
                                    (featuredIndex - 1 + pinnedEvents.length) % pinnedEvents.length
                                )
                            }
                        >
                            <ChevronLeft />
                        </button>
                        <motion.div
                            className="featured-event-box"
                            key={pinnedEvents[featuredIndex].id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ scale: 1.03 }}
                            style={{
                                cursor: 'pointer',
                                '--hover-bg': pinnedEvents[featuredIndex].hoverBackground,
                                '--hover-shadow': pinnedEvents[featuredIndex].hoverColor,
                            }}
                            onClick={() =>
                                navigate(
                                    `/event/${encodeURIComponent(
                                        pinnedEvents[featuredIndex].name
                                    )}`
                                )
                            }
                        >
                            <img
                                src={pinnedEvents[featuredIndex].imageUrl}
                                alt={pinnedEvents[featuredIndex].name}
                                className="featured-event-image"
                            />
                            <div className="featured-event-name">
                                {decodeHTMLEntities(pinnedEvents[featuredIndex].name)}
                            </div>
                        </motion.div>
                        <button
                            className="arrow right-arrow"
                            onClick={() =>
                                setFeaturedIndex((featuredIndex + 1) % pinnedEvents.length)
                            }
                        >
                            <ChevronRight />
                        </button>
                    </div>
                )}

                <div className="event-explore">
                    <div className="event-explore-container">
                        <div className="event-explore-title">Explore</div>
                        {eventsError && (
                            <div className="error-text" style={{ marginBottom: '1rem' }}>
                                {eventsError}
                            </div>
                        )}
                        <div className="events-grid">
                            {events.map((evt) => {
                                console.log('Event:', evt);
                                const club = evt.club || {};
                                return (
                                    <motion.div
                                        key={evt.id}
                                        className="event-card-wrapper"
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <motion.div
                                            className="event-card"
                                            initial={{ opacity: 0, y: 50 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5 }}
                                            whileHover={{ scale: 1.05 }}
                                            viewport={{ once: true, amount: 0.2 }}
                                            style={{
                                                cursor: 'pointer',
                                                '--hover-bg': evt.hoverBackground,
                                                '--hover-shadow': evt.hoverColor,
                                            }}
                                            onClick={() =>
                                                navigate(
                                                    `/event/${encodeURIComponent(evt.name)}`
                                                )
                                            }
                                        >
                                            <img
                                                src={evt.imageUrl}
                                                alt={evt.name}
                                                className="event-card-banner"
                                            />
                                            <div className="event-card-content">
                                                <div className="event-card-name">{decodeHTMLEntities(evt.name)}</div>
                                                <div className="event-card-description">
                                                    {decodeHTMLEntities(evt.description)}
                                                </div>
                                                <div className="event-card-meta">
                                                    Date: {evt.date} | Time: {evt.time} | Place: {decodeHTMLEntities(evt.place)}, {decodeHTMLEntities(evt.unit)}
                                                </div>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            className="event-club-section"
                                            initial={{ opacity: 0, y: 50 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5 }}
                                            whileHover={{ scale: 1.05 }}
                                            viewport={{ once: true, amount: 0.2 }}
                                            onClick={() => {
                                                console.log("Club data clicked:", club);
                                                
                                                if (!club || !club.id) {
                                                    console.error("Invalid club data:", club);
                                                    // Instead of going to error page, just do nothing
                                                    // or provide feedback to the user
                                                    return; // Stop here if no valid club ID
                                                } else {
                                                    navigate(`/club/${club.id}`);
                                                }
                                            }}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                cursor: club && club.id ? 'pointer' : 'not-allowed',
                                                opacity: club && club.id ? 1 : 0.6, // Visually show if clickable
                                                position: 'relative',  // Add these to improve clickability
                                                zIndex: 1
                                            }}
                                        >
                                            {club && club.logoUrl ? (
                                                <img
                                                    src={club.logoUrl}
                                                    alt={club.name || "Club"}
                                                    className="event-club-icon"
                                                />
                                            ) : (
                                                <div className="event-club-icon-placeholder">
                                                    Logo
                                                </div>
                                            )}
                                            <div className="event-club-name">{decodeHTMLEntities(club && club.name ? club.name : "Unknown Club")}</div>
                                        </motion.div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

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
                        <a
                            href="https://x.com/curtinuni"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={twitter} alt="Twitter" className="twitter" />
                        </a>
                        <a
                            href="https://www.facebook.com/curtinuniversity"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={facebook} alt="Facebook" className="facebook" />
                        </a>
                        <a
                            href="https://www.instagram.com/curtinuniversity/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={instagram} alt="Instagram" className="instagram" />
                        </a>
                        <a
                            href="https://www.youtube.com/user/CurtinUniversity"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={youtube} alt="YouTube" className="youtube" />
                        </a>
                        <a
                            href="https://www.linkedin.com/school/8788/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={linkedin} alt="LinkedIn" className="linkedin" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDirectory;