import React from 'react';
import { CreditCard, Banknote, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

const OrdersTable = ({ data = [] }) => {
    console.log('🔄 OrdersTable rendering');
    console.log('📊 Received data:', data);
    console.log('📊 Data length:', data?.length);
    console.log('📊 First item:', data?.[0]);

    // Helper: Status Styling - matches your DB values (success, pending, failed)
    const getStatusColor = (status) => {
        const stat = (status || '').toLowerCase();
        switch (stat) {
            case 'success':
            case 'completed':
                return 'bg-green-100 text-green-700 hover:bg-green-100 border-none';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-none';
            case 'failed':
            case 'cancelled':
                return 'bg-red-100 text-red-700 hover:bg-red-100 border-none';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const getPaymentIcon = (method = "") => {
        const value = String(method || '').toLowerCase();
        
        if (value.includes("card") || value.includes("credit")) {
            return <CreditCard className="w-4 h-4 text-gray-400 mr-2" />;
        }
        return <Banknote className="w-4 h-4 text-gray-400 mr-2" />;
    };

    // Format date from timestamp
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (e) {
            return dateString;
        }
    };

    // Format amount
    const formatAmount = (amount) => {
        if (!amount && amount !== 0) return 'Rs. 0.00';
        return `Rs. ${Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    // Ensure data is an array
    const orders = Array.isArray(data) ? data : [];

    if (orders.length === 0) {
        console.log('⚠️ No orders to display');
        return (
            <div className="flex flex-col items-center justify-center py-12 px-4">
                <Package className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">No orders found</p>
                <p className="text-gray-400 text-sm mt-2">Orders will appear here once customers make purchases</p>
            </div>
        );
    }

    console.log('✅ Displaying', orders.length, 'orders');

    return (
        <Table>
            <TableHeader className="bg-gray-50/50">
                <TableRow>
                    <TableHead className="font-semibold text-gray-600">ORDER ID</TableHead>
                    <TableHead className="font-semibold text-gray-600">PHONE NUMBER</TableHead>
                 
                    <TableHead className="font-semibold text-gray-600">PAYMENT METHOD</TableHead>
                    <TableHead className="font-semibold text-gray-600">STATUS</TableHead>
                    <TableHead className="font-semibold text-gray-600">DATE</TableHead>
                    <TableHead className="text-right font-semibold text-gray-600">AMOUNT</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map((order, index) => {
                    // Map database fields exactly as they are in your payments table
                    const orderId = order.order_id || '-';
                    const phoneNumber = order.phone_number || '—';
                
                    const payment = order.payment_method || 'Cash';
                    const status = order.status || 'Unknown';
                    const date = order.created_at || '-';
                    const amount = order.amount || 0;

                    console.log(`Row ${index}:`, { orderId, phoneNumber,  payment, status, date, amount });

                    return (
                        <TableRow 
                            key={order.id || index} 
                            className="hover:bg-gray-50/60 transition-colors"
                        >
                            <TableCell className="font-bold text-gray-900">
                                {orderId}
                            </TableCell>
                            
                            <TableCell className="text-gray-600">
                                {phoneNumber}
                            </TableCell>
                         
                            
                            <TableCell>
                                <div className="flex items-center text-gray-600">
                                    {getPaymentIcon(payment)}
                                    <span className="capitalize">{payment}</span>
                                </div>
                            </TableCell>
                            
                            <TableCell>
                                <Badge 
                                    className={`rounded-md font-medium shadow-none capitalize ${getStatusColor(status)}`}
                                >
                                    {status}
                                </Badge>
                            </TableCell>
                            
                            <TableCell className="text-gray-500 text-sm">
                                {formatDate(date)}
                            </TableCell>
                            
                            <TableCell className="text-right font-bold text-gray-900">
                                {formatAmount(amount)}
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

export default OrdersTable;