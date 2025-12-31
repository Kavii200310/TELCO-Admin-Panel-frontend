import React from 'react';
import { CreditCard, Banknote, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

const OrdersTable = ({ data }) => {
    
    // Helper: Status Styling
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'completed': return 'bg-green-100 text-green-700 hover:bg-green-100 border-none';
            case 'pending': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-none';
            case 'failed': return 'bg-red-100 text-red-700 hover:bg-red-100 border-none';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    // Helper: Payment Icon
    const getPaymentIcon = (method) => {
        if (method.includes('Visa') || method.includes('Mastercard')) {
            return <CreditCard className="w-4 h-4 text-gray-400 mr-2" />;
        }
        return <Banknote className="w-4 h-4 text-gray-400 mr-2" />;
    };

    return (
        <Table>
            <TableHeader className="bg-gray-50/50">
                <TableRow>
                    <TableHead className="w-[120px] font-semibold text-gray-600 uppercase text-xs">Order ID</TableHead>
                    <TableHead className="font-semibold text-gray-600 uppercase text-xs">Customer</TableHead>
                    <TableHead className="font-semibold text-gray-600 uppercase text-xs">eSIM Type</TableHead>
                    <TableHead className="font-semibold text-gray-600 uppercase text-xs">Payment Method</TableHead>
                    <TableHead className="font-semibold text-gray-600 uppercase text-xs">Status</TableHead>
                    <TableHead className="font-semibold text-gray-600 uppercase text-xs">Date</TableHead>
                    <TableHead className="text-right font-semibold text-gray-600 uppercase text-xs">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((order) => (
                    <TableRow key={order.id} className="hover:bg-gray-50/60 transition-colors">
                        <TableCell className="font-bold text-gray-900">{order.id}</TableCell>
                        <TableCell className="text-gray-600">{order.customer}</TableCell>
                        <TableCell>
                            <Badge variant="outline" className="bg-gray-50 font-normal text-gray-600 border-gray-200">
                                {order.type}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center text-gray-600">
                                {getPaymentIcon(order.payment)}
                                {order.payment}
                            </div>
                        </TableCell>
                        <TableCell>
                            <Badge className={`rounded-md font-medium shadow-none ${getStatusColor(order.status)}`}>
                                {order.status}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-gray-500 text-sm">{order.date}</TableCell>
                        <TableCell className="text-right font-bold text-gray-900">{order.amount}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default OrdersTable;