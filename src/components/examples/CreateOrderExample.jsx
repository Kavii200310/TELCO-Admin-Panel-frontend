/**
 * Example component using useMutation hook for POST/PUT/DELETE requests
 * Demonstrates form submission and data mutation patterns
 */
import { useState } from "react";
import { useMutation } from "../hooks";

export const CreateOrderExample = () => {
  const [formData, setFormData] = useState({
    customerId: "",
    items: [],
    notes: "",
  });

  // Mutation hook for creating order
  const { execute: createOrder, loading, error, data: response } = useMutation(
    "/admin/orders",
    "POST",
    {
      onSuccess: (data) => {
        alert(`Order created with ID: ${data.id}`);
        setFormData({ customerId: "", items: [], notes: "" });
      },
      onError: (err) => {
        console.error("Failed to create order:", err);
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOrder(formData);
    } catch (err) {
      // Error is already handled in hook
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Customer ID
        </label>
        <input
          type="text"
          name="customerId"
          value={formData.customerId}
          onChange={handleChange}
          disabled={loading}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          disabled={loading}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
          rows={4}
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-red-800 text-sm">{error.message}</p>
        </div>
      )}

      {response && (
        <div className="bg-green-50 border border-green-200 rounded-md p-3">
          <p className="text-green-800 text-sm">Order created successfully!</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition"
      >
        {loading ? "Creating..." : "Create Order"}
      </button>
    </form>
  );
};

export default CreateOrderExample;
