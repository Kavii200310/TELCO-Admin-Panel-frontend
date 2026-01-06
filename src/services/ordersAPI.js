/**
 * Orders API endpoints
 * Matches backend routes WITHOUT /api prefix
 */
import api from "./api";

export const ordersAPI = {
  // Get all orders
  getOrders: (params = {}) =>
    api.get("/admin/orders", { params }),

  // Get single order
  getOrder: (id) =>
    api.get(`/admin/orders/${id}`),

  // Create new order
  createOrder: (data) =>
    api.post("/admin/orders", data),

  // Update order
  updateOrder: (id, data) =>
    api.put(`/admin/orders/${id}`, data),

  // Delete order
  deleteOrder: (id) =>
    api.delete(`/admin/orders/${id}`),

  // Get order statistics
  getStats: () =>
    api.get("/admin/orders/stats"),

  // Export orders
  exportOrders: (params = {}) =>
    api.get("/admin/orders/export", { params, responseType: "blob" }),
};

export default ordersAPI;