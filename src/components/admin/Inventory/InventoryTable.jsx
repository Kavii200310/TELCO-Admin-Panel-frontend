// InventoryTable.jsx
import React from "react";
import { Smartphone, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import inventoryAPI from "@/services/inventoryAPI";

const InventoryTable = ({ data = [], onRefresh, onEdit }) => {

  // Category badge style
  const getCategoryBadge = (category = "") => {
    switch (category.toLowerCase()) {
      case "gold":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "silver":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  // Status badge
  const getStatusBadge = (status = "") => {
    const stat = status.toLowerCase();

    const map = {
      available: ["bg-green-50 text-green-700", "bg-green-500"],
      success: ["bg-blue-50 text-blue-700", "bg-blue-500"],
      pending: ["bg-yellow-50 text-yellow-700", "bg-yellow-500"],
    };

    const [color, dot] =
      map[stat] || ["bg-gray-50 text-gray-700", "bg-gray-500"];

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
        {status}
      </span>
    );
  };

  // Delete handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this number?")) return;

    try {
      await inventoryAPI.deleteItem(id);
      onRefresh && onRefresh();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete number");
    }
  };

  

  return (
    <Table>
      <TableHeader className="bg-gray-50">
        <TableRow>
          <TableHead>PHONE NUMBER</TableHead>
          <TableHead>CATEGORY</TableHead>
          <TableHead>PRICE</TableHead>
          <TableHead>STATUS</TableHead>
          <TableHead>TYPE</TableHead>
          <TableHead className="text-right">ACTIONS</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-10 text-gray-500">
              No phone numbers found
            </TableCell>
          </TableRow>
        ) : (
          data.map((item) => (
            <TableRow key={item.id} className="hover:bg-gray-50">
              {/* Phone Number */}
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Smartphone className="w-4 h-4 text-gray-600" />
                  </div>
                  {item.phone_number}
                </div>
              </TableCell>

              {/* Category */}
              <TableCell>
                <Badge
                  variant="outline"
                  className={getCategoryBadge(item.category)}
                >
                  {item.category}
                </Badge>
              </TableCell>

              {/* Price */}
              <TableCell>
                Rs. {Number(item.price || 0).toLocaleString()}
              </TableCell>

              {/* Status */}
              <TableCell>{getStatusBadge(item.status)}</TableCell>

              {/* Type */}
              <TableCell>{item.type}</TableCell>

              {/* Actions */}
              <TableCell className="text-right space-x-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="text-red-600"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default InventoryTable;
