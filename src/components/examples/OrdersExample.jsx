/**
 * Example component using useFetch hook for GET requests
 * Demonstrates loading states, error handling, and data display
 */
import { useFetch } from "../hooks";
import { ordersAPI } from "../services";

export const OrdersExample = () => {
  // Fetch data with custom callbacks
  const { data: orders, loading, error, refetch } = useFetch(
    "/admin/orders",
    {
      method: "GET",
      params: { page: 1, limit: 10 },
      onSuccess: (data) => {
        console.log("Orders fetched successfully:", data);
      },
      onError: (err) => {
        console.error("Failed to fetch orders:", err);
      },
    }
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-red-800 font-semibold">Error Loading Orders</h3>
        <p className="text-red-600 text-sm mt-2">{error.message}</p>
        {error.status && (
          <p className="text-red-500 text-xs mt-1">Status: {error.status}</p>
        )}
        <button
          onClick={refetch}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders && orders.length > 0 ? (
        <>
          <div className="grid gap-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border rounded-lg p-4 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Order #{order.id}
                    </h3>
                    <p className="text-sm text-gray-600">{order.status}</p>
                  </div>
                  <span className="text-lg font-bold text-gray-900">
                    ${order.total}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
          <button
            onClick={refetch}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Refresh Orders
          </button>
        </>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No orders found
        </div>
      )}
    </div>
  );
};

export default OrdersExample;
