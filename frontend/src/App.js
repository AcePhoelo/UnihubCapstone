import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NotificationProvider } from './Components/Notification/Context';
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
import ErrorPage from './Components/Error/ErrorPage';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('access_token');
  const isGuest = localStorage.getItem('isGuest') === 'true';
  const location = useLocation();

  if (!token && !isGuest) {
    // Redirect to login but save the attempted path for redirect after login
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

function App() {
    return (
        <Router>
            <NotificationProvider>
            <Routes>
                {/* Redirect to Login */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Authentication */}
                <Route path="/login" element={<Login />} />

                {/* Directories */}
                <Route path="/club-directory" element={<ProtectedRoute><ClubDirectory /></ProtectedRoute>} />
                <Route path="/event-directory" element={<ProtectedRoute><EventDirectory /></ProtectedRoute>} />

                {/* User Activity */}
                <Route path="/my-activity" element={<ProtectedRoute><MyActivity /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/profile/:student_id" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> {/* Dynamic profile route */}
                <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />

                {/* Creation Pages */}
                <Route path="/creation-club" element={<ProtectedRoute><CreationClub /></ProtectedRoute>} />
                <Route path="/creation-event" element={<ProtectedRoute><CreationEvent /></ProtectedRoute>} />

                {/* Feedback */}
                <Route path="/feedback/:eventName" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
                <Route path="/feedback-review/:eventName" element={<ProtectedRoute><FeedbackReview /></ProtectedRoute>} />

                {/* Club and Event Pages */}
                <Route path="/club/:club_id" element={<ProtectedRoute><Club /></ProtectedRoute>} />
                <Route path="/event/:eventName" element={<ProtectedRoute><Event /></ProtectedRoute>} />

                {/* Role Management */}
                <Route path="/manage-roles/:club_id" element={<ProtectedRoute><ManageRoles /></ProtectedRoute>} />

                {/* Event Registration */}
                <Route path="/register-event/:eventName" element={<ProtectedRoute><RegisterEvent /></ProtectedRoute>} />

                {/* Fallback Route */}
                <Route path="*" element={<ErrorPage />} />
                <Route path="/error" element={<ErrorPage />} />
            </Routes>
            </NotificationProvider>
        </Router>
    );
}

export default App;