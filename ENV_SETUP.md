# Environment Configuration

## Setting Up Environment Variables for Data Fetching

### Create `.env` file in project root

```env
# API Configuration
VITE_API_URL=http://localhost:5000

# Optional: Add more environments
VITE_API_TIMEOUT=10000
```

### Create `.env.development` for development

```env
VITE_API_URL=http://localhost:5000
VITE_API_TIMEOUT=10000
```

### Create `.env.production` for production

```env
VITE_API_URL=https://api.yourdomain.com
VITE_API_TIMEOUT=15000
```

### Create `.env.staging` for staging

```env
VITE_API_URL=https://staging-api.yourdomain.com
VITE_API_TIMEOUT=10000
```

---

## Using Environment Variables

### In `src/services/api.js`

The API service automatically reads from environment:

```javascript
const api = axios.create({
  baseURL: process.env.VITE_API_URL || "http://localhost:5000",
  timeout: process.env.VITE_API_TIMEOUT || 10000,
  // ...
});
```

### In Components

```jsx
// Access environment variables in components (optional)
console.log(import.meta.env.VITE_API_URL);
```

---

## Running with Different Environments

### Development (default)
```bash
npm run dev
# Uses VITE_API_URL from .env or .env.development
```

### Production Build
```bash
npm run build
# Uses VITE_API_URL from .env.production
```

### Preview Production Build
```bash
npm run preview
# Preview the production build locally
```

---

## Environment Variable Names

Use `VITE_` prefix for all environment variables to be exposed to client-side code.

```env
# ✅ Correct (exposed to client)
VITE_API_URL=http://localhost:5000
VITE_PUBLIC_KEY=abc123

# ❌ Wrong (not exposed, only available in build time)
REACT_APP_API_URL=http://localhost:5000
API_SECRET=secret  # Don't expose secrets!
```

---

## .gitignore

Ensure `.env` files are not committed:

```
# Environment variables
.env
.env.local
.env.*.local
.env.production.local

# Never commit sensitive data
.env.secrets
```

---

## Vite Configuration

Vite automatically loads environment variables from `.env` files:

1. `.env` - Default environment variables
2. `.env.local` - Local overrides (not committed)
3. `.env.[mode]` - Mode-specific variables (development, production)
4. `.env.[mode].local` - Mode-specific local overrides

---

## Example Setup

### Step 1: Create `.env`

```bash
cd /path/to/TELCO-Admin-Panel-frontend
echo "VITE_API_URL=http://localhost:5000" > .env
```

### Step 2: Create `.env.local` (for your local machine)

```env
# .env.local (not committed)
VITE_API_URL=http://localhost:3000
VITE_DEBUG=true
```

### Step 3: Start development server

```bash
npm run dev
```

---

## Accessing Environment Variables

### In `src/services/api.js`
```javascript
const baseURL = process.env.VITE_API_URL;
const timeout = parseInt(process.env.VITE_API_TIMEOUT);
```

### In Components
```jsx
// Access using import.meta.env
const apiUrl = import.meta.env.VITE_API_URL;
console.log('API URL:', apiUrl); // Only in development/console
```

### Building for Production
```bash
VITE_API_URL=https://api.production.com npm run build
```

---

## Troubleshooting

### Issue: Environment variable not loaded

**Solution:**
1. Restart dev server after changing `.env`
2. Use `VITE_` prefix in variable name
3. Check `.env` file encoding (UTF-8)

### Issue: API URL shows as undefined

**Solution:**
```javascript
// Always provide fallback
const api = axios.create({
  baseURL: process.env.VITE_API_URL || "http://localhost:5000",
});
```

### Issue: Different URLs in production

**Solution:**
Create `.env.production`:
```env
VITE_API_URL=https://api.yourdomain.com
```

---

## Security Tips

### ❌ DO NOT
- Store API keys in environment variables exposed to client
- Commit `.env` files to repository
- Use environment variables for passwords
- Expose secrets in client-side code

### ✅ DO
- Use environment variables only for public configuration
- Store secrets in `.env.local` (add to `.gitignore`)
- Use backend API for sensitive operations
- Store sensitive tokens in secure cookies (httpOnly)

---

## Reference

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-modes.html)
- [Creating React App Docs](https://create-react-app.dev/docs/adding-custom-environment-variables/)
