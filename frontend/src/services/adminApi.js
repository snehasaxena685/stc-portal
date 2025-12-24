const API_BASE = "http://localhost:5000/api";

export async function getDashboardStats() {
  const res = await fetch(`${API_BASE}/admin/dashboard/stats`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard stats");
  }

  return res.json();
}
