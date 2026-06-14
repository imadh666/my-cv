const crypto = require("crypto");

// ============================================================
// CHANGE YOUR PASSWORD HASH HERE
// To generate a new hash, run in Node.js:
//   require('crypto').createHash('sha256').update('YourNewPassword').digest('hex')
// Current password: Dr@Academic2024!
// ============================================================
const PASSWORD_HASH = "92fd7bace7a809d10d922fad764a08f288e50573598881a9c506e2039bcf47e8";

// Token secret — change this to any long random string
const TOKEN_SECRET = "xK9#mP2$vL5@nQ8&wR3!jH6*tF1^";

// Rate limiting store (resets on function cold start)
const attempts = {};
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function generateToken(payload) {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", TOKEN_SECRET)
    .update(`${header}.${body}`)
    .digest("base64url");
  return `${header}.${body}.${signature}`;
}

function verifyToken(token) {
  try {
    const [header, body, signature] = token.split(".");
    const expectedSig = crypto
      .createHmac("sha256", TOKEN_SECRET)
      .update(`${header}.${body}`)
      .digest("base64url");
    if (signature !== expectedSig) return null;
    const payload = JSON.parse(Buffer.from(body, "base64url").toString());
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  const ip = event.headers["x-forwarded-for"] || "unknown";
  const now = Date.now();

  // ---- LOGIN ----
  if (event.httpMethod === "POST") {
    // Rate limiting
    if (!attempts[ip]) attempts[ip] = { count: 0, first: now };
    if (now - attempts[ip].first > WINDOW_MS) attempts[ip] = { count: 0, first: now };
    attempts[ip].count++;

    if (attempts[ip].count > MAX_ATTEMPTS) {
      const wait = Math.ceil((WINDOW_MS - (now - attempts[ip].first)) / 60000);
      return {
        statusCode: 429,
        headers,
        body: JSON.stringify({ error: `Too many attempts. Try again in ${wait} minutes.` }),
      };
    }

    let body;
    try { body = JSON.parse(event.body); } catch {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid request" }) };
    }

    const { password } = body;
    if (!password) return { statusCode: 400, headers, body: JSON.stringify({ error: "Password required" }) };

    const hash = crypto.createHash("sha256").update(password).digest("hex");

    if (hash !== PASSWORD_HASH) {
      const remaining = MAX_ATTEMPTS - attempts[ip].count;
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: "Incorrect password", remaining: Math.max(0, remaining) }),
      };
    }

    // Success — reset attempts
    delete attempts[ip];

    const token = generateToken({
      role: "admin",
      iat: now,
      exp: now + 8 * 60 * 60 * 1000, // 8 hours
    });

    return { statusCode: 200, headers, body: JSON.stringify({ token }) };
  }

  // ---- VERIFY TOKEN ----
  if (event.httpMethod === "GET") {
    const authHeader = event.headers["authorization"] || "";
    const token = authHeader.replace("Bearer ", "");
    const payload = verifyToken(token);
    if (!payload) return { statusCode: 401, headers, body: JSON.stringify({ error: "Invalid or expired token" }) };
    return { statusCode: 200, headers, body: JSON.stringify({ valid: true, exp: payload.exp }) };
  }

  return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
};
