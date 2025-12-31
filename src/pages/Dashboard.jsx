import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Signal, Smartphone, Clock } from 'lucide-react'; 
import StatCard from '@/components/admin/Dashboard/StatCard';


const MOCK_STATS_DATA = [
    { 
        id: 1, 
        title: 'Total Revenue', 
        value: 'Rs. 450,000', 
        icon: DollarSign, 
        bgIconColor: "bg-green-50", 
        iconColor: "text-green-600" 
    },
    { 
        id: 2, 
        title: 'Active eSIMs', 
        value: '1,250', 
        icon: Signal, 
        bgIconColor: "bg-blue-50", 
        iconColor: "text-blue-600" 
    },
    { 
        id: 3, 
        title: 'Stock Available', 
        value: '850', 
        icon: Smartphone, 
        bgIconColor: "bg-purple-50", 
        iconColor: "text-purple-600" 
    },
    { 
        id: 4, 
        title: 'Pending Orders', 
        value: '12', 
        icon: Clock, 
        bgIconColor: "bg-orange-50", 
        iconColor: "text-orange-600" 
    },
];

const MOCK_TRANSACTIONS_DATA = [
    { id: 'TRX-9921', phone: '+92 300 1234567', status: 'Success', date: 'Oct 24, 2023', amount: 'Rs. 5,000' },
    { id: 'TRX-9922', phone: '+92 301 9876543', status: 'Pending', date: 'Oct 24, 2023', amount: 'Rs. 1,200' },
    { id: 'TRX-9923', phone: '+92 321 4567890', status: 'Success', date: 'Oct 23, 2023', amount: 'Rs. 3,500' },
    { id: 'TRX-9924', phone: '+92 333 1122334', status: 'Success', date: 'Oct 23, 2023', amount: 'Rs. 5,000' },
];

const Dashboard = () => {
    const [stats, setStats] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API
            setStats(MOCK_STATS_DATA);
            setTransactions(MOCK_TRANSACTIONS_DATA);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'success': return 'bg-green-100 text-green-700 hover:bg-green-100 border-none';
            case 'pending': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-none';
            case 'failed': return 'bg-red-100 text-red-700 hover:bg-red-100 border-none';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="flex flex-col gap-8">
            {/* Header Section */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500 mt-1">Welcome back, Admin</p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <StatCard
                        key={stat.id}
                        title={stat.title}
                        value={stat.value}
                        icon={stat.icon}
                        bgIconColor={stat.bgIconColor}
                        iconColor={stat.iconColor}
                    />
                ))}
            </div>

            {/* Recent Transactions Table */}
            <Card className="shadow-sm border-gray-100 bg-white">
                <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-gray-50">
                    <CardTitle className="text-lg font-bold text-gray-900">Recent Transactions</CardTitle>
                    <Button variant="link" className="text-blue-600 font-semibold p-0 h-auto text-sm">
                        View All ↗
                    </Button>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full text-sm text-left">
                            {/* Updated Header: Uppercase & Lighter Text */}
                            <thead className="text-xs text-gray-400 uppercase bg-white border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Transaction ID</th>
                                    <th className="px-6 py-4 font-semibold">Customer Phone</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold">Date</th>
                                    <th className="px-6 py-4 font-semibold text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {transactions.map((trx) => (
                                    <tr key={trx.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">{trx.id}</td>
                                        <td className="px-6 py-4 text-gray-500">{trx.phone}</td>
                                        <td className="px-6 py-4">
                                            <Badge className={`rounded-full px-3 font-medium shadow-none ${getStatusColor(trx.status)}`}>
                                                {trx.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">{trx.date}</td>
                                        <td className="px-6 py-4 font-bold text-gray-900 text-right">{trx.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Dashboard;