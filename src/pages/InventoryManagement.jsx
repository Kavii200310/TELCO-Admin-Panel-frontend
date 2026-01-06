import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AddNumberDialog from '@/components/admin/inventory/AddNumberDialog';
import InventoryTable from '@/components/admin/inventory/InventoryTable';
import inventoryAPI from "@/services/inventoryAPI";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNumbers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('📞 Fetching numbers...');
      const response = await inventoryAPI.getItems();
      
      console.log('✅ Response received:', response);
      console.log('📊 Data:', response.data);
      
      // Handle both response.data and response directly
      const data = response.data || response;
      setInventory(Array.isArray(data) ? data : []);
      
      console.log('✅ Inventory updated with', data.length, 'items');
    } catch (error) {
      console.error("❌ Inventory error:", error);
      console.error("❌ Error response:", error.response);
      console.error("❌ Error message:", error.message);
      
      const errorMsg = error.response?.data?.error 
        || error.response?.data?.message 
        || error.message 
        || 'Failed to load inventory';
      
      setError(errorMsg);
      setInventory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('🚀 Component mounted, fetching numbers...');
    fetchNumbers();
  }, []);

  // Debug: Log inventory changes
  useEffect(() => {
    console.log('📦 Inventory state updated:', inventory);
  }, [inventory]);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Phone Number Inventory
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your Available and Sold stock. ({inventory.length} numbers)
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={fetchNumbers}
            variant="outline"
            disabled={loading}
            className="text-gray-600"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>

          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Number
          </Button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p className="font-semibold">⚠️ Error loading inventory:</p>
          <p className="text-sm mt-1">{error}</p>
          <Button 
            onClick={fetchNumbers} 
            variant="outline" 
            size="sm" 
            className="mt-2"
          >
            Try Again
          </Button>
        </div>
      )}

      {/* Main Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="p-4 border-b border-gray-100 flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search numbers..."
              className="pl-9 bg-gray-50 border-gray-200 focus:bg-white"
            />
          </div>
          <Button variant="outline" className="text-gray-600">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {loading ? (
          <div className="p-10 text-center">
            <div className="inline-flex items-center gap-2 text-gray-500">
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Loading inventory...</span>
            </div>
          </div>
        ) : (
          <InventoryTable data={inventory} onRefresh={fetchNumbers} />
        )}

        <div className="p-4 border-t border-gray-100 flex justify-between text-sm text-gray-500">
          <p>Showing {inventory.length > 0 ? '1' : '0'}–{inventory.length} of {inventory.length} numbers</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </div>

      <AddNumberDialog
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSuccess={fetchNumbers}
      />
    </div>
  );
};

export default Inventory;