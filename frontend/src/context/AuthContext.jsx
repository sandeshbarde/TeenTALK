import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../services/apiClient';
import { ROLE_DASHBOARD_ROUTES } from '../constants';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('teentalk_token') || null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await apiClient.get('/auth/me');
        if (res.success && res.data) {
          setUser(res.data);
        } else {
          logout();
        }
      } catch (err) {
        console.warn('Session restoration failed:', err.message);
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await apiClient.post('/auth/login', { email, password });
      if (res.success && res.data) {
        const { user: userData, token: jwtToken } = res.data;
        localStorage.setItem('teentalk_token', jwtToken);
        setToken(jwtToken);
        setUser(userData);
        showToast(`Welcome back, ${userData.full_name}!`, 'success');
        return userData;
      }
    } catch (err) {
      showToast(err.message || 'Login failed', 'error');
      throw err;
    }
  };

  const register = async (formData) => {
    try {
      const res = await apiClient.post('/auth/register', formData);
      if (res.success && res.data) {
        const { user: userData, token: jwtToken } = res.data;
        localStorage.setItem('teentalk_token', jwtToken);
        setToken(jwtToken);
        setUser(userData);
        showToast(`Welcome to TeenTalk, ${userData.full_name}!`, 'success');
        return userData;
      }
    } catch (err) {
      showToast(err.message || 'Registration failed', 'error');
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('teentalk_token');
    setToken(null);
    setUser(null);
  };

  const getDashboardRoute = (role) => {
    return ROLE_DASHBOARD_ROUTES[role] || '/dashboard/teen';
  };

  const updateUser = async (updates) => {
    try {
      const res = await apiClient.patch('/auth/profile', updates);
      if (res.success && res.data) {
        setUser(res.data);
        showToast('Profile updated successfully', 'success');
        return res.data;
      }
    } catch (err) {
      showToast(err.message || 'Failed to update profile', 'error');
      throw err;
    }
  };

  const deleteAccount = async () => {
    try {
      await apiClient.delete('/auth/me');
      logout();
      showToast('Your account and personal data have been permanently erased.', 'info');
    } catch (err) {
      showToast(err.message || 'Failed to delete account', 'error');
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        updateUser,
        deleteAccount,
        getDashboardRoute,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
