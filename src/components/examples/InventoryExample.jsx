/**
 * Example component using direct API endpoints
 * Demonstrates using API endpoint objects directly for more control
 */
import { useState, useEffect } from "react";
import { inventoryAPI } from "../services";

export const InventoryExample = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch inventory items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await inventoryAPI.getItems({
          limit: 20,
          sort: "-createdAt",
        });
        setItems(response.data);
        setError(null);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch inventory items"
        );
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }

    try {
      await inventoryAPI.deleteItem(itemId);
      setItems(items.filter((item) => item.id !== itemId));
      alert("Item deleted successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete item");
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading inventory...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">{error}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">SKU</th>
            <th className="border border-gray-300 px-4 py-2 text-right">Qty</th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{item.id}</td>
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              <td className="border border-gray-300 px-4 py-2">{item.sku}</td>
              <td className="border border-gray-300 px-4 py-2 text-right">
                {item.quantity}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryExample;
