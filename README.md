# Academic CV Portfolio — Deployment Guide

## Project Structure
```
cv_project/
├── public/
│   └── index.html          ← Your website
├── netlify/
│   └── functions/
│       └── auth.js         ← Secure server-side authentication
├── netlify.toml            ← Netlify configuration + security headers
├── CHANGE_PASSWORD.md      ← How to change your password
└── README.md               ← This file
```

---

## 🚀 Deploy to Netlify (Free — 5 minutes)

### Step 1 — Create GitHub account
Go to https://github.com and sign up.

### Step 2 — Create a new repository
1. Click the **+** button → **New repository**
2. Name it: `academic-cv`
3. Set it to **Public** (required for free Netlify)
4. Click **Create repository**

### Step 3 — Upload your files
1. Click **uploading an existing file**
2. Drag and drop the entire `cv_project` folder contents
3. Keep the folder structure exactly as shown above
4. Click **Commit changes**

### Step 4 — Deploy on Netlify
1. Go to https://netlify.com and sign up (use your GitHub account)
2. Click **Add new site** → **Import an existing project**
3. Choose **GitHub** → select your `academic-cv` repository
4. Settings:
   - **Publish directory:** `public`
   - **Functions directory:** `netlify/functions`
5. Click **Deploy site**

### Step 5 — Your site is live!
You'll get a URL like: `https://your-name-cv.netlify.app`

To use a custom domain (e.g. `drjohndoe.com`):
- Go to Netlify → **Domain settings** → **Add custom domain**

---

## 🔐 Security Features

| Feature | Details |
|---------|---------|
| Password storage | SHA-256 hash — never stored as plain text |
| Authentication | Server-side Netlify Function — password never reaches browser |
| Token | Signed JWT — expires after 8 hours |
| Rate limiting | 5 attempts per 15 minutes per IP |
| HTTPS | Automatic SSL certificate via Netlify |
| Security headers | X-Frame-Options, CSP, XSS Protection |

---

## 🔑 Default Password

**`Dr@Academic2024!`**

Change it immediately after deployment. See `CHANGE_PASSWORD.md`.

---

## ✏️ Local Testing

Install Netlify CLI:
```bash
npm install -g netlify-cli
cd cv_project
netlify dev
```
Then open http://localhost:8888

---

## 📞 Support

If you encounter any issues, the most common fixes are:
1. Make sure the folder structure matches exactly
2. Ensure `netlify.toml` is in the root of the uploaded folder
3. Check that `auth.js` is inside `netlify/functions/`
