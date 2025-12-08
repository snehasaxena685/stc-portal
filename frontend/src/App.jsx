import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroCarousel from "./components/HeroCarousel";

export default function App() {
  // -----------------------------
  // LOGIN / REGISTER STATES
  // -----------------------------
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [nationality, setNationality] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // -----------------------------
  // USER SESSION STATES
  // -----------------------------
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  // -----------------------------
  // AUTO LOGIN ON REFRESH
  // -----------------------------
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const autoLogin = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.log("Auto login failed");
      }
    };

    autoLogin();
  }, []);

  // -----------------------------
  // LOGIN
  // -----------------------------
  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await res.json();
      alert(data.msg);

      if (data.token) {
        localStorage.setItem("token", data.token);

        const profile = await fetch("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${data.token}` },
        });

        const userData = await profile.json();
        setUser(userData);
        setIsLoggedIn(true);
        setActivePage("dashboard");
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  // -----------------------------
  // REGISTER
  // -----------------------------
  const handleRegister = async () => {
    if (regPassword !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          address,
          phone,
          nationality,
          email: regEmail,
          password: regPassword,
        }),
      });

      const data = await res.json();
      alert(data.msg || "Failed to register");

      if (res.ok) {
        setFullName("");
        setAddress("");
        setPhone("");
        setNationality("");
        setRegEmail("");
        setRegPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      alert("Something went wrong");
    }
  };

  // -----------------------------
  // LOGOUT
  // -----------------------------
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    setActivePage("dashboard");
    alert("Logged out");
  };

  // -----------------------------
  // SIDEBAR (GOVT STYLE)
  // -----------------------------
  const Sidebar = () => (
    <aside className="gov-sidebar">
      <div className="gov-sidebar-header">
        <span className="gov-sidebar-icon">📘</span>
        <div>
          <p className="gov-sidebar-title">Student Menu</p>
          <p className="gov-sidebar-sub">CFTRI STC Portal</p>
        </div>
      </div>

      <nav className="gov-sidebar-nav">
        {["dashboard", "profile", "courses"].map((item) => (
          <button
            key={item}
            onClick={() => setActivePage(item)}
            className={`gov-nav-btn ${
              activePage === item ? "gov-nav-btn-active" : ""
            }`}
          >
            <span className="gov-nav-dot" />
            {item === "dashboard" && "Dashboard Overview"}
            {item === "profile" && "My Profile"}
            {item === "courses" && "Available Courses"}
          </button>
        ))}
      </nav>

      <div className="gov-sidebar-footer">
        <p className="gov-role-pill">
          <span className="dot-online" />
          Role: {user?.role || "Student"}
        </p>

        <button onClick={handleLogout} className="gov-logout-btn">
          Logout
        </button>
      </div>
    </aside>
  );

  // -----------------------------
  // DASHBOARD CONTENT
  // -----------------------------
  const DashboardHome = () => (
    <div className="card gov-card gov-card-animate">
      <div className="gov-card-header">
        <div>
          <p className="gov-card-eyebrow">Dashboard</p>
          <h2 className="gov-card-title">Welcome back, {user?.name} 👋</h2>
          <p className="gov-card-sub">
            View your short term courses, applications and profile at a glance.
          </p>
        </div>
        <div className="gov-badge-chip">Academic Year 2025–26</div>
      </div>

      <div className="gov-metrics-grid">
        <div className="gov-metric-card metric-green">
          <p className="metric-label">Total Courses Open</p>
          <p className="metric-value">03</p>
          <p className="metric-foot">Upcoming batches available</p>
        </div>

        <div className="gov-metric-card metric-amber">
          <p className="metric-label">Applications Submitted</p>
          <p className="metric-value">0</p>
          <p className="metric-foot">You have not applied yet</p>
        </div>

        <div className="gov-metric-card metric-blue">
          <p className="metric-label">Profile Status</p>
          <p className="metric-value-small">Basic Details Saved</p>
          <p className="metric-foot">You can update details anytime</p>
        </div>
      </div>
    </div>
  );

  const ProfileSection = () => (
    <div className="card gov-card gov-card-animate">
      <h2 className="gov-section-title">My Profile</h2>
      <p className="gov-section-sub">
        Please ensure your contact details are correct before applying to any
        course.
      </p>

      <div className="gov-profile-grid">
        <div>
          <label className="gov-label">Full Name</label>
          <p className="gov-value">{user?.name}</p>
        </div>
        <div>
          <label className="gov-label">Email</label>
          <p className="gov-value">{user?.email}</p>
        </div>
        <div>
          <label className="gov-label">Contact Number</label>
          <p className="gov-value">{user?.phone || "--"}</p>
        </div>
        <div>
          <label className="gov-label">Nationality</label>
          <p className="gov-value">{user?.nationality || "--"}</p>
        </div>
        <div className="gov-profile-address">
          <label className="gov-label">Address</label>
          <p className="gov-value">{user?.address || "--"}</p>
        </div>
      </div>
    </div>
  );

  const CoursesSection = () => (
    <div className="card gov-card gov-card-animate">
      <h2 className="gov-section-title">Available Short Term Courses</h2>
      <p className="gov-section-sub">
        These are sample courses for UI. Later you can bind them from MongoDB.
      </p>

      <div className="gov-course-grid">
        {[
          {
            code: "STC-101",
            name: "Food Processing & Preservation",
            duration: "2 Weeks",
            fee: "₹12,500",
            level: "Beginner",
          },
          {
            code: "STC-214",
            name: "Chocolate Technology",
            duration: "1 Week",
            fee: "₹8,000",
            level: "Intermediate",
          },
          {
            code: "STC-330",
            name: "Dairy Processing",
            duration: "1 Week",
            fee: "₹9,000",
            level: "Beginner",
          },
        ].map((c, i) => (
          <div key={i} className="gov-course-card">
            <div className="gov-course-header">
              <span className="gov-course-code">{c.code}</span>
              <span className="gov-course-level">{c.level}</span>
            </div>
            <h3 className="gov-course-title">{c.name}</h3>
            <p className="gov-course-meta">Duration: {c.duration}</p>
            <p className="gov-course-meta">Fee: {c.fee}</p>
            <button className="gov-course-btn">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );

  // -----------------------------
  // FLOATING GLASS CONTACT BAR
  // -----------------------------
  const FloatingContactBar = () => (
    <div className="floating-contact-bar">
      <a
        href="#"
        className="contact-pill"
        aria-label="Facebook"
        title="Facebook"
      >
        <span className="contact-pill-icon">f</span>
      </a>
      <a href="#" className="contact-pill" aria-label="Twitter / X" title="X">
        <span className="contact-pill-icon">𝕏</span>
      </a>
      <a
        href="#"
        className="contact-pill"
        aria-label="YouTube"
        title="YouTube"
      >
        <span className="contact-pill-icon">▶</span>
      </a>
      <a
        href="tel:+910000000000"
        className="contact-pill"
        aria-label="Phone"
        title="Helpline"
      >
        <span className="contact-pill-icon">📞</span>
      </a>
      <a
        href="mailto:stc@cftri.res.in"
        className="contact-pill"
        aria-label="Email"
        title="Email"
      >
        <span className="contact-pill-icon">✉</span>
      </a>
      <a
        href="#contact"
        className="contact-pill contact-pill-wide"
        aria-label="Contact us"
        title="Contact / Support"
      >
        <span className="contact-pill-icon">💬</span>
        <span className="contact-pill-label">Contact</span>
      </a>
    </div>
  );

  // -----------------------------
  // MAIN UI
  // -----------------------------
  return (
    <div style={{ background: "#f4f7fb", minHeight: "100vh" }}>
      <Navbar />

      {/* HERO */}
      <section id="home">
        <HeroCarousel height="340px" />
      </section>

      {/* WELCOME BANNER (AFTER LOGIN) */}
      {isLoggedIn && user && (
        <section className="page-container mt-6">
          <div className="gov-welcome-banner">
            <div>
              <p className="gov-banner-eyebrow">
                CSIR – CFTRI Short Term Courses
              </p>
              <h2 className="gov-banner-title">
                Welcome, {user.name.toLowerCase()}! 🌿
              </h2>
              <p className="gov-banner-sub">
                You are successfully logged in to the CFTRI Short Term Training
                Portal.
              </p>
            </div>
            <div className="gov-banner-badge">
              Logged in as <span>{user.role || "Student"}</span>
            </div>
          </div>
        </section>
      )}

      {/* DASHBOARD AREA */}
      {isLoggedIn && user && (
        <section className="page-container mt-4 gov-dashboard-layout">
          <Sidebar />
          <div className="gov-dashboard-main">
            {activePage === "dashboard" && <DashboardHome />}
            {activePage === "profile" && <ProfileSection />}
            {activePage === "courses" && <CoursesSection />}
          </div>
        </section>
      )}

      {/* LOGIN + REGISTER (WHEN NOT LOGGED IN) */}
      {!isLoggedIn && (
        <section className="page-container py-10">
          <div className="gov-auth-wrapper">
            {/* LEFT PANEL: LOGIN */}
            <div className="gov-auth-card animate-slide-left">
              <div className="gov-auth-header gov-auth-header-login">
                <p className="gov-auth-eyebrow">Existing Participant</p>
                <h3 className="gov-auth-title">Login to Portal</h3>
                <p className="gov-auth-sub">
                  Use your registered email ID and password to continue.
                </p>
              </div>

              <div className="gov-auth-body">
                <label className="gov-label">Email</label>
                <input
                  className="input-box mb-3"
                  placeholder="you@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />

                <label className="gov-label">Password</label>
                <input
                  className="input-box mb-4"
                  placeholder="Enter password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />

                <button className="btn-green w-full py-2" onClick={handleLogin}>
                  Login
                </button>
              </div>
            </div>

            {/* RIGHT PANEL: REGISTER */}
            <div className="gov-auth-card animate-slide-right">
              <div className="gov-auth-header gov-auth-header-register">
                <p className="gov-auth-eyebrow">New Applicant</p>
                <h3 className="gov-auth-title">Create Student Account</h3>
                <p className="gov-auth-sub">
                  Register once to apply for all future Short Term Courses.
                </p>
              </div>

              <div className="gov-auth-body">
                <label className="gov-label">Full Name</label>
                <input
                  className="input-box mb-2"
                  placeholder="Enter full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />

                <label className="gov-label">Full Address</label>
                <input
                  className="input-box mb-2"
                  placeholder="Communication address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />

                <div className="grid md:grid-cols-2 gap-3 mb-2">
                  <div>
                    <label className="gov-label">Contact Number</label>
                    <input
                      className="input-box"
                      placeholder="Mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="gov-label">Nationality</label>
                    <select
                      className="input-box"
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Indian">Indian</option>
                      <option value="Foreign National">Foreign National</option>
                    </select>
                  </div>
                </div>

                <label className="gov-label">Email</label>
                <input
                  className="input-box mb-2"
                  placeholder="Official email ID"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />

                <div className="grid md:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="gov-label">Password</label>
                    <input
                      className="input-box"
                      placeholder="Create password"
                      type="password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="gov-label">Confirm Password</label>
                    <input
                      className="input-box"
                      placeholder="Re-enter password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  className="btn-green w-full py-2"
                  onClick={handleRegister}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />

      {/* FLOATING GLASS CONTACT BAR (ALWAYS VISIBLE) */}
      <FloatingContactBar />
    </div>
  );
}
