import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/services/api";

const AddNumberDialog = ({ open, onOpenChange, editData, onSuccess }) => {
  const [form, setForm] = useState({
    phone_number: "",
    category: "normal",
    status: "available",
    price: "",
    type: "prepaid",
  });

  useEffect(() => {
    if (editData) {
      setForm(editData);
    }
  }, [editData]);

  const handleSubmit = async () => {
    try {
      if (editData) {
        await api.put(`/admin/numbers/${editData.id}`, form);
      } else {
        await api.post("/admin/numbers", form);
      }
      onSuccess();
      onOpenChange(false);
    } catch (err) {
      alert(err.response?.data?.error || "Save failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editData ? "Edit Number" : "Add New Number"}</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Phone Number"
          value={form.phone_number}
          onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
          disabled={!!editData}
        />

        <Input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <Input
          placeholder="Status"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        />

        <Input
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <Input
          placeholder="Type"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        />

        <Button onClick={handleSubmit}>
          {editData ? "Update Number" : "Add Number"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddNumberDialog;
