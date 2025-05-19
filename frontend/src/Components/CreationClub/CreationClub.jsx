// CreationClub.jsx
import React, { useState, useEffect } from 'react';
import './CreationClub.css';
import { useNavigate } from 'react-router-dom';
import backIcon from '../../assets/Back.png';
import { useNotification } from '../Notification/Context';
import { decodeHTMLEntities } from '../../utils';

const CreationClub = () => {
    const navigate = useNavigate();
    const [bannerPreview, setBannerPreview] = useState(null);
    const [iconPreview, setIconPreview] = useState(null);
    const [clubName, setClubName] = useState('');
    const [description, setDescription] = useState('');
    const [members, setMembers] = useState(Array(10).fill(''));
    const [formValid, setFormValid] = useState(false);
    const [currentUser, setCurrentUser] = useState({}); // Add this line
    const [errorMessage, setErrorMessage] = useState('');
    const maxDescriptionLength = 1500;
    const { success: success2, error: error2 } = useNotification();
    const [isLoading, setIsLoading] = useState(false);

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

    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBannerPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch('https://curtinunihubplus.com/profile/profile/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    }
                });
                
                if (response.ok) {
                    const userData = await response.json();
                    console.log('Fetched user data:', userData);
                    console.log('Student ID from API:', userData.studentid);
                    console.log('User ID from API:', userData.id);
                    setCurrentUser(userData);
                } else {
                    console.error('Failed to fetch profile:', response.status, response.statusText);
                    error2('Error fetching user profile. Please log in again.');
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
                error2('Could not verify your account. Please log in again.');
            }
        };
        
        fetchUserProfile();
    }, []);

    useEffect(() => {
        const clubInfoValid = clubName.trim() !== '' && description.trim() !== '';
        const membersValid = members.every((id) => id.trim() !== '' && /^\d{8}$/.test(id));
        setFormValid(clubInfoValid && membersValid);
    }, [clubName, description, members]);
        
    const resetForm = () => {
        setClubName('');
        setDescription('');
        setMembers(Array(10).fill(''));
        setBannerPreview(null);
        setIconPreview(null);
        setErrorMessage('');
        // Reset file inputs
        if (document.getElementById('icon-upload')) {
            document.getElementById('icon-upload').value = '';
        }
        if (document.getElementById('banner-upload')) {
            document.getElementById('banner-upload').value = '';
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('name', clubName);
        formData.append('description', description);
        
        // Enhanced validation
        if (!currentUser || !currentUser.studentid) {
            error2('User profile information is missing. Please log in again.');
            setIsLoading(false);
            return;
        }
        
        // Use studentid instead of id - this should match the USER_PROFILE_STUDENT table's primary key
        console.log('Using president_id:', currentUser.id);
        formData.append('president_id', currentUser.id);
        
        if (iconPreview) {
            formData.append('logo', document.getElementById('icon-upload').files[0]);
        }
        if (bannerPreview) {
            formData.append('banner', document.getElementById('banner-upload').files[0]);
        }
        
        // Log form data for debugging
        console.log('Form data president_id:', formData.get('president_id'));
        
        members.forEach((member, index) => {
            formData.append(`members[${index}]`, member);
        });

        try {
            console.log('Submitting club creation with president_id:', formData.get('president_id'));
            const response = await fetch('https://curtinunihubplus.com/clubs/clubs/create/', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                success2('Club created successfully!');
                navigate(`/club/${data.club.id}`);
            } else {
                const errorData = await response.json();
                error2(decodeHTMLEntities(errorData.error || 'Failed to create club. Please try again.'));
                // Reset the form when an error occurs
                resetForm();
            }
        } catch (error) {
            console.error('Error creating club:', error);
            // Try to get more details about the error
            try {
                const errorResponse = await error.response?.json();
                console.error('Error details:', errorResponse);
                error2('An error occurred while creating the club: ' + 
                    (errorResponse?.detail || errorResponse?.error || error.message || 'Unknown error'));
            } catch (e) {
                error2('An error occurred while creating the club. Please try again.');
            }
            
            resetForm();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="creation-club-page">
            <div className="creation-header">
                <img
                    src={backIcon}
                    alt="Back"
                    className="back-button"
                    onClick={() => navigate(-1)}
                    style={{ cursor: 'pointer', marginRight: '16px' }}
                />
                <div className="creation-name">Add Club</div>
            </div>
            <div className="creation-body">
                <div className="form-wrapper">
                    <div className="content-wrapper">
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
                                                if (
                                                    e.target.value.length <=
                                                    maxDescriptionLength
                                                ) {
                                                    setDescription(e.target.value);
                                                }
                                            }}
                                            placeholder="Description"
                                        />
                                        <div
                                            className={`description-char-counter ${description.length ===
                                                    maxDescriptionLength
                                                    ? 'red'
                                                    : ''
                                                }`}
                                        >
                                            {description.length}/{maxDescriptionLength}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="media-pickers">
                                <div className="creation-icon">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="icon-upload"
                                        style={{ display: 'none' }}
                                        onChange={handleIconChange}
                                    />
                                    <label
                                        htmlFor="icon-upload"
                                        className="club-creation-icon"
                                    >
                                        {iconPreview ? (
                                            <img
                                                src={iconPreview}
                                                alt="Club Icon"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    borderRadius: '50%',
                                                }}
                                            />
                                        ) : (
                                            '+'
                                        )}
                                    </label>
                                    <div className="icon-size">
                                        Club Icon (500x500px)
                                    </div>
                                </div>

                                <div className="creation-banner">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="banner-upload"
                                        style={{ display: 'none' }}
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setBannerPreview(reader.result);
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                    <label
                                        htmlFor="banner-upload"
                                        className="club-creation-banner"
                                    >
                                        {bannerPreview ? (
                                            <img
                                                src={bannerPreview}
                                                alt="Club Banner"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        ) : (
                                            '+'
                                        )}
                                    </label>
                                    <div className="banner-size">
                                        Club Banner (1024x576px)
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="creation-members">
                            <div className="creation-title">Members (min. 10)</div>
                            <div className="shared-columns">
                                {[0, 1].map((col) => (
                                    <div className="members-column" key={col}>
                                        {Array(5)
                                            .fill(0)
                                            .map((_, i) => {
                                                const idx = col * 5 + i;
                                                return (
                                                    <input
                                                        key={idx}
                                                        type="text"
                                                        className="creation-input"
                                                        placeholder="StudentID (8 digits)"
                                                        value={members[idx]}
                                                        onChange={(e) => {
                                                            const m = [...members];
                                                            m[idx] = e.target.value;
                                                            setMembers(m);
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

                    {errorMessage && (
                        <div className="error-message">{decodeHTMLEntities(errorMessage)}</div>
                    )}

                    <button
                        className={`creation-submit ${formValid && !isLoading ? '' : 'disabled'}`}
                        disabled={!formValid || isLoading}
                        onClick={formValid && !isLoading ? handleSubmit : undefined}
                        style={{ opacity: isLoading ? 0.7 : 1 }}
                    >
                        {isLoading ? 'Processing...' : 'Submit'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreationClub;