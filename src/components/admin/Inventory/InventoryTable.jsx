import React from 'react';
import { Smartphone, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const InventoryTable = ({ data }) => {

    // Helper functions specific to this table's display logic
    const getCategoryBadge = (category) => {
        switch (category.toLowerCase()) {
            case 'gold':
                return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200';
            case 'silver':
                return 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200';
            default:
                return 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200';
        }
    };

    const getStatusBadge = (status) => {
        const isAvailable = status.toLowerCase() === 'available';
        const colorClass = isAvailable ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700';
        const dotClass = isAvailable ? 'bg-green-500' : 'bg-red-500';

        return (
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
                {status}
            </span>
        );
    };

    return (
        <Table>
            <TableHeader className="bg-gray-50/50">
                <TableRow>
                    <TableHead className="w-[300px] font-semibold text-gray-600">PHONE NUMBER</TableHead>
                    <TableHead className="font-semibold text-gray-600">CATEGORY</TableHead>
                    <TableHead className="font-semibold text-gray-600">PRICE</TableHead>
                    <TableHead className="font-semibold text-gray-600">STATUS</TableHead>
                    <TableHead className="text-right font-semibold text-gray-600">ACTIONS</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item) => (
                    <TableRow key={item.id} className="hover:bg-gray-50/60 transition-colors">
                        <TableCell className="font-medium text-gray-900">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-100 rounded-lg text-gray-500">
                                    <Smartphone className="w-4 h-4" />
                                </div>
                                {item.number}
                            </div>
                        </TableCell>
                        <TableCell>
                            <Badge variant="outline" className={`${getCategoryBadge(item.category)} font-normal`}>
                                {item.category}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-gray-600">Rs. {item.price}</TableCell>
                        <TableCell>
                            {getStatusBadge(item.status)}
                        </TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-4 w-4 text-gray-500" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Edit Details</DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600">Delete Number</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default InventoryTable;