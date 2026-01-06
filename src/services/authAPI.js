/**
 * Authentication API endpoints
 * Handles all auth-related API calls
 */
import api from "./api";

export const authAPI = {
  // Login
  login: (credentials) =>
    api.post("/api/auth/login", credentials),

  // Logout
  logout: () =>
    api.post("/api/auth/logout"),

  // Register
  register: (data) =>
    api.post("/api/auth/register", data),

  // Refresh token
  refreshToken: () =>
    api.post("/api/auth/refresh"),

  // Get current user
  getCurrentUser: () =>
    api.get("/api/auth/me"),

  // Update profile
  updateProfile: (data) =>
    api.put("/api/auth/profile", data),

  // Change password
  changePassword: (data) =>
    api.post("/api/auth/change-password", data),
};

export default authAPI;
