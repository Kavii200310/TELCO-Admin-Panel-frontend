
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import inventoryAPI from "@/services/inventoryAPI";

const AddNumberDialog = ({ open, onOpenChange, onSuccess }) => {
  const [formData, setFormData] = useState({
    phone_number: '',
    category: 'Normal',
    status: 'available',
    price: '',
    type: 'Prepaid'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddNumber = async () => {
    // Validation
    if (!formData.phone_number.trim()) {
      setError("Phone number is required");
      return;
    }
    
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
      setError("Valid price is required");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log('📤 Sending data:', formData);
      
      const response = await inventoryAPI.createItem(formData);
      
      console.log('✅ Number added successfully:', response);
      
      // Reset form
      setFormData({
        phone_number: '',
        category: 'Normal',
        status: 'available',
        price: '',
        type: 'Prepaid'
      });
      
      // Close dialog and refresh table
      onOpenChange(false);
      if (onSuccess) onSuccess();
      
    } catch (err) {
      console.error('❌ Add number error:', err);
      console.error('❌ Error response:', err.response);
      
      const errorMsg = err.response?.data?.error 
        || err.response?.data?.message 
        || err.message 
        || "Failed to add number";
      
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(null); // Clear error when user types
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Phone Number</DialogTitle>
        </DialogHeader>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
            ⚠️ {error}
          </div>
        )}

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="phone_number">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone_number"
              placeholder="0771234567"
              value={formData.phone_number}
              onChange={(e) => handleInputChange('phone_number', e.target.value)}
              disabled={loading}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select 
              value={formData.category} 
              onValueChange={(v) => handleInputChange('category', v)}
              disabled={loading}
            >
              <SelectTrigger id="category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Normal">Normal</SelectItem>
                <SelectItem value="Gold">Gold</SelectItem>
                <SelectItem value="Silver">Silver</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="price">
              Price (Rs.) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="price"
              type="number"
              placeholder="1000"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              disabled={loading}
              min="0"
              step="0.01"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select 
              value={formData.status} 
              onValueChange={(v) => handleInputChange('status', v)}
              disabled={loading}
            >
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="type">Type</Label>
            <Select 
              value={formData.type} 
              onValueChange={(v) => handleInputChange('type', v)}
              disabled={loading}
            >
              <SelectTrigger id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Prepaid">Prepaid</SelectItem>
                <SelectItem value="Postpaid">Postpaid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleAddNumber}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {loading ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Adding...
              </>
            ) : (
              'Add Number'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNumberDialog;