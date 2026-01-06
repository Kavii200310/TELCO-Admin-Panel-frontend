# Data Fetching Cheat Sheet

Quick reference for common data fetching patterns.

## 🚀 Quick Start

### Fetch Data
```jsx
import { useFetch } from "@/hooks";

function MyComponent() {
  const { data, loading, error, refetch } = useFetch("/api/orders");
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return <div>{data?.length} orders</div>;
}
```

### Create/Update/Delete
```jsx
import { useMutation } from "@/hooks";

function DeleteButton({ id }) {
  const { execute: deleteOrder, loading } = useMutation(
    `/api/orders/${id}`,
    "DELETE"
  );
  
  return (
    <button onClick={deleteOrder} disabled={loading}>
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}
```

---

## 📡 API Endpoints Usage

### Direct API Calls
```jsx
import { ordersAPI } from "@/services";

// In component
useEffect(() => {
  ordersAPI.getOrders()
    .then(res => setOrders(res.data))
    .catch(err => setError(err.message));
}, []);
```

### Via Hooks
```jsx
const { data: orders } = useFetch("/api/orders");
```

---

## 🎣 Common Hook Patterns

### Conditional Fetching
```jsx
const { data } = useFetch("/api/users/profile", {
  shouldFetch: userId !== null,
  dependencies: [userId]
});
```

### With Callbacks
```jsx
const { data } = useFetch("/api/orders", {
  onSuccess: (data) => console.log("Loaded:", data),
  onError: (err) => console.error("Failed:", err)
});
```

### Manual Refetch
```jsx
const { data, refetch } = useFetch("/api/orders");
// Later...
<button onClick={refetch}>Refresh</button>
```

### Form Submission
```jsx
const { execute: createOrder, loading, error } = useMutation(
  "/api/orders",
  "POST"
);

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await createOrder(formData);
  } catch (err) {
    // Error already in hook state
  }
};
```

---

## 🛡️ Error Handling

### Display Error
```jsx
if (error) {
  return (
    <div className="error">
      {error.message}
      <button onClick={refetch}>Retry</button>
    </div>
  );
}
```

### Check Error Type
```jsx
import { isUnauthorized, isServerError } from "@/lib/errorUtils";

if (isUnauthorized(error)) redirect("/login");
if (isServerError(error)) showAlert("Server error");
```

### Get Error Message
```jsx
import { getErrorMessage } from "@/lib/errorUtils";

try {
  await someAPI.call();
} catch (err) {
  const message = getErrorMessage(err);
  toast.error(message);
}
```

---

## 📋 Advanced Patterns

### Multiple Parallel Requests
```jsx
import { useMultipleFetch } from "@/hooks/useDataFetchingPatterns";

const { data: [orders, inventory] } = useMultipleFetch([
  ordersAPI.getOrders(),
  inventoryAPI.getItems()
]);
```

### Debounced Search
```jsx
import { useDebouncedFetch } from "@/hooks/useDataFetchingPatterns";

const { data: results } = useDebouncedFetch(
  () => ordersAPI.getOrders({ search: query }),
  300,
  query.length > 2
);
```

### Pagination
```jsx
import { usePaginatedFetch } from "@/hooks/useDataFetchingPatterns";

const { data, page, loadMore, hasMore } = usePaginatedFetch(
  (pageNum, pageSize) => ordersAPI.getOrders({ page: pageNum, limit: pageSize })
);
```

### Cached Data
```jsx
import { useCachedFetch } from "@/hooks/useDataFetchingPatterns";

const { data, invalidateCache } = useCachedFetch(
  "settings",
  () => settingsAPI.get(),
  5 * 60 * 1000  // Cache for 5 minutes
);
```

---

## 🔐 Authentication

### Login & Token
```jsx
async function handleLogin(credentials) {
  const response = await authAPI.login(credentials);
  localStorage.setItem("authToken", response.data.token);
  // Token auto-attached to all requests
}
```

### Logout
```jsx
function handleLogout() {
  localStorage.removeItem("authToken");
  // 401 errors auto-redirect to /login
}
```

---

## 📝 Common Endpoints

### Orders
```jsx
import { ordersAPI } from "@/services";

ordersAPI.getOrders({ page: 1, limit: 10 })
ordersAPI.getOrder(123)
ordersAPI.createOrder(data)
ordersAPI.updateOrder(123, data)
ordersAPI.deleteOrder(123)
ordersAPI.getStats()
```

### Inventory
```jsx
import { inventoryAPI } from "@/services";

inventoryAPI.getItems()
inventoryAPI.getItem(123)
inventoryAPI.createItem(data)
inventoryAPI.updateItem(123, data)
inventoryAPI.deleteItem(123)
```

### Auth
```jsx
import { authAPI } from "@/services";

authAPI.login(credentials)
authAPI.register(data)
authAPI.logout()
authAPI.getCurrentUser()
authAPI.updateProfile(data)
authAPI.changePassword(data)
```

---

## ⚠️ Common Mistakes

### ❌ Don't
```jsx
// Wrong: Calling hook conditionally
if (condition) {
  const data = useFetch(url);  // Breaks hook rules
}

// Wrong: Not handling loading
const { data } = useFetch(url);
return data.map(item => ...);  // Crashes if null

// Wrong: Hardcoded URLs
fetch("http://localhost:5000/api/orders")
```

### ✅ Do
```jsx
// Right: Conditional with shouldFetch
const { data } = useFetch(url, { shouldFetch: condition });

// Right: Always check loading/error first
const { data, loading } = useFetch(url);
if (loading) return <p>Loading...</p>;
return data?.map(item => ...);

// Right: Use API endpoints
const { data } = useFetch("/api/orders");
```

---

## 🧪 Testing Examples

### Mock API
```jsx
import { vi } from "vitest";
import api from "@/services/api";

vi.mock("@/services/api");
api.get.mockResolvedValue({ data: [{ id: 1 }] });
```

### Test Hook
```jsx
import { renderHook, waitFor } from "@testing-library/react";
import { useFetch } from "@/hooks";

const { result } = renderHook(() => useFetch("/api/orders"));
await waitFor(() => expect(result.current.loading).toBe(false));
expect(result.current.data).toBeDefined();
```

---

## 🔗 Related Files

- **Hooks**: `src/hooks/useFetch.js`, `useMutation.js`
- **API**: `src/services/api.js`, `*API.js`
- **Utils**: `src/lib/errorUtils.js`
- **Examples**: `src/components/examples/`
- **Full Guide**: `DATA_FETCHING_GUIDE.md`
