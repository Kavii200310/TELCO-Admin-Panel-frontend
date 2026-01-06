# 🔗 Backend Integration Guide

Integration guide for connecting the frontend data fetching pattern with your backend server.

---

## ✅ Backend Endpoints Configuration

Your backend has the following endpoints:

### Inventory (Numbers)
```
GET    /admin/numbers          - Get all numbers
POST   /admin/numbers          - Create number
PUT    /admin/numbers/:id      - Update number
DELETE /admin/numbers/:id      - Delete number
```

### Orders
```
GET    /admin/orders           - Get all orders
POST   /admin/orders           - Create order
PUT    /admin/orders/:id       - Update order
DELETE /admin/orders/:id       - Delete order
```

### Dashboard
```
GET    /admin/dashboard        - Get dashboard data
```

---

## 🔄 Frontend API Services Updated

All frontend API services have been updated to match your backend endpoints:

### 1. **Inventory API** - `src/services/inventoryAPI.js`
```javascript
// Now uses: /admin/numbers
inventoryAPI.getItems()         // GET /admin/numbers
inventoryAPI.createItem(data)   // POST /admin/numbers
inventoryAPI.updateItem(id, data) // PUT /admin/numbers/:id
inventoryAPI.deleteItem(id)     // DELETE /admin/numbers/:id
```

### 2. **Orders API** - `src/services/ordersAPI.js`
```javascript
// Now uses: /admin/orders
ordersAPI.getOrders()           // GET /admin/orders
ordersAPI.createOrder(data)     // POST /admin/orders
ordersAPI.updateOrder(id, data) // PUT /admin/orders/:id
ordersAPI.deleteOrder(id)       // DELETE /admin/orders/:id
```

### 3. **Dashboard API** - `src/services/dashboardAPI.js` (NEW)
```javascript
// Now uses: /admin/dashboard
dashboardAPI.getDashboard()     // GET /admin/dashboard
```

---

## 📦 Usage Examples

### Get Inventory Numbers
```jsx
import { inventoryAPI } from "@/services";

// Direct API call
const response = await inventoryAPI.getItems();

// Or with hook
import { useFetch } from "@/hooks";
const { data: numbers } = useFetch("/admin/numbers");
```

### Get Orders
```jsx
import { ordersAPI } from "@/services";

// Direct API call
const response = await ordersAPI.getOrders();

// Or with hook
const { data: orders } = useFetch("/admin/orders");
```

### Get Dashboard Data
```jsx
import { dashboardAPI } from "@/services";

// Direct API call
const response = await dashboardAPI.getDashboard();

// Or with hook
const { data: dashboard } = useFetch("/admin/dashboard");
```

### Create Number
```jsx
import { useMutation } from "@/hooks";

const { execute: createNumber, loading } = useMutation(
  "/admin/numbers",
  "POST"
);

await createNumber({ 
  number: "1234567890",
  type: "mobile",
  status: "active"
});
```

### Update Number
```jsx
import { useMutation } from "@/hooks";

const { execute: updateNumber } = useMutation(
  `/admin/numbers/${id}`,
  "PUT"
);

await updateNumber({ status: "inactive" });
```

### Delete Number
```jsx
import { useMutation } from "@/hooks";

const { execute: deleteNumber } = useMutation(
  `/admin/numbers/${id}`,
  "DELETE"
);

await deleteNumber();
```

---

## 🧪 Component Integration Examples

### InventoryManagement.jsx - Get All Numbers
```jsx
import { useFetch } from "@/hooks";
import { inventoryAPI } from "@/services";

export function InventoryManagement() {
  const { data: numbers, loading, error, refetch } = useFetch(
    "/admin/numbers"
  );

  if (loading) return <div>Loading numbers...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <table>
        <tbody>
          {numbers?.map(num => (
            <tr key={num.id}>
              <td>{num.number}</td>
              <td>{num.type}</td>
              <td>{num.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}
```

### Orders.jsx - Get All Orders
```jsx
import { useFetch } from "@/hooks";

export function Orders() {
  const { data: orders, loading, error } = useFetch("/admin/orders");

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {orders?.map(order => (
        <div key={order.id}>
          {order.id} - {order.status}
        </div>
      ))}
    </div>
  );
}
```

### Dashboard.jsx - Get Dashboard Data
```jsx
import { useFetch } from "@/hooks";
import { dashboardAPI } from "@/services";

export function Dashboard() {
  const { data: dashboard, loading } = useFetch("/admin/dashboard");

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <div>Total Numbers: {dashboard?.totalNumbers}</div>
      <div>Total Orders: {dashboard?.totalOrders}</div>
      <div>Revenue: ${dashboard?.revenue}</div>
    </div>
  );
}
```

---

## 🔐 CORS Configuration

Your backend is configured with CORS for localhost:5173:

```javascript
app.use(cors({
  origin: "http://localhost:5173"
}));
```

The frontend Vite dev server runs on port 5173 by default, so CORS is already configured correctly.

---

## 🚀 Running Together

### Step 1: Start Backend
```bash
cd backend
node server.js
# Server running on port 5000
```

### Step 2: Start Frontend
```bash
cd frontend
npm run dev
# Running on http://localhost:5173
```

### Step 3: Test Connection
Open browser console and run:
```javascript
import { ordersAPI } from "@/services";
const orders = await ordersAPI.getOrders();
console.log(orders);
```

---

## 📝 Backend Response Format

Your backend should return responses in this format:

### Success Response (200)
```json
{
  "data": { /* item or array of items */ },
  "message": "Success"
}
```

### Error Response (4xx/5xx)
```json
{
  "message": "Error message here",
  "code": "ERROR_CODE"
}
```

---

## 🔧 API Service Files Updated

✅ `src/services/api.js` - Axios configuration
✅ `src/services/inventoryAPI.js` - Updated to `/admin/numbers`
✅ `src/services/ordersAPI.js` - Updated to `/admin/orders`
✅ `src/services/authAPI.js` - Auth endpoints
✅ `src/services/dashboardAPI.js` - NEW for `/admin/dashboard`
✅ `src/services/index.js` - Updated exports

---

## 📚 Documentation Files

- `DATA_FETCHING_GUIDE.md` - Complete guide with all endpoints
- `DATA_FETCHING_CHEATSHEET.md` - Quick reference
- `INTEGRATION_EXAMPLES.md` - Real component examples
- `QUICK_REFERENCE.md` - Code snippets

---

## 🧪 Testing Checklist

- [ ] Backend server running on port 5000
- [ ] Frontend running on port 5173
- [ ] Can fetch from `/admin/numbers` endpoint
- [ ] Can fetch from `/admin/orders` endpoint
- [ ] Can fetch from `/admin/dashboard` endpoint
- [ ] CORS errors not appearing in console
- [ ] Can create, update, delete records
- [ ] Error messages display correctly

---

## ❓ Troubleshooting

### CORS Error
**Problem:** "Access to XMLHttpRequest blocked by CORS policy"

**Solution:**
- Verify backend CORS config includes `http://localhost:5173`
- Verify origin in browser matches exactly
- Check no trailing slashes in origin

### 404 Errors
**Problem:** "GET /api/orders 404 Not Found"

**Solution:**
- Verify you're using correct endpoint: `/admin/orders` (not `/api/orders`)
- Check backend routes are defined
- Verify controller files exist

### Connection Refused
**Problem:** "Cannot GET http://localhost:5000/..."

**Solution:**
- Start backend server: `node server.js`
- Verify port 5000 is not in use
- Check VITE_API_URL environment variable

---

## 🎯 Summary

Your frontend is now fully configured to work with your backend:

| Feature | Status |
|---------|--------|
| Inventory endpoints (`/admin/numbers`) | ✅ Updated |
| Orders endpoints (`/admin/orders`) | ✅ Updated |
| Dashboard endpoints (`/admin/dashboard`) | ✅ Updated |
| CORS configuration | ✅ Compatible |
| Error handling | ✅ Implemented |
| Loading states | ✅ Implemented |
| Authentication | ✅ Ready |

Ready to integrate components and start building! 🚀
