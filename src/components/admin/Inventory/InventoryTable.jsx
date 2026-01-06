// InventoryTable.jsx
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
import api from "@/services/api";

const InventoryTable = ({ data = [], onRefresh }) => {
  const getPhoneNumber = (item) => {
    return item.phone_number ?? '—';
  };

  const getCategoryBadge = (category = '') => {
    const cat = category?.toLowerCase();
    switch (cat) {
      case 'gold':
        return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200';
      case 'silver':
        return 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200';
      case 'normal':
        return 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200';
      default:
        return 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200';
    }
  };

  const getStatusBadge = (status = '') => {
    const stat = status?.toLowerCase();
    let colorClass = 'bg-gray-50 text-gray-700';
    let dotClass = 'bg-gray-500';

    if (stat === 'available') {
      colorClass = 'bg-green-50 text-green-700';
      dotClass = 'bg-green-500';
    } else if (stat === 'success') {
      colorClass = 'bg-blue-50 text-blue-700';
      dotClass = 'bg-blue-500';
    } else if (stat === 'pending') {
      colorClass = 'bg-yellow-50 text-yellow-700';
      dotClass = 'bg-yellow-500';
    }

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
        {status || 'Unknown'}
      </span>
    );
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this number?")) return;

    try {
      await api.delete(`/admin/numbers/${id}`);
      alert("Number deleted successfully");
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error('Delete error:', err);
      alert(err.response?.data?.error || "Failed to delete number");
    }
  };

  console.log('InventoryTable rendering with data:', data);

  return (
    <Table>
      <TableHeader className="bg-gray-50/50">
        <TableRow>
          <TableHead className="w-[300px] font-semibold text-gray-600">PHONE NUMBER</TableHead>
          <TableHead className="font-semibold text-gray-600">CATEGORY</TableHead>
          <TableHead className="font-semibold text-gray-600">PRICE</TableHead>
          <TableHead className="font-semibold text-gray-600">STATUS</TableHead>
          <TableHead className="font-semibold text-gray-600">TYPE</TableHead>
          <TableHead className="text-right font-semibold text-gray-600">ACTIONS</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {!data || data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center text-gray-500 py-10">
              No phone numbers found
            </TableCell>
          </TableRow>
        ) : (
          data.map((item) => (
            <TableRow key={item.id} className="hover:bg-gray-50/60 transition-colors">
              <TableCell className="font-medium text-gray-900">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg text-gray-500">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  {getPhoneNumber(item)}
                </div>
              </TableCell>

              <TableCell>
                <Badge variant="outline" className={`${getCategoryBadge(item.category)} font-normal`}>
                  {item.category || 'Normal'}
                </Badge>
              </TableCell>

              <TableCell className="text-gray-600">
                Rs. {Number(item.price || 0).toLocaleString()}
              </TableCell>

              <TableCell>
                {getStatusBadge(item.status)}
              </TableCell>

              <TableCell className="text-gray-600">
                {item.type || '—'}
              </TableCell>

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4 text-gray-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Details</DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete Number
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default InventoryTable;