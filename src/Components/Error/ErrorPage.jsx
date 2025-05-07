import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ErrorPage.css';
import error from '../../assets/error.jpg';

const ErrorPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Extract error details from state passed via `navigate`
    const { state } = location;
    const errorCode = state?.errorCode || '404';
    const errorMessage = state?.errorMessage || 'Data is not found.';
    const errorDetails = state?.errorDetails || 'Please reload the page.';

    return (
        <div className="error-page">
            <div className="error-container">
                <img src={error} alt="Broken Lightbulb" className="error-icon" />
                <h1 className="error-code">{errorCode}</h1>
                <p className="error-message">{errorMessage}</p>
                <p className="error-instruction">{errorDetails}</p>
                <button className="error-button" onClick={() => navigate('/club-directory')}>
                    Back to Home Page
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;