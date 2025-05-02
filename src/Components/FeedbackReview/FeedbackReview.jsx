import React, { useState, useEffect } from 'react';
import './FeedbackReview.css';

const FeedbackReview = ({ eventName }) => {
    const [feedbacks, setFeedbacks] = useState([]);

    const mockFeedbacks = [
        {
            id: 1,
            name: "Alice Johnson",
            role: "Participant",
            liked: "The event organization",
            disliked: "Too much people",
            description: "I really enjoyed the tournament, but the amount of participants was too big."
        },
        {
            id: 2,
            name: "Bob Smith",
            role: "Volunteer",
            liked: "Friendly staff",
            disliked: "Limited food choices",
            description: "Overall, the event was an exceptional experience marked by meticulous organization and an energetic atmosphere that captivated every attendee. Each activity was thoughtfully planned, and the courteous staff ensured that all guests felt warmly welcomed and well attended. The engaging program and remarkable attention to detail provided lasting memories and a delightful ambiance. While the experience was outstanding, one area that could use improvement is the snack selection-providing a broader variety of treats would further elevate the overall experience for everyone. ! ! ! ! ! !!"
        }
    ];

    useEffect(() => {
        setTimeout(() => {
            setFeedbacks(mockFeedbacks);
        }, 500);
    }, []);

    useEffect(() => {
        fetch(`https://your-django-backend.com/api/feedbacks?eventName=${encodeURIComponent(eventName)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => setFeedbacks(data))
            .catch(error => {
                console.error("Error fetching feedbacks: ", error);
            });
    }, [eventName]);

    const getInitials = (fullName) => {
        const names = fullName.trim().split(' ');
        const initials = names[0]?.charAt(0).toUpperCase() + (names[1]?.charAt(0).toUpperCase() || '');
        return initials;
    };

    const formatName = (fullName) => {
        const names = fullName.trim().split(' ');
        if (names.length < 2) return fullName;
        const surname = names.pop().toUpperCase(); 
        return `${surname} ${names.join(' ')}`; 
    };

    return (
        <div className="feedback-review-page">
            <div className="feedback-review-header">
                <div className="feedback-review-eventname">{eventName} Feedbacks</div>
            </div>
            <div className="feedback-review-body">
                {feedbacks.map(feedback => (
                    <div className="feedback-review-container" key={feedback.id}>
                        <div className="review-person-information">
                            <div className="review-profile-icon">
                                {getInitials(feedback.name || "NN")}
                            </div>
                            <div className="feedback-header-info">
                                <div className="feedback-name">{formatName(feedback.name)}</div>
                                <div className="feedback-role">{feedback.role}</div>
                            </div>
                        </div>
                        <div className="liked-disliked-group">
                            <div className="feedback-liked">
                                <strong>Liked:</strong> {feedback.liked}
                            </div>
                            <div className="feedback-disliked">
                                <strong>Disliked:</strong> {feedback.disliked}
                            </div>
                        </div>
                        <div className="review-description">
                            {feedback.description}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeedbackReview;