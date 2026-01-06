import React from 'react';
import { Search, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const OrdersToolbar = ({ searchQuery, onSearchChange, statusFilter, onStatusFilterChange }) => {
    return (
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row items-center gap-4 justify-between">
            {/* Search Input */}
            
            <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                    placeholder="Search by Order ID or Phone..."
                    className="pl-9 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
                <Select value={statusFilter} onValueChange={onStatusFilterChange}>
                    <SelectTrigger className="w-[140px] border-gray-200 bg-gray-50">
                        <Filter className="w-4 h-4 mr-2 text-gray-500" />
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                </Select>

                <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                </Button>
            </div>
        </div>
    );
};

export default OrdersToolbar;