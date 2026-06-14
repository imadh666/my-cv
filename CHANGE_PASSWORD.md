# How to Change Your Admin Password

## Step 1 — Generate a new SHA-256 hash

Open this link and type your new password to get its hash:
https://emn178.github.io/online-tools/sha256.html

OR run this in your browser console (F12 → Console):
```js
async function hash(p) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(p));
  return [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,'0')).join('');
}
hash('YourNewPassword').then(console.log);
```

## Step 2 — Replace the hash in auth.js

Open `netlify/functions/auth.js` and replace the value of `PASSWORD_HASH`:

```js
const PASSWORD_HASH = "PASTE_YOUR_NEW_HASH_HERE";
```

## Step 3 — Deploy

Push to GitHub. Netlify will auto-redeploy in ~30 seconds.

---
## Also change TOKEN_SECRET

While you're in auth.js, change this line to any long random string:
```js
const TOKEN_SECRET = "change-this-to-something-only-you-know-abc123xyz";
```
