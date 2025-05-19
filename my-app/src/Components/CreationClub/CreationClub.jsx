import React, { useState, useEffect } from 'react';
import './CreationClub.css';

const CreationClub = () => {
    const [iconPreview, setIconPreview] = useState(null);
    const [clubName, setClubName] = useState('');
    const [description, setDescription] = useState('');
    const [members, setMembers] = useState(Array(10).fill('')); // Array for 10 StudentIDs
    const [formValid, setFormValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const maxDescriptionLength = 1500;

    const handleIconChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setIconPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        const clubInfoValid = clubName.trim() !== '' && description.trim() !== '';
        const membersValid = members.every((id) => id.trim() !== '' && /^\d{8}$/.test(id)); // Validate 8-digit StudentIDs
        setFormValid(clubInfoValid && membersValid);
    }, [clubName, description, members]);

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('name', clubName);
        formData.append('description', description);
        if (iconPreview) {
            formData.append('logo', document.getElementById('icon-upload').files[0]); // Append the file directly
        }
        members.forEach((member, index) => {
            formData.append(`members[${index}]`, member); // Append each member ID
        });
    
        try {
            const response = await fetch('https://curtinunihubplus.com/clubs/clubs/create/', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
                body: formData, // Send FormData
            });
    
            if (response.ok) {
                const data = await response.json();
                alert('Club created successfully!');
                window.location.href = `/club/${data.club.id}`;
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || 'Failed to create club');
            }
        } catch (error) {
            console.error('Error creating club:', error);
            setErrorMessage('An error occurred while creating the club.');
        }
    };

    return (
        <div className="creation-club-page">
            <div className="creation-header">
                <div className="creation-name">Add Club</div>
            </div>

            <div className="creation-body">
                <div className="form-wrapper">
                    <div className="content-wrapper">
                        {/* TOP SECTION */}
                        <div className="shared-columns">
                            <div className="club-information">
                                <div className="creation-title">Club Information</div>
                                <div className="creation-inputs">
                                    <input
                                        type="text"
                                        className="creation-input"
                                        placeholder="Club Name"
                                        value={clubName}
                                        onChange={(e) => setClubName(e.target.value)}
                                        required
                                    />
                                    <div className="club-creation-description-group">
                                        <textarea
                                            className="club-creation-description"
                                            value={description}
                                            onChange={(e) => {
                                                if (e.target.value.length <= maxDescriptionLength) {
                                                    setDescription(e.target.value);
                                                }
                                            }}
                                            placeholder="Description"
                                        />
                                        <div className={`description-char-counter ${description.length === maxDescriptionLength ? 'red' : ''}`}>
                                            {description.length}/{maxDescriptionLength}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="creation-icon">
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="icon-upload"
                                    style={{ display: 'none' }}
                                    onChange={(e) => handleIconChange(e)}
                                />
                                <label htmlFor="icon-upload" className="club-creation-icon">
                                    {iconPreview ? (
                                        <img src={iconPreview} alt="Club Icon" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                                    ) : (
                                        '+'
                                    )}
                                </label>
                                <div className="icon-size">Club Icon (500x500px)</div>
                            </div>
                        </div>

                        {/* MEMBERS SECTION */}
                        <div className="creation-members">
                            <div className="creation-title">Members (min. 10)</div>
                            <div className="shared-columns">
                                {[0, 1].map((column) => (
                                    <div className="members-column" key={column}>
                                        {[...Array(5)].map((_, i) => {
                                            const index = column * 5 + i;
                                            return (
                                                <input
                                                    key={index}
                                                    type="text"
                                                    className="creation-input"
                                                    placeholder="StudentID (8 digits)"
                                                    value={members[index]}
                                                    onChange={(e) => {
                                                        const newMembers = [...members];
                                                        newMembers[index] = e.target.value;
                                                        setMembers(newMembers);
                                                    }}
                                                    pattern="\d{8}"
                                                    title="Enter an 8-digit StudentID"
                                                    required
                                                />
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ERROR MESSAGE */}
                    {errorMessage && <div className="error-message">{errorMessage}</div>}

                    {/* SUBMIT BUTTON */}
                    <button
                        className={`creation-submit ${formValid ? '' : 'disabled'}`}
                        disabled={!formValid}
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
            <div className="invisible-footer"></div>
        </div>
    );
};

export default CreationClub;