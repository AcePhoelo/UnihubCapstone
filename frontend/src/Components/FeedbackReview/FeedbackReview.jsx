import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './FeedbackReview.css';
import satisfied from '../../assets/satisfied.png';
import fine from '../../assets/fine.png';
import unsatisfied from '../../assets/unsatisfied.png';
import backIcon from '../../assets/Back.png';
import { decodeHTMLEntities } from '../../utils';

const FeedbackReview = () => {
    const navigate = useNavigate();
    const { eventName } = useParams();
    const decodedEventName = decodeURIComponent(eventName || '');
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchFeedbacks = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('access_token');
                const response = await fetch(
                    `http://54.169.81.75:8000/api/feedback/feedback/?event_name=${encodeURIComponent(decodedEventName)}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log('Feedback data:', data);
                
                const results = data.results || data;
                setFeedbacks(results);
            } catch (error) {
                console.error("Error fetching feedbacks:", error);
            } finally {
                setLoading(false);
            }
        };
        
        if (decodedEventName) {
            fetchFeedbacks();
        }
    }, [decodedEventName]);

    const getSatisfactionImage = (satisfaction) => {
        switch(satisfaction) {
            case 'Satisfied':
                return satisfied;
            case 'Fine':
                return fine;
            case 'Unsatisfied':
                return unsatisfied;
            default:
                return null;
        }
    };
    
    // Modify the getInitials function
    const getInitials = (fullName) => {
        const decodedName = decodeHTMLEntities(fullName || '');
        const names = decodedName.trim().split(' ');
        const initials = names[0]?.charAt(0).toUpperCase() + (names[1]?.charAt(0).toUpperCase() || '');
        return initials;
    };
    
    const formatName = (fullName) => {
        if (!fullName) return 'Anonymous';
        const decodedName = decodeHTMLEntities(fullName);
        const names = decodedName.trim().split(' ');
        if (names.length < 2) return decodedName;
        const surname = names.pop().toUpperCase(); 
        return `${surname} ${names.join(' ')}`; 
    };

    return (
        <div className="feedback-review-page">
            <div className="feedback-review-header">
                <img
                    src={backIcon}
                    alt="Back"
                    className="back-button"
                    onClick={() => navigate(-1)}
                    style={{ cursor: 'pointer', marginRight: '16px' }}
                />
                <div className="feedback-review-eventname">{decodeHTMLEntities(decodedEventName)} Feedbacks</div>
            </div>
            <div className="feedback-review-body">
                {loading ? (
                    <div className="loading">Loading feedbacks...</div>
                ) : feedbacks.length > 0 ? (
                    feedbacks.map(feedback => (
                        <div className="feedback-review-container" key={feedback.id}>
                            <div className="review-person-information">
                                <div className="review-profile-icon">
                                    {feedback.satisfaction ? (
                                        <img 
                                            src={getSatisfactionImage(feedback.satisfaction)} 
                                            alt={feedback.satisfaction} 
                                            className="feedback-satisfaction-icon"
                                        />
                                    ) : (
                                        getInitials(feedback.student_details?.full_name)
                                    )}
                                </div>
                                <div className="feedback-header-info">
                                    <div className="feedback-name">
                                        {formatName(feedback.student_details?.full_name || 'Anonymous')}
                                    </div>
                                    <div className="feedback-role">{decodeHTMLEntities(feedback.role)}</div>
                                </div>
                            </div>
                            <div className="liked-disliked-group">
                                <div className="feedback-liked">
                                    <strong>Liked:</strong> {feedback.like}
                                </div>
                                <div className="feedback-disliked">
                                    <strong>Disliked:</strong> {decodeHTMLEntities(feedback.like)}
                                </div>
                            </div>
                            <div className="review-description">
                                {decodeHTMLEntities(feedback.experience)}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-feedbacks">No feedback available for this event yet.</div>
                )}
            </div>
        </div>
    );
};

export default FeedbackReview;