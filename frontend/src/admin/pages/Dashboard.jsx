import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../admin.css";

const API_BASE = "http://localhost:5000/api";

export default function Dashboard() {
  const navigate = useNavigate();

  // 🔹 dynamic stats state
  const [stats, setStats] = useState({
    totalApplications: 0,
    approved: 0,
    pending: 0,
    paymentsReceived: 0,
  });

  // 🔹 fetch from backend
  const fetchStats = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/admin/dashboard/stats`,
        { credentials: "include" }
      );
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Dashboard stats error", err);
    }
  };

  // 🔹 load once (and on refresh)
  useEffect(() => {
    fetchStats();
  }, []);

  // 🔹 map for UI (same UI, dynamic values)
  const statBoxes = [
    {
      title: "Total Applications",
      value: stats.totalApplications,
      color: "blue",
      icon: "📄",
      link: "/admin/applications",
    },
    {
      title: "Approved",
      value: stats.approved,
      color: "green",
      icon: "✅",
      link: "/admin/applications?status=Approved",
    },
    {
      title: "Pending",
      value: stats.pending,
      color: "orange",
      icon: "⏳",
      link: "/admin/applications?status=Pending",
    },
    {
      title: "Payments Received",
      value: stats.paymentsReceived,
      color: "sky",
      icon: "💳",
      link: "/admin/payments",
    },
  ];

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-title">STC Admin Panel</div>
        <nav>
          <a className="active">Dashboard</a>
          <a onClick={() => navigate("/admin/applications")}>Applications</a>
          <a onClick={() => navigate("/admin/payments")}>Payments</a>
          <a>Courses</a>
          <a>Participants</a>
          <a>Create Login Accounts</a>
          <a>Reports</a>
          <a className="logout" onClick={() => navigate("/admin/login")}>
            Logout
          </a>
        </nav>
      </aside>

      {/* MAIN */}
      <div className="main">
        {/* TOP BAR */}
        <header className="topbar">
          <h2>CFTRI – STC Applications Management System</h2>
          <div className="topbar-right">
            Welcome, <strong>admin</strong>
            <button onClick={() => navigate("/admin/login")}>Logout</button>
          </div>
        </header>

        {/* CONTENT */}
        <div className="content">
          <h3>Dashboard Overview</h3>
          <p className="subtext">
            Monitor STC applications, approvals and payment status
          </p>

          <div className="stats-row">
            {statBoxes.map((s) => (
              <div
                key={s.title}
                className={`stat-box ${s.color}`}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(s.link)}
              >
                <div>
                  <p>{s.title}</p>
                  <h2>{s.value}</h2>
                </div>
                <span className="icon">{s.icon}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
