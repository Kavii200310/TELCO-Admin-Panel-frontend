/**
 * Integration Example: Using data fetching pattern with existing components
 * Shows how to integrate the new pattern into AdminLayout and Dashboard
 */

/**
 * EXAMPLE 1: Update AdminHeader to fetch user data
 * Location: src/components/admin/Dashboard/AdminHeader.jsx
 */
import { useFetch } from "@/hooks";
import { authAPI } from "@/services";

export function AdminHeaderWithData() {
  const { data: user, loading } = useFetch("/api/auth/me", {
    onError: (err) => console.error("Failed to fetch user:", err),
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex justify-between items-center p-4">
      <h1>Admin Dashboard</h1>
      <div className="flex items-center gap-4">
        <span>{user?.name}</span>
        <img src={user?.avatar} alt="User" className="w-10 h-10 rounded-full" />
      </div>
    </div>
  );
}

/**
 * EXAMPLE 2: Update InventoryTable to fetch inventory
 * Location: src/components/admin/Inventory/InventoryTable.jsx
 */
import { useState } from "react";
import { useFetch, useMutation } from "@/hooks";
import { inventoryAPI } from "@/services";
import { getErrorMessage } from "@/lib/errorUtils";

export function InventoryTableWithData() {
  const [selectedItems, setSelectedItems] = useState([]);

  // Fetch inventory data
  const { data: items, loading, error, refetch } = useFetch(
    "/api/inventory",
    {
      params: { limit: 20, sort: "-createdAt" },
      onSuccess: (data) => console.log("Inventory loaded"),
    }
  );

  // Delete mutation
  const { execute: deleteItem } = useMutation(
    "",
    "DELETE",
    {
      onSuccess: () => {
        alert("Item deleted");
        refetch();
      },
    }
  );

  const handleDelete = async (itemId) => {
    if (confirm("Delete this item?")) {
      try {
        await deleteItem(null, `/api/inventory/${itemId}`);
      } catch (err) {
        alert(getErrorMessage(err));
      }
    }
  };

  if (loading) return <div className="p-4">Loading inventory...</div>;
  if (error)
    return (
      <div className="p-4 text-red-600">
        Error: {error.message}
        <button onClick={refetch} className="ml-4 text-blue-600">
          Retry
        </button>
      </div>
    );

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left p-2">ID</th>
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">SKU</th>
            <th className="text-left p-2">Quantity</th>
            <th className="text-center p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item) => (
            <tr key={item.id} className="border-t hover:bg-gray-50">
              <td className="p-2">{item.id}</td>
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.sku}</td>
              <td className="p-2">{item.quantity}</td>
              <td className="p-2 text-center">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {items?.length === 0 && (
        <div className="p-4 text-center text-gray-500">No items found</div>
      )}
    </div>
  );
}

/**
 * EXAMPLE 3: Update OrdersTable to fetch orders with pagination
 * Location: src/components/admin/Order/OrdersTable.jsx
 */
import { usePaginatedFetch } from "@/hooks/useDataFetchingPatterns";
import { ordersAPI } from "@/services";

export function OrdersTableWithPagination() {
  const { data: orders, page, loading, hasMore, loadMore } = usePaginatedFetch(
    (pageNum, pageSize) =>
      ordersAPI
        .getOrders({ page: pageNum, limit: pageSize })
        .then((res) => ({
          items: res.data,
          hasMore: res.data.length === pageSize,
        })),
    1,
    10
  );

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-2">Order ID</th>
              <th className="text-left p-2">Customer</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Total</th>
              <th className="text-left p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-2">{order.id}</td>
                <td className="p-2">{order.customerName}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      order.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-2">${order.total}</td>
                <td className="p-2">{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {loading && <div className="p-4">Loading...</div>}

      {hasMore && (
        <button onClick={loadMore} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Load More
        </button>
      )}
    </div>
  );
}

/**
 * EXAMPLE 4: Dashboard with multiple data sources
 * Location: src/pages/Dashboard.jsx
 */
import { useMultipleFetch } from "@/hooks/useDataFetchingPatterns";

export function DashboardWithMultipleData() {
  // Fetch multiple data sources in parallel
  const { data: [orders, inventory, stats], loading, error } = useMultipleFetch([
    ordersAPI.getOrders().then((res) => res.data),
    inventoryAPI.getItems().then((res) => res.data),
    ordersAPI.getStats().then((res) => res.data),
  ]);

  if (loading) return <div className="p-8">Loading dashboard...</div>;
  if (error) return <div className="p-8 text-red-600">Error loading dashboard</div>;

  return (
    <div className="grid grid-cols-3 gap-4 p-8">
      {/* Stat Cards */}
      <StatCard title="Total Orders" value={stats?.totalOrders} />
      <StatCard title="Revenue" value={`$${stats?.revenue}`} />
      <StatCard title="Low Stock Items" value={inventory?.length} />

      {/* Orders Preview */}
      <div className="col-span-2 border rounded p-4">
        <h2 className="font-bold mb-4">Recent Orders</h2>
        {orders?.slice(0, 5).map((order) => (
          <div key={order.id} className="flex justify-between py-2 border-b">
            <span>{order.id}</span>
            <span>{order.status}</span>
            <span>${order.total}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * EXAMPLE 5: Form with validation and mutation
 * Location: src/components/admin/Inventory/AddNumberDialog.jsx
 */
import { useState } from "react";
import { useMutation } from "@/hooks";
import { inventoryAPI } from "@/services";
import { getErrorMessage } from "@/lib/errorUtils";

export function AddInventoryForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    quantity: "",
    price: "",
  });

  const { execute: createItem, loading, error } = useMutation(
    "/api/inventory",
    "POST",
    {
      onSuccess: () => {
        alert("Item added successfully");
        setFormData({ name: "", sku: "", quantity: "", price: "" });
        onSuccess?.();
      },
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.sku || !formData.quantity) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await createItem(formData);
    } catch (err) {
      // Error already shown in hook
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Item Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
          className="w-full mt-1 px-3 py-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">SKU</label>
        <input
          type="text"
          name="sku"
          value={formData.sku}
          onChange={handleChange}
          disabled={loading}
          className="w-full mt-1 px-3 py-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Quantity</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          disabled={loading}
          className="w-full mt-1 px-3 py-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          disabled={loading}
          className="w-full mt-1 px-3 py-2 border rounded"
          required
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded p-3">
          <p className="text-red-800 text-sm">{getErrorMessage(error)}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Adding..." : "Add Item"}
      </button>
    </form>
  );
}

export default {
  AdminHeaderWithData,
  InventoryTableWithData,
  OrdersTableWithPagination,
  DashboardWithMultipleData,
  AddInventoryForm,
};
