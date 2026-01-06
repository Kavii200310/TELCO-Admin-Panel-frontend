import api from "./api";

export const dashboardAPI = {
  // Get dashboard data
  getDashboard: () =>
    api.get("/admin/dashboard"),
};

export default dashboardAPI;
