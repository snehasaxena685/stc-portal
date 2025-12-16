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

/* ================= PROFILE ================= */

export async function getProfile() {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  const res = await fetch(`${API_BASE}/auth/me`, {
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

/* ================= APPLICATIONS ================= */

export async function submitApplicationAPI(payload) {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  const res = await fetch(`${API_BASE}/applications/submit`, {
    method: "POST",
    body: formData, // ✅ multipart/form-data handled automatically
  });

  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}
/* ================= AVATAR UPLOAD ================= */

export async function uploadAvatarAPI(avatar) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  const res = await fetch(`${API_BASE}/users/upload-avatar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ avatar }), // base64 string
  });

  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}
