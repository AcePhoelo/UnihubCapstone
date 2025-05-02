import React, { useState, useEffect, useRef } from 'react';
import './RegisterEvent.css';
import clubsWithEvents from '../../data/mockClubs';
import { Dropdown } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const RegisterEvent = ({ eventName }) => {
    const { eventName: encodedEventName } = useParams();
    const [selectedRole, setSelectedRole] = useState("Participant");
    const [event, setEvent] = useState(null);

    const [curtinId, setCurtinId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [email, setEmail] = useState("");

    const formRef = useRef(null);
    const [isFormValid, setIsFormValid] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const decoded = decodeURIComponent(encodedEventName || eventName);
        for (let club of clubsWithEvents) {
            const found = club.events.find(e => e.title === decoded);
            if (found) {
                setEvent({ ...found, host: club.name });
                break;
            }
        }
    }, [eventName]);

    useEffect(() => {
        if (formRef.current) {
            setIsFormValid(formRef.current.checkValidity());
        }
    }, [curtinId, firstName, secondName, email]);

    const handleSelect = (role) => setSelectedRole(role);

    const handleRegister = (e) => {
        e.preventDefault();
        if (formRef.current.checkValidity()) {
            if (window.opener) {
                window.opener.postMessage({ type: 'EVENT_REGISTERED' }, '*');
            }
            window.close();
        }
    };

    if (!event) return <div>Loading...</div>;

    return (
        <div className="event-registration-page">
            <div className="event-registration-header">
                <div className="event-registration-eventname">{event.title}</div>
            </div>

            <div className="event-registration-body">
                {/* Left Column */}
                <div className="event-registration-left">
                    <img src={event.bannerUrl} alt={event.title} className="event-registration-banner" />
                    <div className="event-registration-host">Event Host: {event.host}</div>
                    <div className="event-registration-info">
                        Time: {event.date}, {event.time}<br />
                        Location: {event.unit}
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

                {/* Right Column */}
                <div className="event-registration-right">
                    <form className="event-registration-form-box" ref={formRef} noValidate>
                        <div className="event-form-group">
                            <label className="event-form-label">Curtin ID</label>
                            <input
                                type="text"
                                className="event-form-input"
                                value={curtinId}
                                onChange={e => setCurtinId(e.target.value)}
                                pattern="\d{8}"
                                required
                                placeholder=""
                            />
                        </div>
                        <div className="event-form-group">
                            <label className="event-form-label">First Name</label>
                            <input
                                type="text"
                                className="event-form-input"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="event-form-group">
                            <label className="event-form-label">Second Name</label>
                            <input
                                type="text"
                                className="event-form-input"
                                value={secondName}
                                onChange={e => setSecondName(e.target.value)}
                            />
                        </div>
                        <div className="event-form-group">
                            <label className="event-form-label">Email</label>
                            <input
                                type="email"
                                className="event-form-input"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                placeholder=""
                            />
                        </div>
                    </form>
                    <div className="event-registration-button-wrapper">
                        <button
                            className="event-registration-button"
                            disabled={!isFormValid}
                            onClick={handleRegister}
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