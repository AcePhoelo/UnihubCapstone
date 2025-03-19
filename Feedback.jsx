import React, { useState, useEffect, useRef } from 'react';
import './Feedback.css';
import Dropdown from 'react-bootstrap/Dropdown';
import satisfied from '../../assets/satisfied.png';
import fine from '../../assets/fine.png';
import unsatisfied from '../../assets/unsatisfied.png';
import satisfied_n from '../../assets/satisfied_n.png';
import fine_n from '../../assets/fine_n.png';
import unsatisfied_n from '../../assets/unsatisfied_n.png';

const Feedback = ({ eventName }) => {
    const [selectedRole, setSelectedRole] = useState(null);
    const [step, setStep] = useState(1);
    const progressRef = useRef(null);
    const circlesRef = useRef([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [feedbackText, setFeedbackText] = useState("");
    const maxTextLength = 500; 

    useEffect(() => {
        const progressContainer = document.querySelector('.custom-progress-container');

        if (progressContainer && progressRef.current && circlesRef.current.length > 0) {
            const fixedProgressHeight = 392;

            progressRef.current.style.top = `0px`;
            progressRef.current.style.height = `${fixedProgressHeight}px`;

            const stepHeight = fixedProgressHeight / (circlesRef.current.length - 1);
            circlesRef.current.forEach((circle, idx) => {
                circle.style.position = 'absolute';
                circle.style.top = `${idx * stepHeight - circle.offsetHeight / 2}px`;
            });
        }
    }, [step]);

    const handleSelect = (eventKey) => {
        setSelectedRole(eventKey);
    };

    const nextStep = () => {
        if (step < 3) setStep(step + 1);
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    return (
        <div>
            <div className="feedback-header">
                <div className="feedback-eventname">{eventName} Feedback</div>
            </div>
            <div className="steps-container">
                <div className="custom-progress-container">
                    {/* Progress Line */}
                    <div className="progress" ref={progressRef}></div>

                    {/* Circles */}
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
                            <div className="feedback-text">Full Name</div>
                            <input type="feedback-text" className="feedback-input" />
                        </div>
                        <div className="feedback-input-group">
                            <div className="feedback-text">Choose your role</div>
                            <Dropdown>
                                <Dropdown.Toggle as="button" id="dropdown-role" className="custom-dropdown">
                                    {selectedRole}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="Organizer" onClick={() => handleSelect("Organizer")}>Organizer</Dropdown.Item>
                                    <Dropdown.Item eventKey="Volunteer" onClick={() => handleSelect("Volunteer")}>Volunteer</Dropdown.Item>
                                    <Dropdown.Item eventKey="Participant" onClick={() => handleSelect("Participant")}>Participant</Dropdown.Item>
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
                                    <input type="text" className="feedback-input" />
                                </div>
                                <div className="feedback-input-group">
                                    <div className="feedback-text">What did you DISLIKE the most?</div>
                                    <input type="text" className="feedback-input" />
                                </div>
                            </div>
                        </div>

                        <div className="feedback-images">
                            <button className="feedback-image-button" onClick={() => handleImageClick('satisfied')}>
                                <img src={selectedImage === 'satisfied' ? satisfied : satisfied_n} className="feedback-image" alt="satisfied" />
                            </button>
                            <button className="feedback-image-button" onClick={() => handleImageClick('fine')}>
                                <img src={selectedImage === 'fine' ? fine : fine_n} className="feedback-image" alt="fine" />
                            </button>
                            <button className="feedback-image-button" onClick={() => handleImageClick('unsatisfied')}>
                                <img src={selectedImage === 'unsatisfied' ? unsatisfied : unsatisfied_n} className="feedback-image" alt="unsatisfied" />
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
            <div className="feedback-submit-container">
                {step < 3 ? (
                    <button className="feedback-submit" onClick={nextStep}>Next</button>
                ) : (
                    <button className="feedback-submit">Submit</button>
                )}
            </div>
        </div>
    );
}

export default Feedback;