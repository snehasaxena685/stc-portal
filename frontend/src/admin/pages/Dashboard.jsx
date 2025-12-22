import React from "react";
import "../admin.css";

export default function Dashboard() {
  const stats = [
    { title: "Total Applications", value: 128, color: "blue", icon: "📄" },
    { title: "Approved", value: 64, color: "green", icon: "✅" },
    { title: "Pending", value: 42, color: "orange", icon: "⏳" },
    { title: "Payments Received", value: 22, color: "sky", icon: "💳" },
  ];

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-title">STC Admin Panel</div>
        <nav>
          <a className="active">Dashboard</a>
          <a>Applications</a>
          <a>Payments</a>
          <a>Courses</a>
          <a>Participants</a>
          <a>Create Login Accounts</a>
          <a>Reports</a>
          <a className="logout">Logout</a>
        </nav>
      </aside>

      {/* MAIN */}
      <div className="main">
        {/* TOP BAR */}
        <header className="topbar">
          <h2>CFTRI – STC Applications Management System</h2>
          <div className="topbar-right">
            Welcome, <strong>admin</strong>
            <button>Logout</button>
          </div>
        </header>

        {/* CONTENT */}
        <div className="content">
          <h3>Dashboard Overview</h3>
          <p className="subtext">
            Monitor STC applications, approvals and payment status
          </p>

          <div className="stats-row">
            {stats.map((s) => (
              <div key={s.title} className={`stat-box ${s.color}`}>
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
