/* CreationClub.jsx */
import React, { useState, useEffect } from 'react';
import './CreationClub.css';

const CreationClub = () => {
    const [iconPreview, setIconPreview] = useState(null);
    const [clubName, setClubName] = useState('');
    const [description, setDescription] = useState('');
    const [members, setMembers] = useState(Array(10).fill(''));
    const [formValid, setFormValid] = useState(false);
    const [clubCreationText, setClubCreationText] = useState("");
    const maxDescriptionLength = 1500;
    const memberPattern = "^[A-Za-z]+( [A-Za-z]+)?, \\d{8}$";

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
        const clubInfoValid = clubName.trim() !== '' && clubCreationText.trim() !== '';
        const membersValid = members.every(value =>
            value.trim() !== '' && new RegExp(memberPattern).test(value)
        );
        setFormValid(clubInfoValid && membersValid);
    }, [clubName, clubCreationText, members]);

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
                                            value={clubCreationText}
                                            onChange={(e) => {
                                                if (e.target.value.length <= maxDescriptionLength) {
                                                    setClubCreationText(e.target.value);
                                                }
                                            }}
                                            placeholder="Description"
                                        />
                                        <div className={`description-char-counter ${clubCreationText.length === maxDescriptionLength ? 'red' : ''}`}>
                                            {clubCreationText.length}/{maxDescriptionLength}
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
                                                    placeholder={`LastName FirstName, StudentID`}
                                                    value={members[index]}
                                                    onChange={(e) => {
                                                        const newMembers = [...members];
                                                        newMembers[index] = e.target.value;
                                                        setMembers(newMembers);
                                                    }}
                                                    pattern={memberPattern}
                                                    title="Format: LastName FirstName, 8-digit ID"
                                                    required
                                                />
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* SUBMIT BUTTON */}
                    <button
                        className={`creation-submit ${formValid ? '' : 'disabled'}`}
                        disabled={!formValid}
                        onClick={() => {
                            window.opener.postMessage('clubRequest', '*');
                            window.close();
                        }}
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