import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const isGuest = localStorage.getItem('isGuest') === 'true';
        if (isGuest) {
          setUser({ isGuest: true });
          setLoading(false);
          return;
        }

        await refreshUserData();
      } catch (err) {
        console.error('Auth initialization error:', err);
        setError('Failed to initialize authentication');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Function to refresh tokens
  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) return false;

      const response = await fetch('https://curtinunihubplus.com/api/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access);
        return true;
      } else {
        // If refresh failed, logout
        logout();
        return false;
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      return false;
    }
  };

  // Function to refresh user data
  const refreshUserData = async () => {
    try {
      // Try to use existing token
      let token = localStorage.getItem('access_token');
      if (!token) {
        const refreshed = await refreshToken();
        if (!refreshed) {
          return false;
        }
        token = localStorage.getItem('access_token');
      }

      // Get profile data
      const profileResponse = await fetch('https://curtinunihubplus.com/profile/profile/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (profileResponse.status === 401) {
        // Token is invalid, try refreshing
        const refreshed = await refreshToken();
        if (!refreshed) return false;
        
        // Retry with new token
        return await refreshUserData();
      }

      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        localStorage.setItem('profile', JSON.stringify(profileData));
        
        // Set the complete user data
        setUser({
          ...profileData,
          isGuest: false,
          studentID: localStorage.getItem('studentID')
        });
        
        return true;
      } else {
        throw new Error('Failed to fetch profile data');
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
      return false;
    }
  };

  // Login function
  const login = async (student_id, password) => {
    try {
      // Clear previous user data
      localStorage.clear();
      
      const response = await fetch('https://curtinunihubplus.com/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: student_id, password }),
      });

      const data = await response.json();
      
      if (response.ok && data.access) {
        // Store the tokens and ID
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        localStorage.setItem('studentID', student_id);
        localStorage.setItem('isGuest', 'false');
        
        // Fetch user data
        await refreshUserData();
        return { success: true };
      } else {
        return { success: false, message: data.detail || "Login failed" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Network or server error" };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  // Guest login
  const loginAsGuest = () => {
    localStorage.clear();
    localStorage.setItem('isGuest', 'true');
    setUser({ isGuest: true });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      error, 
      login, 
      logout, 
      loginAsGuest, 
      refreshUserData,
      refreshToken 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);