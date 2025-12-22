const API = "http://localhost:5000/api/admin";

const auth = () => ({
  Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
});

export const adminLogin = async (email, password) => {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

export const getApplications = async () => {
  const res = await fetch(`${API}/applications`, { headers: auth() });
  return res.json();
};

export const getStats = async () => {
  const res = await fetch(`${API}/stats`, { headers: auth() });
  return res.json();
};
