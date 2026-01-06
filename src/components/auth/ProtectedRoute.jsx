// src/components/auth/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { tokenHelper } from '@/services/authAPI';

/**
 * Protected Route Component
 * Redirects to login if user is not authenticated
 */
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = tokenHelper.isAuthenticated();

  if (!isAuthenticated) {
    console.log('⚠️ User not authenticated, redirecting to login...');
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;