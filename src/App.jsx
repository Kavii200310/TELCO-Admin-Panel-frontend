import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import Dashboard from "@/pages/Dashboard";
import InventoryManagement from "@/pages/InventoryManagement";
import Orders from "@/pages/Orders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="inventory" element={<InventoryManagement />} />
          <Route path="users" element={<div>Users Page</div>} />
          <Route path="products" element={<div>Products Page</div>} />
          <Route path="orders" element={<Orders />} />
          <Route path="settings" element={<div>Settings Page</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
