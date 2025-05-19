import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Feedback.css';
import './MultiSteps.css';
import Dropdown from 'react-bootstrap/Dropdown';
import satisfied from '../../assets/satisfied.png';
import fine from '../../assets/fine.png';
import unsatisfied from '../../assets/unsatisfied.png';
import satisfied_n from '../../assets/satisfied_n.png';
import fine_n from '../../assets/fine_n.png';
import unsatisfied_n from '../../assets/unsatisfied_n.png';
import backIcon from '../../assets/Back.png';
import { useNotification } from '../Notification/Context';
import { decodeHTMLEntities } from '../../utils';

const Feedback = () => {
    const navigate = useNavigate();
    const { success: success2, error: error2, confirm } = useNotification();
    const { eventName } = useParams();
    const decodedEventName = decodeURIComponent(eventName || '');
    const [event, setEvent] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const [selectedRole, setSelectedRole] = useState("Participant");
    const [step, setStep] = useState(1);
    const progressRef = useRef(null);
    const circlesRef = useRef([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [feedbackText, setFeedbackText] = useState("");
    const maxTextLength = 150; 

    const [like, setLike] = useState('');
    const [dislike, setDislike] = useState('');
    const [satisfaction, setSatisfaction] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await fetch(`https://curtinunihubplus.com/api/event/add_event/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (response.ok) {
                    const events = await response.json();
                    const foundEvent = events.find(e => e.name === decodedEventName);
                    if (foundEvent) {
                        setEvent(foundEvent);
                    } else {
                        setError('Event not found');
                    }
                } else {
                    setError('Failed to fetch event');
                }
            } catch (error) {
                console.error('Error fetching event:', error);
                setError('An error occurred while fetching the event');
            } finally {
                setLoading(false);
            }
        };
        
        if (decodedEventName) {
            fetchEvent();
        }
    }, [decodedEventName]);

    useEffect(() => {
        const profile = JSON.parse(localStorage.getItem('profile'));
        if (profile) {
            setUserProfile(profile);
        }
    }, []);

    useEffect(() => {
        if (progressRef.current && circlesRef.current.length > 0) {
            // Calculate the height between first and last circle
            const firstCirclePos = 15; // Half of circle height
            const lastCirclePos = 310; // Total height minus half circle height
            const progressHeight = lastCirclePos - firstCirclePos;
            
            // Update height based on current step
            if (step === 1) {
                progressRef.current.style.height = '0px';
            } else if (step === 2) {
                progressRef.current.style.height = `${progressHeight / 2}px`;
            } else if (step === 3) {
                progressRef.current.style.height = `${progressHeight}px`;
            }
            
            // Don't manipulate positions here - CSS handles that now
            // This avoids the issue of circles disappearing or moving
        }
    }, [step]);

    const handleSelect = (eventKey) => {
        setSelectedRole(eventKey);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };


    const nextStep = () => {
        if (step === 1) {
            if (!selectedRole) {
                error2('Please select your role before proceeding.');
                return;
            }
        } else if (step === 2) {
            if (!like) {
                error2('Please enter what you liked most.');
                return;
            }
            if (!dislike) {
                error2('Please enter what you disliked most.');
                return;
            }
            if (!satisfaction) {
                error2('Please select your satisfaction level.');
                return;
            }
        }
        
        if (step < 3) setStep(step + 1);
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setSatisfaction(image);
    };

    const validateForm = () => {
        const missingFields = [];
        
        if (!selectedRole) missingFields.push('Role');
        if (!like) missingFields.push('What you liked');
        if (!dislike) missingFields.push('What you disliked');
        if (!satisfaction) missingFields.push('Satisfaction rating');
        if (!feedbackText) missingFields.push('Experience description');
        
        return {
            isValid: missingFields.length === 0,
            missingFields
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!event || !userProfile) {
            error2('Missing event or user information. Please try again.');
            return;
        }

        // Validate the form
        const { isValid, missingFields } = validateForm();
        
        if (!isValid) {
            error2(`Please fill in all required fields: ${missingFields.join(', ')}`);
            return;
        }

        const feedbackData = {
            event: event.id,
            role: selectedRole,
            like,
            dislike,
            satisfaction,
            experience: feedbackText,
        };


    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch('https://curtinunihubplus.com/api/feedback/feedback/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(feedbackData),
            });

            if (response.ok) {
                setSuccess(true);
                setError('');
                success2('Feedback submitted successfully!');
                
                // Add a small delay before navigation to ensure notifications show up
                setTimeout(() => {
                    try {
                        // Check if event exists and has a name property
                        if (event && event.name) {
                            navigate(`/event/${encodeURIComponent(event.name)}`);
                        } else {
                            // Fallback navigation if event name is missing
                            navigate('/dashboard');
                            console.log('Event name was missing, navigated to dashboard instead');
                        }
                    } catch (navError) {
                        console.error('Navigation error:', navError);
                        // Show a message but don't treat it as an error
                        success2('Feedback submitted successfully! Please return to the previous page.');
                    }
                }, 500);
            } else {
                    try {
                        const errorData = await response.json();
                        const errorMessage = typeof errorData === 'object' 
                            ? Object.entries(errorData).map(([field, errors]) => `${field}: ${decodeHTMLEntities(errors)}`).join(', ')
                            : decodeHTMLEntities(errorData.detail || 'Failed to submit feedback.');
                        setError(errorMessage);
                        error2(errorMessage);
                        
                        // Automatically navigate back to event page after displaying error
                        setTimeout(() => {
                            if (event && event.name) {
                                navigate(`/event/${encodeURIComponent(event.name)}`);
                            } else {
                                navigate('/dashboard');
                            }
                        }, 2000); // 2 seconds delay to ensure the user sees the error message
                    } catch (jsonError) {
                        // Handle case where response isn't valid JSON
                        setError('Server returned an invalid response');
                        error2('Server returned an invalid response');
                        
                        // Also redirect on JSON parsing errors
                        setTimeout(() => {
                            if (event && event.name) {
                                navigate(`/event/${encodeURIComponent(event.name)}`);
                            } else {
                                navigate('/dashboard');
                            }
                        }, 2000);
                    }
                }
        } catch (err) {
            console.error('Error submitting feedback:', err);
            const errorMessage = 'An error occurred while submitting feedback.';
            setError(errorMessage);
            error2(errorMessage);
        }
    };
    

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

return (
    <div>
        <div className="feedback-header">
            <img
                src={backIcon}
                alt="Back"
                className="back-button"
                onClick={() => navigate(-1)}
                style={{ cursor: 'pointer', marginRight: '16px' }}
            />
            <div className="feedback-eventname">{decodeHTMLEntities(decodedEventName)} Feedback</div>
        </div>
        
        <div className="feedback-wrapper">
            <div className="feedback-content">
                {/* Progress bar */}
                <div className="steps-container">
                    <div className="custom-progress-container">
                        <div className="progress" ref={progressRef}></div>
                        {[1, 2, 3].map((num, index) => (
                            <div
                                key={num}
                                ref={(el) => (circlesRef.current[index] = el)}
                                className={`circle ${step >= num ? 'active' : ''}`}
                            >
                                {num}
                            </div>
                        ))}
                    </div>
                </div>
            <div className='feedback-container'>
                {step === 1 && (
                    <div className="feedback-inputs">
                        <div className="feedback-input-group">
                            <div className="feedback-text">Your Name</div>
                            <div className="feedback-user-name">{decodeHTMLEntities(userProfile?.full_name || 'Loading...')}</div>
                        </div>
                        <div className="feedback-input-group">
                            <div className="feedback-text">Choose your role</div>
                            <Dropdown>
                                <Dropdown.Toggle as="button" id="dropdown-role" className="custom-dropdown">
                                    {selectedRole || "Select Role"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => handleSelect("Organizer")}>Organizer</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleSelect("Volunteer")}>Volunteer</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleSelect("Participant")}>Participant</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                )}
                {step === 2 && (
                    <div className="feedback-step-content">
                        <div className="feedback-inputs-container">
                            <div className="feedback-inputs">
                                <div className="feedback-input-group">
                                    <div className="feedback-text">What did you LIKE the most?</div>
                                    <input 
                                        type="text" 
                                        className="feedback-input"
                                        value={like}
                                        onChange={(e) => setLike(e.target.value)}
                                    />
                                </div>
                                <div className="feedback-input-group">
                                    <div className="feedback-text">What did you DISLIKE the most?</div>
                                    <input 
                                        type="text" 
                                        className="feedback-input"
                                        value={dislike}
                                        onChange={(e) => setDislike(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="feedback-images">
                            <button className="feedback-image-button" onClick={() => handleImageClick('Satisfied')}>
                                <img src={satisfaction === 'Satisfied' ? satisfied : satisfied_n} className="feedback-image" alt="satisfied" />
                            </button>
                            <button className="feedback-image-button" onClick={() => handleImageClick('Fine')}>
                                <img src={satisfaction === 'Fine' ? fine : fine_n} className="feedback-image" alt="fine" />
                            </button>
                            <button className="feedback-image-button" onClick={() => handleImageClick('Unsatisfied')}>
                                <img src={satisfaction === 'Unsatisfied' ? unsatisfied : unsatisfied_n} className="feedback-image" alt="unsatisfied" />
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="feedback-description-group">
                        <div className="feedback-text">Tell us about your experience</div>
                        <div className="textarea-container">
                            <textarea
                                className="feedback-description"
                                value={feedbackText}
                                onChange={(e) => {
                                    if (e.target.value.length <= maxTextLength) {
                                        setFeedbackText(e.target.value);
                                    }
                                }}
                                placeholder=""
                            />
                            <div className={`char-counter ${feedbackText.length === maxTextLength ? 'red' : ''}`}>
                                {feedbackText.length}/{maxTextLength}
                            </div>
                        </div>
                    </div>
                )}

                </div>
            </div>
            <div className="feedback-submit-container">
                        {step > 1 && (
                            <button className="feedback-back" onClick={prevStep}>Back</button>
                        )}
                        {step < 3 ? (
                            <button className="feedback-submit" onClick={nextStep}>Next</button>
                        ) : (
                            <button className="feedback-submit" onClick={handleSubmit}>Submit</button>
                        )}
            </div>
        </div>
    </div>
);
}

export default Feedback;