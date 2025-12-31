import React, { useState } from 'react';
import OrdersTable from '@/components/admin/Order/OrdersTable';
import OrdersToolbar from '@/components/admin/Order/OrdersToolbar';

// --- MOCK DATA (Matches Screenshot 109) ---
const MOCK_ORDERS = [
    { id: '#ORD-7721', customer: '+92 300 5550001', type: 'Prepaid', payment: 'Visa', status: 'Completed', date: 'Oct 24, 2023', amount: 'Rs. 1,500' },
    { id: '#ORD-7720', customer: '+92 321 4441122', type: 'Postpaid', payment: 'Visa', status: 'Failed', date: 'Oct 23, 2023', amount: 'Rs. 1,500' },
    { id: '#ORD-7718', customer: '+92 345 1122334', type: 'Prepaid', payment: 'Visa', status: 'Completed', date: 'Oct 23, 2023', amount: 'Rs. 1,500' },
    { id: '#ORD-7717', customer: '+92 301 2233445', type: 'Postpaid', payment: 'Visa', status: 'Completed', date: 'Oct 22, 2023', amount: 'Rs. 3,500' },
    { id: '#ORD-7716', customer: '+92 302 3344556', type: 'Prepaid', payment: 'Visa', status: 'Failed', date: 'Oct 22, 2023', amount: 'Rs. 1,500' },
];

const Orders = () => {
    const [orders] = useState(MOCK_ORDERS);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Filter orders based on search query and status
    const filteredOrders = orders.filter((order) => {
        // Search filter: check if order ID or customer phone matches
        const matchesSearch =
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchQuery.toLowerCase());

        // Status filter
        const matchesStatus =
            statusFilter === 'all' ||
            order.status.toLowerCase() === statusFilter.toLowerCase();

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Transaction History</h1>
                <p className="text-gray-500 mt-1">View and manage all customer transactions.</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <OrdersToolbar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    statusFilter={statusFilter}
                    onStatusFilterChange={setStatusFilter}
                />
                <div className="overflow-x-auto">
                    <OrdersTable data={filteredOrders} />
                </div>

                {/* Pagination Footer */}
                <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                    <p>Showing 1-{filteredOrders.length} of {orders.length} transactions</p>
                </div>
            </div>
        </div>
    );
};

export default Orders;