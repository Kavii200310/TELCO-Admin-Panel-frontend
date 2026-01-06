# Data Fetching Pattern - React Vite with Axios

Complete guide for implementing a professional data fetching pattern in your React Vite application.

## 📁 Project Structure

```
src/
├── services/
│   ├── api.js                 # Axios instance with interceptors
│   ├── authAPI.js             # Auth endpoints
│   ├── inventoryAPI.js        # Inventory endpoints
│   ├── ordersAPI.js           # Orders endpoints
│   └── index.js               # Centralized exports
├── hooks/
│   ├── useFetch.js            # GET requests hook
│   ├── useMutation.js         # POST/PUT/DELETE hook
│   └── index.js               # Hook exports
└── components/
    └── examples/              # Example usage
        ├── OrdersExample.jsx
        ├── CreateOrderExample.jsx
        └── InventoryExample.jsx
```

---

## 🔧 Core Setup

### 1. API Service Layer (`src/services/api.js`)

**Features:**
- Axios instance with base configuration
- Request interceptors (auto-attach auth tokens)
- Response interceptors (handle 401 errors)
- Timeout configuration
- Environment-based URLs

```javascript
import api from "@/services/api";

// Automatically includes auth token in all requests
// Handles unauthorized errors by clearing token and redirecting
```

**Configuration via Environment:**
```env
VITE_API_URL=http://localhost:5000
```

---

## 🎣 Custom Hooks

### 2. useFetch Hook (GET Requests)

**Location:** `src/hooks/useFetch.js`

**Parameters:**
```javascript
useFetch(url, {
  method: "GET",           // HTTP method (default: GET)
  headers: {},             // Custom headers
  params: {},              // Query parameters
  shouldFetch: true,       // Conditional fetching
  onSuccess: (data) => {}, // Success callback
  onError: (err) => {},    // Error callback
  dependencies: [],        // Additional useEffect dependencies
})
```

**Returns:**
```javascript
{
  data,      // Fetched data
  loading,   // Loading state
  error,     // Error object with message, status, data
  refetch    // Function to manually refetch
}
```

**Basic Usage:**
```javascript
import { useFetch } from "@/hooks";

function MyComponent() {
  const { data, loading, error, refetch } = useFetch("/api/orders");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{/* Use data */}</div>;
}
```

**Advanced Usage:**
```javascript
const { data: orders, loading, error, refetch } = useFetch(
  "/api/orders",
  {
    params: { page: 1, limit: 10 },
    shouldFetch: userId !== null,  // Only fetch if userId exists
    onSuccess: (data) => {
      console.log("Orders loaded:", data);
    },
    onError: (err) => {
      console.error("Failed to load orders:", err);
    },
    dependencies: [userId],  // Refetch when userId changes
  }
);
```

---

### 3. useMutation Hook (POST/PUT/DELETE)

**Location:** `src/hooks/useMutation.js`

**Parameters:**
```javascript
useMutation(url, method, {
  headers: {},             // Custom headers
  onSuccess: (data) => {}, // Success callback
  onError: (err) => {},    // Error callback
})
```

**Returns:**
```javascript
{
  execute,  // Async function to trigger mutation
  loading,  // Loading state
  error,    // Error object
  data,     // Response data
  reset     // Reset state function
}
```

**Usage Examples:**

```javascript
// Create
const { execute: createOrder, loading, error } = useMutation(
  "/api/orders",
  "POST"
);

await createOrder({ customerId: "123", items: [...] });
```

```javascript
// Update
const { execute: updateOrder } = useMutation(
  `/api/orders/${orderId}`,
  "PUT"
);

await updateOrder({ status: "shipped" });
```

```javascript
// Delete with error handling
const { execute: deleteOrder } = useMutation(
  `/api/orders/${orderId}`,
  "DELETE",
  {
    onSuccess: () => alert("Order deleted"),
    onError: (err) => alert(err.message),
  }
);

try {
  await deleteOrder();
} catch (err) {
  // Error already handled in hook
}
```

---

## 📡 API Endpoints

### 4. Structured Endpoint Modules

**Create feature-specific modules:**

```javascript
// src/services/ordersAPI.js
export const ordersAPI = {
  getOrders: (params) => api.get("/api/orders", { params }),
  getOrder: (id) => api.get(`/api/orders/${id}`),
  createOrder: (data) => api.post("/api/orders", data),
  updateOrder: (id, data) => api.put(`/api/orders/${id}`, data),
  deleteOrder: (id) => api.delete(`/api/orders/${id}`),
  getStats: () => api.get("/api/orders/stats"),
};
```

**Usage:**
```javascript
// Direct usage
const response = await ordersAPI.getOrders({ page: 1 });

// With hooks
const { data: orders } = useFetch("/api/orders");
```

**Available Modules:**
- `authAPI` - Authentication endpoints
- `inventoryAPI` - Inventory management
- `ordersAPI` - Order management

---

## 💡 Component Examples

### Example 1: Fetch & Display Data

```javascript
import { useFetch } from "@/hooks";

export function OrdersList() {
  const { data: orders, loading, error, refetch } = useFetch("/api/orders");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {orders?.map(order => (
        <div key={order.id}>{order.id} - {order.status}</div>
      ))}
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}
```

### Example 2: Form Submission

```javascript
import { useState } from "react";
import { useMutation } from "@/hooks";

export function CreateOrderForm() {
  const [formData, setFormData] = useState({});
  const { execute: createOrder, loading, error } = useMutation(
    "/api/orders",
    "POST"
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createOrder(formData);
      alert("Order created!");
    } catch (err) {
      // Error already set in hook
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button disabled={loading}>{loading ? "Creating..." : "Create"}</button>
      {error && <div>{error.message}</div>}
    </form>
  );
}
```

### Example 3: Delete with Confirmation

```javascript
import { useMutation } from "@/hooks";

export function DeleteOrderButton({ orderId, onDeleted }) {
  const { execute: deleteOrder, loading } = useMutation(
    `/api/orders/${orderId}`,
    "DELETE",
    {
      onSuccess: () => {
        alert("Order deleted");
        onDeleted?.();
      },
    }
  );

  const handleDelete = async () => {
    if (confirm("Delete this order?")) {
      try {
        await deleteOrder();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <button onClick={handleDelete} disabled={loading}>
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}
```

---

## 🛡️ Error Handling

### Error Object Structure

```javascript
error: {
  message: string,      // User-friendly error message
  status: number,       // HTTP status code (401, 404, 500, etc.)
  data: object,         // Full error response from server
}
```

### Error Handling Best Practices

```javascript
const { data, error, refetch } = useFetch("/api/orders");

// Check specific error status
if (error?.status === 404) {
  return <div>Orders not found</div>;
}

// Display full error details
if (error?.status === 500) {
  return (
    <div>
      <p>Server error</p>
      <details>
        <summary>Details</summary>
        <pre>{JSON.stringify(error.data, null, 2)}</pre>
      </details>
    </div>
  );
}

// Retry mechanism
if (error) {
  return <button onClick={refetch}>Retry</button>;
}
```

---

## 🔐 Authentication

### Auto-attached Tokens

The API service automatically:
1. Reads token from `localStorage.getItem("authToken")`
2. Adds to all requests as `Authorization: Bearer {token}`
3. Clears token and redirects to login on 401 response

### Setting Token After Login

```javascript
async function handleLogin(credentials) {
  try {
    const response = await authAPI.login(credentials);
    localStorage.setItem("authToken", response.data.token);
    // Token is now auto-attached to all requests
  } catch (err) {
    console.error("Login failed");
  }
}
```

### Logout

```javascript
function handleLogout() {
  localStorage.removeItem("authToken");
  // Subsequent requests won't have Authorization header
  // 401 responses will auto-redirect to /login
}
```

---

## 📋 Best Practices

### ✅ DO

1. **Use typed API endpoints** - Create feature-specific API modules
2. **Handle loading states** - Show spinners/skeletons during fetch
3. **Show error messages** - Display user-friendly error text
4. **Provide refetch button** - Let users retry failed requests
5. **Use conditional fetching** - Only fetch when necessary
6. **Validate form data** - Before sending mutations
7. **Handle 401 errors** - Auto redirect to login (already handled)
8. **Use environment variables** - For API URLs

### ❌ DON'T

1. **Don't ignore errors** - Always handle and display them
2. **Don't remove loading states** - Users need feedback
3. **Don't call hooks conditionally** - Must be at top level
4. **Don't make direct fetch() calls** - Use custom hooks or API modules
5. **Don't store sensitive data** - Beyond auth token in localStorage
6. **Don't hardcode API URLs** - Use environment variables
7. **Don't forget to handle 401** - Token expiration must redirect

---

## 🔄 Request & Response Interceptors

### Request Interceptor (Auto Token)

```javascript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Response Interceptor (Auto Logout on 401)

```javascript
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
```

---

## 🧪 Testing Tips

### Mock API with Vitest

```javascript
import { vi } from "vitest";
import api from "@/services/api";

vi.mock("@/services/api");

test("fetches orders successfully", async () => {
  api.get.mockResolvedValue({ data: [{ id: 1, status: "pending" }] });
  
  const { result } = renderHook(() => useFetch("/api/orders"));
  
  await waitFor(() => expect(result.current.loading).toBe(false));
  expect(result.current.data).toEqual([{ id: 1, status: "pending" }]);
});
```

---

## 📚 Summary

| Feature | Location | Use Case |
|---------|----------|----------|
| API Setup | `services/api.js` | Global Axios config |
| Fetch Data | `hooks/useFetch.js` | GET requests in components |
| Mutations | `hooks/useMutation.js` | POST/PUT/DELETE in forms |
| Endpoints | `services/*API.js` | Organized API calls |
| Examples | `components/examples/` | Reference implementations |

---

## 🚀 Getting Started

1. Import hooks and services where needed
2. Use `useFetch` for data loading
3. Use `useMutation` for form submissions
4. Check loading/error states
5. Provide user feedback via UI
