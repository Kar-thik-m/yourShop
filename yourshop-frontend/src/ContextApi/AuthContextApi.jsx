import React, { createContext, useContext, useState, useEffect } from 'react';
import { Url } from '../../config'; // Make sure your config file is correct

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect to load the user when the component mounts or user state changes
  useEffect(() => {
    const loadUser = async () => {
      if (user === null) {
        setLoading(true); // Ensure loading is true before making request
        try {
          const response = await fetch(`${Url}/user/loaduser`, {
            method: 'GET',
            credentials: 'include',
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data); // Set user state if response is successful
          } else {
            throw new Error(`Failed to load user: ${response.statusText}`);
          }
        } catch (error) {
          console.error(error);
          setError(error.message);
        }
        setLoading(false); // Set loading to false after request
      }
    };

    loadUser();
  }, [user]); // Trigger this effect when `user` state changes

  // Registration handler
  const register = async (userData) => {
    try {
      const response = await fetch(`${Url}/user/register`, {
        method: 'POST',
        body: userData,
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      setError(error.message || 'Failed to register');
    }
  };

  // Login handler
  const login = async (credentials) => {
    try {
      const response = await fetch(`${Url}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data); // Debug log to verify
        setUser(data.user); // Set user state after successful login
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      setError(error.message || 'Failed to login');
    }
  };

  // Email verification handler
  const EmailVerified = async (token) => {
    try {
      const response = await fetch(`${Url}/verify/${token}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        throw new Error('Email verification failed');
      }
    } catch (error) {
      setError(error.message || 'Failed to verify email');
    }
  };

  // Password reset token handler
  const SendPassToken = async (email) => {
    try {
      const response = await fetch(`${Url}/user/forgotpassword`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Password reset token sent:', data); // Debug log
      } else {
        throw new Error('Password reset token request failed');
      }
    } catch (error) {
      setError(error.message || 'Failed to send password reset token');
    }
  };

  // Password reset handler
  const ResetPassWord = async (newPassword, token) => {
    try {
      const response = await fetch(`${Url}/user/resetpassword/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        throw new Error('Password reset failed');
      }
    } catch (error) {
      setError(error.message || 'Failed to reset password');
    }
  };

  // Logout handler
  const logout = async () => {
    try {
      const response = await fetch(`${Url}/user/logoutuser`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        await response.json();
        setUser(null); // Set user state to null after logout
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      setError(error.message || 'Failed to logout');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, register, login, logout, EmailVerified, SendPassToken, ResetPassWord }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth context
export const useAuth = () => useContext(AuthContext);
