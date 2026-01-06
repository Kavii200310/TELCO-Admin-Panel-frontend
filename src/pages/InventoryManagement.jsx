import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Import our new sub-components
import AddNumberDialog from '@/components/admin/inventory/AddNumberDialog';
import InventoryTable from '@/components/admin/inventory/InventoryTable';

// --- MOCK DATA ---
const MOCK_INVENTORY = [
    { id: 1, number: '+92 300 0000001', category: 'Gold', price: '25,000', status: 'Available' },
    { id: 2, number: '+92 300 0000002', category: 'Gold', price: '25,000', status: 'Sold' },
    { id: 3, number: '+92 321 5555555', category: 'Silver', price: '10,000', status: 'Available' },
    { id: 4, number: '+92 333 1231231', category: 'Silver', price: '10,000', status: 'Available' },
    { id: 5, number: '+92 345 9876543', category: 'Normal', price: '1,500', status: 'Sold' },
    { id: 6, number: '+92 312 6782341', category: 'Normal', price: '1,000', status: 'Available' },
];

const Inventory = () => {
    const [inventory, setInventory] = useState(MOCK_INVENTORY);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex flex-col gap-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Phone Number Inventory</h1>
                    <p className="text-gray-500 mt-1">Manage your Available and Sold stock.</p>
                </div>

                {/* Primary Action */}
                <Button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Number
                </Button>
            </div>

            {/* Main Content Card */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
                
                {/* Toolbar: Search & Filter */}
                <div className="p-4 border-b border-gray-100 flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input 
                            placeholder="Search numbers..." 
                            className="pl-9 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                        />
                    </div>
                    <Button variant="outline" className="text-gray-600">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                    </Button>
                </div>

                {/* Render Table Component */}
                <InventoryTable data={inventory} />
                
                {/* Pagination Footer */}
                <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                    <p>Showing 1-6 of {inventory.length} numbers</p>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled>Previous</Button>
                        <Button variant="outline" size="sm">Next</Button>
                    </div>
                </div>
            </div>

            {/* Render Modal Component */}
            <AddNumberDialog 
                open={isModalOpen} 
                onOpenChange={setIsModalOpen} 
            />
        </div>
    );
};

export default Inventory;