import React, { useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose, presidentEmail }) => {
  const [animate, setAnimate] = useState(false);
  const [formData, setFormData] = useState({
    yourClub: '',
    yourEmail: '',
    shortMessage: '',
  });
  const [clubs, setClubs] = useState([]); // Initialize as an empty array

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        setAnimate(true);
      });

      const token = localStorage.getItem('access_token'); // Retrieve the token from localStorage

      // Fetch the list of clubs when the sidebar is opened
      fetch('https://54.169.81.75:8000/clubs/list', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setClubs(data); // Set the clubs if the response is an array
          } else {
            console.error('Invalid data format:', data);
            setClubs([]); // Fallback to an empty array
          }
        })
        .catch((error) => {
          console.error('Error fetching clubs:', error);
          setClubs([]); // Fallback to an empty array in case of an error
        });
    } else {
      setAnimate(false);
    }
  }, [isOpen]);

  if (!isOpen && !animate) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://54.169.81.75:8000/collaboration/send-email/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          your_club: formData.yourClub,
          name: formData.yourEmail,
          receiver_email: presidentEmail,
          content: formData.shortMessage,
        }),
      });

      if (response.ok) {
        alert('Collaboration request sent successfully!');
        onClose();
      } else {
        alert('Failed to send collaboration request.');
      }
    } catch (error) {
      console.error('Error sending collaboration request:', error);
      alert('An error occurred while sending the request.');
    }
  };

  return (
    <div
      className={`collab-sidebar-overlay ${animate ? 'collab-open' : ''}`}
      onClick={onClose}
    >
      <div
        className={`collab-sidebar ${animate ? 'collab-open' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Collaborate</h2>
        <div className="collab-header-line"></div>
        <div className="collab-sidebar-section">
          <label>Club Leader</label>
          <div className="collab-sidebar-club-leader">
            <div className="collab-sidebar-avatar">{presidentEmail?.[0]?.toUpperCase()}</div>
            <span className="collab-sidebar-leader-name">{presidentEmail}</span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="collab-sidebar-section">
            <label>Your Club</label>
            <select
              name="yourClub"
              value={formData.yourClub}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Choose from list...
              </option>
              {Array.isArray(clubs) &&
                clubs.map((club) => (
                  <option key={club.id} value={club.name}>
                    {club.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="collab-sidebar-section">
            <input
              type="email"
              name="yourEmail"
              placeholder="Your Email"
              value={formData.yourEmail}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="collab-sidebar-section">
            <textarea
              name="shortMessage"
              placeholder="Short Message"
              value={formData.shortMessage}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="collab-sidebar-send-button">
            Send Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sidebar;