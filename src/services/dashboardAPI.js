/**
 * Dashboard API endpoints
 * Handles all dashboard-related API calls
 */
import api from "./api";

export const dashboardAPI = {
  // Get dashboard data
  getDashboard: () =>
    api.get("/admin/dashboard"),
};

export default dashboardAPI;
