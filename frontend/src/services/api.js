const API_BASE = "http://localhost:5000/api";

/* ================= AUTH ================= */

export async function loginUser(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

export async function registerUser(payload) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

/* ================= APPLICATIONS ================= */

export async function submitApplicationAPI(payload) {
  const res = await fetch(`${API_BASE}/applications/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}
export async function getProfile() {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("No token");

  const res = await fetch("http://localhost:5000/api/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    localStorage.removeItem("token");
    throw new Error(data.msg || "Session expired");
  }

  return data;
}
