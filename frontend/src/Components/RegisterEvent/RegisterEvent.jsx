import React, { useState, useEffect } from 'react';
import './RegisterEvent.css';
import { Dropdown } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import backIcon from '../../assets/Back.png';
import { useNotification } from '../Notification/Context';

const RegisterEvent = () => {
    const { eventName: encodedEventName } = useParams();
    const decodedName = decodeURIComponent(encodedEventName);
    const [selectedRole, setSelectedRole] = useState("Participant");
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const { success: success2, info, warning, error: error2 } = useNotification();
    const [error, setError] = useState(null);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    
    const navigate = useNavigate();
    const isGuest = localStorage.getItem('isGuest') === 'true';

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await fetch(`https://54.169.81.75:8000/api/event/add_event/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch event details');
                }

                const data = await response.json();
                const foundEvent = data.find(e => e.name === decodedName);
                
                if (foundEvent) {
                    setEvent(foundEvent);
                } else {
                    throw new Error('Event not found');
                }
            } catch (err) {
                console.error('Error fetching event:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [decodedName]);

    const handleSelect = (role) => setSelectedRole(role);

    const handleRegister = async () => {
        if (isGuest) {
            navigate('/login');
            return;
        }
    
        try {
            const token = localStorage.getItem('access_token');
            
            const response = await fetch('https://54.169.81.75:8000/api/event/event_registration/register/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    event: event.id,
                    role: selectedRole
                }),
            });
    
            if (response.ok) {
                setRegistrationSuccess(true);
                localStorage.setItem('just_registered_event', event.id.toString());
                
                setTimeout(() => {
                    navigate(`/event/${encodedEventName}`);
                }, 1000);
            } else {
                const errorData = await response.json();
                if (response.status === 403 && errorData.detail === "You are already registered for this event.") {
                    info("You are already registered for this event.");
                    navigate(`/event/${encodedEventName}`);
                } else {
                    throw new Error('Registration failed');
                }
            }
        } catch (err) {
            console.error('Error registering for event:', err);
            setError('Failed to register for event. Please try again.');
        }
    };

    if (loading) return <div className="loading">Loading event details...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!event) return <div className="event-not-found">Event not found.</div>;

    return (
        <div className="event-registration-page">
            <div className="event-registration-header">
                <img
                    src={backIcon}
                    alt="Back"
                    className="back-button"
                    onClick={() => navigate(-1)}
                    style={{ cursor: 'pointer', marginRight: '16px' }}
                />
                <div className="event-registration-eventname">{event.name}</div>
            </div>

            <div className="event-registration-body">
                <div className="event-registration-left">
                    <img src={event.banner} alt={event.name} className="event-registration-banner" />
                    <div className="event-registration-host">
                        Event Host: {event.club_details?.name || "Unknown Club"}
                    </div>
                    <div className="event-registration-info">
                        Time: {event.date}, {event.time}<br />
                        Location: {event.location}
                    </div>

                    <div className="event-registration-dropdown-group">
                        <label className="event-registration-dropdown-text">Choose your role</label>
                        <Dropdown>
                            <Dropdown.Toggle as="button" id="dropdown-role" className="event-registration-custom-dropdown">
                                {selectedRole}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleSelect("Organizer")}>Organizer</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleSelect("Volunteer")}>Volunteer</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleSelect("Participant")}>Participant</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>

                <div className="event-registration-right">
                    <div className="event-registration-info-box">
                        <h3>Registration Information</h3>
                        <p>
                            You will be registered using your account information.
                            Select your role in the event and click "Register" to confirm your participation.
                        </p>
                        {registrationSuccess && (
                            <div className="success-message">
                                Registration successful! Redirecting to event page...
                            </div>
                        )}
                    </div>
                    <div className="event-registration-button-wrapper">
                        <button
                            className="event-registration-button"
                            onClick={handleRegister}
                            disabled={registrationSuccess}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterEvent;