import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate


  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch('https://54.169.81.75:8000/api/verify-user/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setCurrentUser(userData);

          // Check if stored studentID matches the actual one
          const storedStudentID = localStorage.getItem('studentID');
          if (userData.student_id !== storedStudentID) {
            console.log('Updating mismatched studentID in localStorage');
            localStorage.setItem('studentID', userData.student_id);
          }

          // Update profile data
          localStorage.setItem('profile', JSON.stringify(userData.profile));
        } else {
          // Token invalid - clean up localStorage
          setError('Authentication failed');
          // Don't clear localStorage here as that would log the user out
          // Just notify about the issue
        }
      } catch (error) {
        console.error('User verification error:', error);
        setError('Failed to verify user');
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  const logout = () => {
    localStorage.clear();
    setCurrentUser(null);
    navigate('/login'); // Redirect to the login page
  };

  return { currentUser, loading, error, logout };
};

export default useCurrentUser;