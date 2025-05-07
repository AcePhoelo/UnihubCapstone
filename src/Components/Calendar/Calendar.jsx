/* Calendar.jsx */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Calendar.css';
import logo from '../../assets/logo.png';
import calendar from '../../assets/calendar.png';
import chooseMonth from '../../assets/choose-month.png';

const Calendar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [studentName, setStudentName] = useState('');
    const [studentID, setStudentID] = useState('');
    const studentEmail = localStorage.getItem('studentEmail');

    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState('month');
    const [showMonthPicker, setShowMonthPicker] = useState(false);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const timeToMinutes = (timeStr) => {
        if (!timeStr) return 0;
        const [time, modifier] = timeStr.trim().split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (modifier && modifier.toUpperCase() === "PM" && hours !== 12) {
            hours += 12;
        }
        if (modifier && modifier.toUpperCase() === "AM" && hours === 12) {
            hours = 0;
        }
        return hours * 60 + minutes;
    };

    const formatLocalDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;  // Use hyphens instead of slashes
    };

    const getWeekRange = (date) => {
        const start = new Date(date);
        const day = start.getDay();
        start.setDate(start.getDate() - day);
        start.setHours(0, 0, 0, 0);
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        end.setHours(23, 59, 59, 999);
        return { start, end };
    };

    const isToday = currentDate.toDateString() === new Date().toDateString();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem('access_token'); // Assuming token-based authentication
                const response = await fetch('http://54.169.81.75:8000/api/event/add_event/', {
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
    
                // Map the backend response to the format expected by the Calendar
                const formattedEvents = data.map(event => ({
                    id: event.id,
                    date: event.date, // Ensure the backend provides the date in 'YYYY/MM/DD' format
                    time: event.time, // Ensure the backend provides the time in 'HH:MM AM/PM' format
                    name: event.name,
                    place: event.location,
                    unit: event.club_details?.name || 'Unknown Club', // Use club_details instead
                }));
    
                setEvents(formattedEvents);
            } catch (error) {
                console.error('Error fetching events:', error);
                setError('Failed to load events.');
            } finally {
                setLoading(false);
            }
        };
    
        fetchEvents();
    }, []);

    useEffect(() => {
        if (studentEmail) {
            fetch(`https://your-django-backend.com/api/students/?email=${studentEmail}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
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

    // Navigation handlers
    const handleLogoClick = () => navigate('/club-directory');
    const handleClubsClick = () => navigate('/club-directory');
    const handleEventsClick = () => navigate('/event-directory');
    const handleActivityClick = () => navigate('/my-activity');
    const handleProfileClick = () => navigate('/profile');
    const handleCalendarClick = () => navigate('/calendar');

    const getInitials = (fullName) => {
        const names = fullName.trim().split(' ');
        return names[0]?.charAt(0).toUpperCase() + (names[1]?.charAt(0).toUpperCase() || '');
    };

    // Navigation functions
    const handlePrevMonth = () => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        setCurrentDate(newDate);
    };

    const handleNextMonth = () => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        setCurrentDate(newDate);
    };

    const handlePrevWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() - 7);
        setCurrentDate(newDate);
    };

    const handleNextWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + 7);
        setCurrentDate(newDate);
    };

    const handlePrevDay = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() - 1);
        setCurrentDate(newDate);
    };

    const handleNextDay = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + 1);
        setCurrentDate(newDate);
    };

    const handleToday = () => {
        setCurrentDate(new Date());
    };

    const handleViewChange = (newView) => {
        setView(newView);
    };

    const formatMonthYear = (date) => {
        const options = { month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const formatDayTitle = (date) => {
        const options = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const handlePrevYear = () => {
        const newDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1);
        setCurrentDate(newDate);
    };

    const handleNextYear = () => {
        const newDate = new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1);
        setCurrentDate(newDate);
    };

    const handleMonthSelect = (monthIndex) => {
        const newDate = new Date(currentDate.getFullYear(), monthIndex, 1);
        setCurrentDate(newDate);
        setShowMonthPicker(false);
    };

    const EventBox = ({ time, name, place, unit }) => {
        return (
            <div className="calendar-event-box">
                <div className="calendar-event-time">{time}</div>
                <div className="calendar-event-name">{name}</div>
                <div className="calendar-event-place">{place}</div>
                <div className="calendar-event-unit">{unit}</div>
            </div>
        );
    };

    /* MONTH VIEW */
    const generateMonthGrid = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const numDays = lastDayOfMonth.getDate();
        const startDay = firstDayOfMonth.getDay();

        const weeks = [];
        let week = [];

        if (startDay > 0) {
            const prevMonthLastDay = new Date(year, month, 0).getDate();
            for (let i = startDay - 1; i >= 0; i--) {
                week.push(new Date(year, month - 1, prevMonthLastDay - i));
            }
        }

        for (let day = 1; day <= numDays; day++) {
            week.push(new Date(year, month, day));
            if (week.length === 7) {
                weeks.push(week);
                week = [];
            }
        }

        if (week.length > 0) {
            let nextMonthDay = 1;
            while (week.length < 7) {
                week.push(new Date(year, month + 1, nextMonthDay));
                nextMonthDay++;
            }
            weeks.push(week);
        }
        return weeks;
    };

    const weeks = generateMonthGrid();

    /* WEEK VIEW */
    const getStartOfWeek = (date) => {
        const day = date.getDay();
        const start = new Date(date);
        start.setDate(date.getDate() - day);
        start.setHours(0, 0, 0, 0);
        return start;
    };

    const startOfWeek = getStartOfWeek(currentDate);
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date(startOfWeek);
        d.setDate(startOfWeek.getDate() + i);
        weekDays.push(d);
    }

    const weekTitle = `${monthNames[startOfWeek.getMonth()]} ${startOfWeek.getDate()} - ${monthNames[weekDays[6].getMonth()]} ${weekDays[6].getDate()} ${weekDays[6].getFullYear()}`;

    const hours = [];
    for (let h = 0; h < 24; h++) {
        const period = h >= 12 ? 'pm' : 'am';
        let display = h % 12;
        if (display === 0) display = 12;
        hours.push(`${display}${period}`);
    }

    const isGuest = localStorage.getItem('isGuest') === 'true';

    return (
        <div className="calendar-page">
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
                        style={{
                            cursor: 'pointer',
                            fontSize: isGuest ? '14px' : '24px'
                        }}

                    >
                        {isGuest ? 'LOGIN' : getInitials(studentName || "John BROWN")}
                    </div>
                    <img src={calendar} alt="Calendar" className="calendar-icon"
                        onClick={handleCalendarClick}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
            </div>

            <div className="calendar-container">
                {/* Timezone Information */}
                <div className="timezone-info">
                    All events shown in Asia/Singapore time.
                </div>
                {/* Calendar Controls */}
                <div className="controls-wrapper">
                    <div className="controls-left">
                        <div className="arrow-btn-container">
                            <div
                                className="arrow-section arrow-left"
                                onClick={() => {
                                    if (view === 'month') handlePrevMonth();
                                    else if (view === 'week') handlePrevWeek();
                                    else if (view === 'day') handlePrevDay();
                                }}
                            >
                                &lt;
                            </div>
                            <div
                                className="arrow-section arrow-right"
                                onClick={() => {
                                    if (view === 'month') handleNextMonth();
                                    else if (view === 'week') handleNextWeek();
                                    else if (view === 'day') handleNextDay();
                                }}
                            >
                                &gt;
                            </div>
                        </div>
                        <button
                            className={`today-btn ${isToday ? '' : 'not-current'}`}
                            onClick={handleToday}
                        >
                            today
                        </button>
                        <div className="calendar-select-container">
                            <button
                                className="calendar-select-btn"
                                onClick={() => setShowMonthPicker(!showMonthPicker)}
                            >
                                <img src={chooseMonth} alt="Select Month/Year" className="select-icon" />
                            </button>
                            {showMonthPicker && (
                                <div className="month-picker-popup">
                                    <div className="month-picker-header">
                                        <button className="year-arrow" onClick={handlePrevYear}>
                                            &lt;
                                        </button>
                                        <span className="year-label">{currentDate.getFullYear()}</span>
                                        <button className="year-arrow" onClick={handleNextYear}>
                                            &gt;
                                        </button>
                                    </div>
                                    <div className="month-picker-grid">
                                        {monthNames.map((month, index) => (
                                            <div
                                                key={index}
                                                className={`month-picker-cell ${index === currentDate.getMonth() ? 'active' : ''}`}
                                                onClick={() => handleMonthSelect(index)}
                                            >
                                                {month}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="controls-center">
                        {view === 'week' ? (
                            <span className="current-week">{weekTitle}</span>
                        ) : view === 'month' ? (
                            <span className="current-month">{formatMonthYear(currentDate)}</span>
                        ) : (
                            <span className="current-day">{formatDayTitle(currentDate)}</span>
                        )}
                    </div>
                    <div className="controls-right">
                        <div className="view-btn-container">
                            <div
                                className={`view-segment ${view === 'month' ? 'active' : ''}`}
                                onClick={() => handleViewChange('month')}
                            >
                                month
                            </div>
                            <div
                                className={`view-segment ${view === 'week' ? 'active' : ''}`}
                                onClick={() => handleViewChange('week')}
                            >
                                week
                            </div>
                            <div
                                className={`view-segment ${view === 'day' ? 'active' : ''}`}
                                onClick={() => handleViewChange('day')}
                            >
                                day
                            </div>
                        </div>
                    </div>
                </div>

                {loading && <div className="loading-text">Loading calendar events...</div>}
                {error && <div className="error-text">{error}</div>}

                {/* MONTH VIEW */}
                {view === 'month' && !loading && (
                    <div className="month-view">
                        <div className="calendar-table">
                            <div className="weekday-header">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                    <div key={day} className="weekday">
                                        {day}
                                    </div>
                                ))}
                            </div>
                            <div className="date-grid">
                                {weeks.map((week, i) => (
                                    <div key={i} className="week-row">
                                        {week.map((date, idx) => {
                                            const cellDateStr = date ? formatLocalDate(date) : '';
                                            const dayEvents = date ? events.filter(evt => evt.date === cellDateStr) : [];
                                            return (
                                                <div
                                                    key={idx}
                                                    className={`date-cell ${date && date.toDateString() === new Date().toDateString() ? 'today' : ''} ${date && date.getMonth() !== currentDate.getMonth() ? 'not-in-month' : ''}`}
                                                >
                                                    <div className="date-label">
                                                        {date ? date.getDate() : ''}
                                                    </div>
                                                    {dayEvents
                                                        .sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time))
                                                        .map((evt) => (
                                                            <EventBox
                                                                key={evt.id}
                                                                time={evt.time}
                                                                name={evt.name}
                                                                place={evt.place}
                                                                unit={evt.unit}
                                                            />
                                                        ))}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* WEEK VIEW */}
                {view === 'week' && !loading && (
                    <>
                        <div className="week-fixed-container">
                            <div className="week-header">
                                <div className="week-header-cell time-header"></div>
                                {weekDays.map((day, index) => (
                                    <div key={index} className="week-header-cell day-header">
                                        {day.toLocaleDateString('en-US', { weekday: 'short' })} {day.getMonth() + 1}/{day.getDate()}
                                    </div>
                                ))}
                                {/* Extra spacer column */}
                                <div className="scrollbar-spacer"></div>
                            </div>
                            <div className="all-day-container">
                                <div className="time-column all-day-cell">all-day</div>
                                {weekDays.map((day, index) => (
                                    <div key={index} className="day-column all-day-row"></div>
                                ))}
                                <div className="scrollbar-spacer"></div>
                            </div>
                            <div className="today-highlight-row">
                                <div className="time-cell"></div>
                                {weekDays.map((day, index) => {
                                    const isTodayWeek = day.toDateString() === new Date().toDateString();
                                    return (
                                        <div
                                            key={index}
                                            className={`today-highlight-cell ${isTodayWeek ? 'highlight' : ''}`}
                                        ></div>
                                    );
                                })}
                                <div className="scrollbar-spacer"></div>
                            </div>
                        </div>

                        <div className="hours-scroll-wrapper">
                            <div className="hours-scroll-container">
                                <div className="week-grid">
                                    <div className="time-column">
                                        {hours.map((hr, idx) => (
                                            <div key={idx} className="time-row">
                                                <div className="time-cell hour-label">{hr}</div>
                                                <div className="time-cell half-hour"></div>
                                            </div>
                                        ))}
                                    </div>
                                    {weekDays.map((day, index) => {
                                        const dayStr = formatLocalDate(day);
                                        const dayEvents = events.filter(evt => evt.date === dayStr);
                                        return (
                                            <div key={index} className="day-column">
                                                {dayEvents.map((evt) => {
                                                    const minutes = timeToMinutes(evt.time);
                                                    const topOffset = (minutes / 60) * 80;
                                                    const eventDurationPx = 80 * 2;
                                                    return (
                                                        <div
                                                            key={evt.id}
                                                            className="week-calendar-event-box"
                                                            style={{ top: `${topOffset}px`, height: `${eventDurationPx}px` }}
                                                        >
                                                            <div className="calendar-event-time">{evt.time}</div>
                                                            <div className="calendar-event-name">{evt.name}</div>
                                                            <div className="calendar-event-name">{evt.place}</div>
                                                            <div className="calendar-event-name">{evt.unit}</div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* DAY VIEW */}
                {view === 'day' && !loading && (
                    <div className="calendar-day-view">
                        <div className="day-fixed-container">
                            <div className="day-header">
                                <div className="day-header-cell time-header"></div>
                                <div className="day-header-cell day-header day-today-header">
                                    {currentDate.toLocaleDateString('en-US', { weekday: 'long' })} {currentDate.getMonth() + 1}/{currentDate.getDate()}
                                </div>
                                {/* Extra spacer column */}
                                <div className="scrollbar-spacer"></div>
                            </div>
                            <div className="day-all-day-container">
                                <div className="time-column day-all-day-cell">all-day</div>
                                <div className="hour-column day-all-day-row"></div>
                                <div className="scrollbar-spacer"></div>
                            </div>
                            <div className="day-today-highlight-row">
                                <div className="day-time-cell"></div>
                                <div
                                    className={`day-today-highlight-cell ${new Date().toDateString() === currentDate.toDateString() ? 'day-highlight' : ''}`}
                                ></div>
                                <div className="scrollbar-spacer"></div>
                            </div>
                        </div>
                        <div className="day-scroll-wrapper">
                            <div className="day-scroll-container">
                                <div className="day-grid">
                                    <div className="day-time-column">
                                        {hours.map((hr, idx) => (
                                            <div key={idx} className="day-time-row">
                                                <div className="day-time-cell day-hour-label">{hr}</div>
                                                <div className="day-time-cell day-half-hour"></div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="hour-column">
                                        {events
                                            .filter(evt => evt.date === formatLocalDate(currentDate))
                                            .map((evt) => {
                                                const minutes = timeToMinutes(evt.time);
                                                const topOffset = (minutes / 60) * 80;
                                                const eventDurationPx = 80 * 2;
                                                return (
                                                    <div
                                                        key={evt.id}
                                                        className="day-calendar-event-box"
                                                        style={{ top: `${topOffset}px`, height: `${eventDurationPx}px` }}
                                                    >
                                                        <div className="calendar-event-time">{evt.time}</div>
                                                        <div className="calendar-event-name">{evt.name}</div>
                                                        <div className="calendar-event-name">{evt.place}</div>
                                                        <div className="calendar-event-name">{evt.unit}</div>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Calendar;