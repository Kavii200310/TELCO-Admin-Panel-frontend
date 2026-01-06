import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import Dashboard from "@/pages/Dashboard";
import InventoryManagement from "@/pages/InventoryManagement";
import Orders from "@/pages/Orders";
import Login from "@/pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login Route - Outside of AdminLayout */}
        <Route path="/login" element={<Login />} />

        {/* Admin Routes - Protected by AdminLayout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="inventory" element={<InventoryManagement />} />
          <Route path="users" element={<div>Users Page</div>} />
          <Route path="products" element={<div>Products Page</div>} />
          <Route path="orders" element={<Orders />} />
          <Route path="settings" element={<div>Settings Page</div>} />
        </Route>

        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
