import React, { useState, useEffect } from 'react';
import OrdersTable from '@/components/admin/Order/OrdersTable';
import OrdersToolbar from '@/components/admin/Order/OrdersToolbar';
import ordersAPI from "@/services/ordersAPI";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('📦 Fetching orders from /admin/orders...');
      const response = await ordersAPI.getOrders();
      
      console.log('✅ Raw response:', response);
      console.log('📊 Response.data:', response.data);
      
      // Handle both response.data and direct response
      const data = response.data || response;
      const ordersArray = Array.isArray(data) ? data : [];
      
      console.log('✅ Orders array:', ordersArray);
      console.log('✅ First order:', ordersArray[0]);
      
      setOrders(ordersArray);
      
      console.log(`✅ Orders state updated with ${ordersArray.length} items`);
    } catch (error) {
      console.error("❌ Orders error:", error);
      console.error("❌ Error response:", error.response);
      console.error("❌ Error message:", error.message);
      
      const errorMsg = error.response?.data?.error 
        || error.response?.data?.message 
        || error.message 
        || "Failed to load orders";
      
      setError(errorMsg);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    // Match the actual database fields
    const orderId = String(order.order_id || order.id || "");
    const phoneNumber = String(order.phone_number || "");
    const status = String(order.status || "");

    const query = searchQuery.toLowerCase();

    const matchesSearch =
      orderId.toLowerCase().includes(query) ||
      phoneNumber.toLowerCase().includes(query); 

    const matchesStatus =
      statusFilter === "all" ||
      status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Calculate display text safely
  const getDisplayText = () => {
    if (orders.length === 0) {
      return "No transactions found";
    }
    if (filteredOrders.length === 0) {
      return "No matching transactions";
    }
    return `Showing 1–${filteredOrders.length} of ${orders.length} transactions`;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Transaction History
          </h1>
          <p className="text-gray-500 mt-1">
            View and manage all customer transactions.
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden p-8">
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-gray-500">Loading orders...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Transaction History
          </h1>
          <p className="text-gray-500 mt-1">
            View and manage all customer transactions.
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden p-8">
          <div className="flex flex-col items-center justify-center h-64 gap-2">
            <div className="text-red-100 mb-2">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-red-600 font-medium">⚠️ {error}</p>
            <p className="text-gray-500 text-sm">Please check the console for more details</p>
            <button 
              onClick={fetchOrders} 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Transaction History
          </h1>
          <p className="text-gray-500 mt-1">
            View and manage all customer transactions. ({orders.length} total)
          </p>
        </div>
        <button
          onClick={fetchOrders}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <OrdersToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />

        <div className="overflow-x-auto">
          {filteredOrders.length === 0 && orders.length > 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <p className="text-gray-500 text-lg">No orders match your filters</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                }}
                className="mt-4 text-blue-600 hover:text-blue-700 text-sm"
              >
                Clear filters
              </button>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <p className="text-gray-500 text-lg">No orders found</p>
              <p className="text-gray-400 text-sm mt-2">Orders will appear here once customers make purchases</p>
            </div>
          ) : (
            <OrdersTable data={filteredOrders} />
          )}
        </div>

        {filteredOrders.length > 0 && (
          <div className="p-4 border-t border-gray-100 flex justify-between text-sm text-gray-500">
            <p>{getDisplayText()}</p>
            {filteredOrders.length < orders.length && (
              <p className="text-blue-600">
                {orders.length - filteredOrders.length} hidden by filters
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;