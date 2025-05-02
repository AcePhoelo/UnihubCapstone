import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Component Imports
import Login from './Components/LogIn/Login';
import Feedback from './Components/Feedback/Feedback';
import FeedbackReview from './Components/FeedbackReview/FeedbackReview';
import ClubDirectory from './Components/ClubDirectory/ClubDirectory';
import EventDirectory from './Components/EventDirectory/EventDirectory';
import MyActivity from './Components/MyActivity/MyActivity';
import Profile from './Components/Profile/Profile';
import Calendar from './Components/Calendar/Calendar';
import CreationClub from './Components/CreationClub/CreationClub';
import CreationEvent from './Components/CreationEvent/CreationEvent';
import Club from './Components/Club/Club';
import Event from './Components/Event/Event';
import ManageRoles from './Components/ManageRoles/ManageRoles';
import RegisterEvent from './Components/RegisterEvent/RegisterEvent';

function App() {
    return (
        <Router>
            <Routes>
                {/* Redirect to Login */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Authentication */}
                <Route path="/login" element={<Login />} />

                {/* Directories */}
                <Route path="/club-directory" element={<ClubDirectory />} />
                <Route path="/event-directory" element={<EventDirectory />} />

                {/* User Activity */}
                <Route path="/my-activity" element={<MyActivity />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/:student_id" element={<Profile />} /> {/* Dynamic profile route */}
                <Route path="/calendar" element={<Calendar />} />

                {/* Creation Pages */}
                <Route path="/creation-club" element={<CreationClub />} />
                <Route path="/creation-event" element={<CreationEvent />} />

                {/* Feedback */}
                <Route path="/feedback/:eventName" element={<Feedback />} />
                <Route path="/feedback-review/:eventName" element={<FeedbackReview />} />

                {/* Club and Event Pages */}
                <Route path="/club/:club_id" element={<Club />} />
                <Route path="/event/:eventName" element={<Event />} />

                {/* Role Management */}
                <Route path="/manage-roles/:clubName" element={<ManageRoles />} />

                {/* Event Registration */}
                <Route path="/register-event/:eventName" element={<RegisterEvent />} />

                {/* Fallback Route */}
                <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Routes>
        </Router>
    );
}

export default App;