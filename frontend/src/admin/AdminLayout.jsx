import { Outlet, Link, useNavigate } from "react-router-dom";
import "./admin.css";

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2>CFTRI Admin</h2>
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/applications">Applications</Link>
        <button onClick={logout}>Logout</button>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
