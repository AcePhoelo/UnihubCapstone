/* CreationEvent.jsx */
import React, { useState, useEffect, useRef } from 'react';
import './CreationEvent.css';

const EvenCreation = () => {
    // Existing state variables (do not delete)
    const [iconPreview, setIconPreview] = useState(null);
    const [clubName, setClubName] = useState('');
    const [description, setDescription] = useState('');
    const [members, setMembers] = useState(Array(10).fill(''));
    const [formValid, setFormValid] = useState(false);
    const [eventCreationText, setEventCreationText] = useState("");
    const maxDescriptionLength = 1500;
    const memberPattern = "^[A-Za-z]+( [A-Za-z]+)?, \\d{8}$";

    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventAddress, setEventAddress] = useState('');
    const [eventImage, setEventImage] = useState(null);

    const fileInputRef = useRef(null);

    const handleIconChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEventImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setIconPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePhotoClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    useEffect(() => {
        const clubInfoValid = clubName.trim() !== '' && description.trim() !== '';
        const membersValid = members.every(value =>
            value.trim() !== '' && new RegExp(memberPattern).test(value)
        );
        const timeRegex = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;
        const detailsValid = eventDate && eventTime.trim() !== '' && timeRegex.test(eventTime) &&
            eventAddress.includes(',') && eventImage;
        setFormValid(clubInfoValid && membersValid && detailsValid);
    }, [clubName, description, members, eventDate, eventTime, eventAddress, eventImage]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formValid) {
            window.close();
        }
    };

    return (
        <div className="creation-event-page">
            <div className="creation-event-header">
                <div className="creation-event-name">Add Event</div>
            </div>
            <form onSubmit={handleSubmit} className="form-container">
                {/* Event Information Section */}
                <div className="event-information">
                    <h2>Event Information</h2>
                    <input
                        type="text"
                        placeholder="Event Name"
                        value={clubName}
                        onChange={(e) => setClubName(e.target.value)}
                        className="event-input"
                    />
                    <div className="event-creation-description-group">
                        <textarea
                            className="event-creation-description"
                            value={eventCreationText}
                            onChange={(e) => {
                                if (e.target.value.length <= maxDescriptionLength) {
                                    setEventCreationText(e.target.value);
                                }
                            }}
                            placeholder="Description"
                        />
                        <div className={`description-char-counter ${eventCreationText.length === maxDescriptionLength ? 'red' : ''}`}>
                            {eventCreationText.length}/{maxDescriptionLength}
                        </div>
                    </div>
                </div>

                {/* Details Section */}
                <div className="details">
                    <h2>Details</h2>
                    <div className="details-columns">
                        <div className="details-left">
                            <input
                                type="date"
                                value={eventDate}
                                onChange={(e) => setEventDate(e.target.value)}
                                className="detail-input"
                            />
                            <input
                                type="text"
                                placeholder="HH:MM AM/PM"
                                value={eventTime}
                                onChange={(e) => setEventTime(e.target.value)}
                                className="detail-time-input"
                                pattern="^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Street, Room"
                                value={eventAddress}
                                onChange={(e) => setEventAddress(e.target.value)}
                                className="detail-input"
                            />
                        </div>
                        <div className="details-right">
                            <div className="photo-rectangle" onClick={handlePhotoClick}>
                                {iconPreview ? (
                                    <img src={iconPreview} alt="Preview" />
                                ) : (
                                    <span>+</span>
                                )}
                            </div>
                            {/* Hidden file input */}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleIconChange}
                                ref={fileInputRef}
                                style={{ display: "none" }}
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="submit-event-container">
                    <button className="creation-event-submit" type="submit" disabled={!formValid}>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default EvenCreation;