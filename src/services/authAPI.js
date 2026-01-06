// src/services/authAPI.js
import api from "./api";

export const authAPI = {
  /**
   * Login user
   */
  login: (email, password) =>api.post("/auth/login", { email, password}),

  /**
   * Logout user
   */
  logout: () =>
    api.post("/auth/logout"),

  /**
   * Get current logged-in user
   */
  getCurrentUser: () =>
    api.get("/auth/me"),

  /**
   * Create initial admin (for setup)
   */
  createAdmin: (name, email, password) =>
    api.post("/auth/create-admin", { name, email, password }),
};

/**
 * Helper functions for token management
 */
export const tokenHelper = {
  /**
   * Store token in localStorage
   */
  setToken: (token) => {
    localStorage.setItem("auth_token", token);
  },

  /**
   * Get token from localStorage
   */
  getToken: () => {
    return localStorage.getItem("auth_token");
  },

  /**
   * Remove token from localStorage
   */
  removeToken: () => {
    localStorage.removeItem("auth_token");
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: () => {
    return !!localStorage.getItem("auth_token");
  },
};

/**
 * User data management
 */
export const userHelper = {
  /**
   * Store user data
   */
  setUser: (user) => {
    localStorage.setItem("user_data", JSON.stringify(user));
  },

  /**
   * Get user data
   */
  getUser: () => {
    const userData = localStorage.getItem("user_data");
    return userData ? JSON.parse(userData) : null;
  },

  /**
   * Remove user data
   */
  removeUser: () => {
    localStorage.removeItem("user_data");
  },

  /**
   * Clear all auth data
   */
  clearAuth: () => {
    tokenHelper.removeToken();
    userHelper.removeUser();
  },
};

export default authAPI;