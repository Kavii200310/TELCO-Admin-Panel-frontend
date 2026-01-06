# 📋 Data Fetching - Quick Reference Card

Print this or keep it open while coding!

---

## 🎣 HOOKS QUICK REFERENCE

### useFetch (GET)
```jsx
import { useFetch } from "@/hooks";

const { data, loading, error, refetch } = useFetch(url, {
  params: {},              // Query parameters
  shouldFetch: true,       // Conditional fetch
  dependencies: [],        // Custom deps
  onSuccess: (data) => {}, // Success callback
  onError: (err) => {},    // Error callback
});
```

### useMutation (POST/PUT/DELETE)
```jsx
import { useMutation } from "@/hooks";

const { execute, loading, error, data, reset } = useMutation(
  url,
  "POST", // Method: POST, PUT, DELETE, PATCH
  {
    onSuccess: (data) => {},
    onError: (err) => {},
  }
);

// Usage
await execute(payload, optionalCustomUrl);
reset();
```

---

## 📡 API ENDPOINTS

### authAPI
```jsx
import { authAPI } from "@/services";

authAPI.login(credentials)           // POST
authAPI.register(data)               // POST
authAPI.logout()                     // POST
authAPI.getCurrentUser()             // GET
authAPI.updateProfile(data)          // PUT
authAPI.changePassword(data)         // POST
authAPI.refreshToken()               // POST
```

### ordersAPI
```jsx
import { ordersAPI } from "@/services";

ordersAPI.getOrders(params)          // GET
ordersAPI.getOrder(id)               // GET
ordersAPI.createOrder(data)          // POST
ordersAPI.updateOrder(id, data)      // PUT
ordersAPI.deleteOrder(id)            // DELETE
ordersAPI.getStats()                 // GET
ordersAPI.exportOrders(params)       // GET (blob)
```

### inventoryAPI
```jsx
import { inventoryAPI } from "@/services";

inventoryAPI.getItems(params)        // GET
inventoryAPI.getItem(id)             // GET
inventoryAPI.createItem(data)        // POST
inventoryAPI.updateItem(id, data)    // PUT
inventoryAPI.deleteItem(id)          // DELETE
inventoryAPI.bulkUpdate(data)        // POST
```

---

## ⚙️ ADVANCED HOOKS

### useMultipleFetch (Parallel)
```jsx
import { useMultipleFetch } from "@/hooks/useDataFetchingPatterns";

const { data: [orders, inventory], loading, error } = useMultipleFetch([
  ordersAPI.getOrders(),
  inventoryAPI.getItems(),
]);
```

### usePaginatedFetch (Pagination)
```jsx
import { usePaginatedFetch } from "@/hooks/useDataFetchingPatterns";

const { data, page, loadMore, hasMore } = usePaginatedFetch(
  (pageNum, pageSize) => ordersAPI.getOrders({ page: pageNum, limit: pageSize })
);

<button onClick={loadMore} disabled={!hasMore}>Load More</button>
```

### useDebouncedFetch (Search)
```jsx
import { useDebouncedFetch } from "@/hooks/useDataFetchingPatterns";

const { data } = useDebouncedFetch(
  () => ordersAPI.getOrders({ search: query }),
  300, // delay in ms
  query.length > 2 // condition
);
```

### useInfiniteScroll (Infinite)
```jsx
import { useInfiniteScroll } from "@/hooks/useDataFetchingPatterns";

const { data, loadMore, hasMore } = useInfiniteScroll(
  (page, pageSize) => fetchFn(page, pageSize)
);
```

### useCachedFetch (Cache)
```jsx
import { useCachedFetch } from "@/hooks/useDataFetchingPatterns";

const { data, invalidateCache } = useCachedFetch(
  "settings-cache-key",
  () => settingsAPI.get(),
  5 * 60 * 1000 // TTL: 5 minutes
);
```

---

## 🛡️ ERROR UTILITIES

```jsx
import { 
  getErrorMessage,
  isNetworkError,
  isTimeoutError,
  isClientError,
  isServerError,
  isUnauthorized,
  isForbidden,
  formatErrorForLogging
} from "@/lib/errorUtils";

// Usage
const message = getErrorMessage(error);
if (isUnauthorized(error)) redirect("/login");
if (isNetworkError(error)) showOfflineMessage();
```

---

## 📝 COMMON PATTERNS

### Pattern 1: Fetch & Display
```jsx
function OrdersList() {
  const { data: orders, loading, error } = useFetch("/api/orders");
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return <div>{orders?.map(o => <div>{o.id}</div>)}</div>;
}
```

### Pattern 2: Form Submit
```jsx
function CreateOrder() {
  const { execute: create, loading, error } = useMutation("/api/orders", "POST");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try { await create(data); } 
    catch (e) { /* handled */ }
  };
  return (
    <form onSubmit={handleSubmit}>
      <button disabled={loading}>{loading ? "Creating..." : "Create"}</button>
    </form>
  );
}
```

### Pattern 3: Delete with Confirm
```jsx
function DeleteButton({ id }) {
  const { execute: del, loading } = useMutation(`/api/orders/${id}`, "DELETE");
  const handle = async () => {
    if (!confirm("Delete?")) return;
    try { await del(); }
    catch (e) { alert(e.message); }
  };
  return <button onClick={handle}>{loading ? "..." : "Delete"}</button>;
}
```

### Pattern 4: Refetch
```jsx
function Orders() {
  const { data, refetch } = useFetch("/api/orders");
  return (
    <div>
      <OrdersList items={data} />
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}
```

### Pattern 5: Conditional Fetch
```jsx
function UserProfile({ userId }) {
  const { data: user } = useFetch(`/api/users/${userId}`, {
    shouldFetch: userId !== null,
    dependencies: [userId]
  });
  return user ? <div>{user.name}</div> : null;
}
```

---

## 🔐 AUTHENTICATION

### Login
```jsx
import { authAPI } from "@/services";

async function handleLogin(credentials) {
  const res = await authAPI.login(credentials);
  localStorage.setItem("authToken", res.data.token);
  // Token auto-attached to all requests now
}
```

### Logout
```jsx
function handleLogout() {
  localStorage.removeItem("authToken");
  // 401 responses auto-redirect to /login
}
```

### Token Auto-Attachment
```javascript
// In api.js - already implemented
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

---

## ⚠️ ERROR OBJECT

```javascript
error = {
  message: string,      // "User-friendly message"
  status: number,       // 404, 500, etc.
  data: object,         // Full response data
}

// Examples
error.message  // "Order not found"
error.status   // 404
error.data     // { code: "NOT_FOUND", details: {...} }
```

---

## 🎯 STATE MANAGEMENT

```jsx
// All loading/error states are managed in hooks
const { 
  data,           // Fetched data or null
  loading,        // boolean - true while fetching
  error,          // null or error object
  refetch         // function to re-fetch
} = useFetch(url);

// Always check in this order:
if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error.message}</p>;
return <div>{data?.field}</div>;
```

---

## 🚀 SETUP CHECKLIST

- [ ] Import hooks from `@/hooks`
- [ ] Import APIs from `@/services`
- [ ] Create `.env` with `VITE_API_URL`
- [ ] Check auth token in Network tab
- [ ] Verify error messages display
- [ ] Test refetch button
- [ ] Test 401 redirect

---

## 📚 DOCUMENTATION FILES

| File | Use For |
|------|---------|
| README_DATA_FETCHING.md | Overview & structure |
| DATA_FETCHING_CHEATSHEET.md | Quick reference |
| DATA_FETCHING_GUIDE.md | Complete guide |
| INTEGRATION_EXAMPLES.md | Real examples |
| ENV_SETUP.md | Configuration |
| VERIFICATION_CHECKLIST.md | Testing |

---

## 🔗 FILE LOCATIONS

```
src/services/
  ├── api.js              ← Axios config
  ├── authAPI.js
  ├── inventoryAPI.js
  ├── ordersAPI.js
  └── index.js

src/hooks/
  ├── useFetch.js         ← Use this for GET
  ├── useMutation.js      ← Use this for POST/PUT/DELETE
  ├── useDataFetchingPatterns.js ← Advanced patterns
  └── index.js

src/lib/
  └── errorUtils.js       ← Error handling
```

---

## 💡 PRO TIPS

1. **Always handle 3 states**: loading, error, data
2. **Use dependencies** to refetch when data changes
3. **Use shouldFetch** for conditional requests
4. **Use error.status** to differentiate error types
5. **Use refetch** for manual refresh
6. **Use advanced hooks** for complex scenarios
7. **Never call hooks conditionally** - always at top level
8. **Always provide fallback** in template: `data?.field`

---

**Keep this card handy while coding!** 📌
