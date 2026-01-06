import api from "@/services/api";

export const inventoryAPI = {
  getItems: (params = {}) =>
    api.get("/admin/numbers", { params }),

  createItem: (data) =>
    api.post("/admin/numbers", data),

  updateItem: (id, data) =>
    api.put(`/admin/numbers/${id}`, data),

  deleteItem: (id) =>
    api.delete(`/admin/numbers/${id}`),
};

export default inventoryAPI;
