# Deploying MindSpa to Render

## Fix 404 on `/admin` and other routes

The app uses **React Router** (BrowserRouter). When someone opens `https://mindspa.onrender.com/admin` directly (or refreshes on that URL), Render looks for a file at `/admin` and returns **404** because only `index.html` and assets exist.

Fix this by adding a **rewrite** so all paths serve `index.html` and React Router can handle routes on the client.

### Steps on Render

1. Open the [Render Dashboard](https://dashboard.render.com/).
2. Select your **mindspa** static site (or web service).
3. Go to **Settings** (or **Redirects/Rewrites** in the left sidebar).
4. Under **Redirects/Rewrites**, click **Add Rule**.
5. Set:
   - **Source Path:** `/*`
   - **Destination Path:** `/index.html`
   - **Action:** **Rewrite** (not Redirect)
6. Save.

After the next deploy (or immediately, if no deploy is needed), these URLs will work:

- `https://mindspa.onrender.com/`
- `https://mindspa.onrender.com/admin`

### Why Rewrite and not Redirect?

- **Redirect** would change the URL (e.g. `/admin` → `/index.html`), so the user would see `/index.html` in the address bar.
- **Rewrite** keeps the URL as `/admin` but serves the content of `index.html`, so React Router can show the Admin page correctly.

### Build settings (for reference)

- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `build`
