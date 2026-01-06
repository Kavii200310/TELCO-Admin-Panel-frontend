/**
 * Inventory API endpoints
 * Handles all inventory-related API calls
 */
import api from "./api";

export const inventoryAPI = {
  // Get all numbers
  getItems: (params = {}) =>
    api.get("/admin/numbers", { params }),

  // Get single number
  getItem: (id) =>
    api.get(`/admin/numbers/${id}`),

  // Create new number
  createItem: (data) =>
    api.post("/admin/numbers", data),

  // Update number
  updateItem: (id, data) =>
    api.put(`/admin/numbers/${id}`, data),

  // Delete number
  deleteItem: (id) =>
    api.delete(`/admin/numbers/${id}`),

  // Bulk update
  bulkUpdate: (data) =>
    api.post("/admin/numbers/bulk-update", data),
};

export default inventoryAPI;
