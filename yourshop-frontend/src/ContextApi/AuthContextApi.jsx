import React, { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);




  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetch('http://localhost:5000/user/loaduser', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {

          throw new Error(`Failed to load user: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error loading user:', error);
        setError(error.message || 'Failed to load user');
      }

      setLoading(false);
    };

    loadUser();
  }, []);


  const register = async (userData) => {
    try {
      const response = await fetch('http://localhost:5000/user/register', {
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


  const login = async (credentials) => {
    try {
      const response = await fetch('http://localhost:5000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);


      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      setError(error.message || 'Failed to login');
    }
  };

  const EmailVerified = async (token) => {
    try {
      const response = await fetch(`http://localhost:5000/user/verify/${token}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);


      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      setError(error.message || 'Failed to login');
    }
  };
  const SendPassToken = async (email) => {
    try {

      const response = await fetch(`http://localhost:5000/user/forgotpassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);


      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      setError(error.message || 'Failed to login');
    }
  }
  const ResetPassWord = async (newPassword, token) => {
    try {

      const response = await fetch(`http://localhost:5000/user/resetpassword/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);


      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      setError(error.message || 'Failed to login');
    }
  }
  const logout = async () => {

    try {
      const response = await fetch(`http://localhost:5000/user/logoutuser`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        await response.json();
        setUser(null);


      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      setError(error.message || 'Failed to logout');
    }


  };

  return (
    <AuthContext.Provider value={{ user, loading, error, register, login, logout, EmailVerified, SendPassToken,ResetPassWord }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
