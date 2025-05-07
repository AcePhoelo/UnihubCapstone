import React, { useState, useEffect, useRef } from 'react';
import './CreationEvent.css';

const CreationEvent = () => {
    const [iconPreview, setIconPreview] = useState(null);
    const [eventName, setEventName] = useState('');
    const [description, setDescription] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventAddress, setEventAddress] = useState('');
    const [eventImage, setEventImage] = useState(null);
    const [clubName, setClubName] = useState(''); // Changed from Club ID to Club Name
    const [clubs, setClubs] = useState([]); // List of clubs
    const [formValid, setFormValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const fileInputRef = useRef(null);

    const maxDescriptionLength = 1500;

    // Fetch the list of clubs when the component mounts
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        fetch('http://54.169.81.75:8000/clubs/list', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setClubs(data);
                } else {
                    console.error('Invalid data format:', data);
                    setClubs([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching clubs:', error);
                setClubs([]);
            });
    }, []);

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
        const isFormValid =
            eventName.trim() !== '' &&
            description.trim() !== '' &&
            eventDate.trim() !== '' &&
            eventTime.trim() !== '' &&
            eventAddress.trim() !== '' &&
            eventImage &&
            clubName.trim() !== '';
        setFormValid(isFormValid);
    }, [eventName, description, eventDate, eventTime, eventAddress, eventImage, clubName]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formValid) return;

        const formData = new FormData();
        formData.append('name', eventName);
        formData.append('description', description);
        formData.append('date', eventDate);
        formData.append('time', `${eventTime}:00`); // Append seconds to ensure correct format
        formData.append('location', eventAddress);

        // Append the eventImage file directly
        const fileInput = document.getElementById('event-image-upload');
        if (fileInput && fileInput.files[0]) {
            formData.append('banner', fileInput.files[0]);
        }

        formData.append('club', clubName); // Send the club name instead of ID

        try {
            const response = await fetch('http://54.169.81.75:8000/api/event/add_event/create/', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
                body: formData,
            });

            if (response.ok) {
                alert('Event created successfully!');
                window.location.href = '/event-directory'; // Redirect to event directory
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || 'Failed to create event');
            }
        } catch (error) {
            console.error('Error creating event:', error);
            setErrorMessage('An error occurred while creating the event.');
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
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            className="event-input"
                        />
                        <div className="event-creation-description-group">
                            <textarea
                                className="event-creation-description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                                maxLength={maxDescriptionLength}
                            />
                            <div className={`description-char-counter ${description.length === maxDescriptionLength ? 'red' : ''}`}>
                                {description.length}/{maxDescriptionLength}
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
                                    type="time"
                                    value={eventTime}
                                    onChange={(e) => setEventTime(e.target.value)}
                                    className="detail-time-input"
                                />
                                <input
                                    type="text"
                                    placeholder="Street, Room"
                                    value={eventAddress}
                                    onChange={(e) => setEventAddress(e.target.value)}
                                    className="detail-input"
                                />
                                <select
                                    value={clubName}
                                    onChange={(e) => setClubName(e.target.value)}
                                    className="detail-input"
                                    required
                                >
                                    <option value="" disabled>
                                        Select Club
                                    </option>
                                    {clubs.map((club) => (
                                        <option key={club.id} value={club.id}>
                                            {club.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="details-right">
                            <div className="photo-rectangle" onClick={handlePhotoClick}>
                                    {iconPreview ? <img src={iconPreview} alt="Preview" /> : <span>+</span>}
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleIconChange}
                                    id="event-image-upload"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="submit-event-container">
                        <button className="creation-event-submit" type="submit" disabled={!formValid}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
    );
};

export default CreationEvent;