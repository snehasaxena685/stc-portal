import React from "react";

<<<<<<< HEAD
export default function Navbar({
  userProfile,
  navOpen,
  setNavOpen,
  openLogin,
  handleLogout,
}) {
  return (
    <header className="navbar-stc">
      <div className="navbar-inner">
        {/* LEFT */}
        <div className="navbar-left">
          <img src="/images/logo1.jpg" className="navbar-logo" alt="logo" />
          <div className="navbar-titles">
            <div className="navbar-title-top">
              CSIR – Central Food Technological Research Institute, Mysuru
            </div>
            <div className="navbar-title-main">
              Short Term Training Courses Portal
=======
export default function Navbar({ user, onLoginOpen, onLogout }) {
  return (
    <nav className="bg-white border-b sticky top-0 z-50 shadow">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* LOGO + TITLE */}
        <div className="flex items-center gap-4">
          <img src="/images/logo1.jpeg" alt="CFTRI Logo"
            className="w-14 bg-white p-1 rounded shadow" />
          <div>
            <div className="text-xs opacity-90 text-[var(--g1)]">CSIR – CFTRI</div>
            <div className="text-lg font-bold text-[var(--g1)] leading-tight">
              Short Term Courses Portal
>>>>>>> 4df6b5b47b79db96905c7a85efb35dfface4fa34
            </div>
          </div>
        </div>

<<<<<<< HEAD
        {/* MOBILE TOGGLE */}
        <button
          className="navbar-burger"
          onClick={() => setNavOpen(!navOpen)}
        >
          ☰
        </button>

        {/* LINKS */}
        <nav className={`navbar-links ${navOpen ? "open" : ""}`}>
          <span
            className="navbar-link"
            onClick={() =>
              document.getElementById("home-section")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            Home
          </span>

          <span
            className="navbar-link"
            onClick={() =>
              document.getElementById("about-section")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            About
          </span>

          <span
            className="navbar-link"
            onClick={() =>
              document.getElementById("courses-section")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            Courses
          </span>

          <span
            className="navbar-link"
            onClick={() =>
              document.getElementById("schedule-section")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            Schedule
          </span>

          {/* RIGHT */}
          <div className="navbar-right">
            {userProfile && (
              <div className="navbar-hello">
                Hello, <strong>{userProfile.name}</strong>
              </div>
            )}

            {!userProfile ? (
              <button className="navbar-cta" onClick={openLogin}>
                Sign In / Register
              </button>
            ) : (
              <button className="navbar-cta" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
=======
        {/* MENU */}
        <ul className="hidden md:flex gap-6 text-[var(--g1)] font-medium">
          <li><a href="#home" className="hover:text-[var(--g2)]">Home</a></li>
          <li><a href="#about" className="hover:text-[var(--g2)]">About</a></li>
          <li><a href="#courses" className="hover:text-[var(--g2)]">Courses</a></li>
          <li><a href="#auth" className="hover:text-[var(--g2)]">Login</a></li>
        </ul>

        {/* RIGHT SIDE ACTIONS */}
        <div>
          {!user && (
            <button
              onClick={onLoginOpen}
              className="px-4 py-2 rounded bg-[var(--g1)] text-white text-sm shadow hover:bg-[var(--g3)]"
            >
              Login / Register
            </button>
          )}

          {user && (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-[var(--g1)] font-medium">
                Welcome, <b>{user.name}</b>
              </span>

              <button
                onClick={onLogout}
                className="px-4 py-2 rounded bg-[var(--g2)] text-white text-sm shadow hover:bg-[var(--g1)]"
              >
                Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </nav>
>>>>>>> 4df6b5b47b79db96905c7a85efb35dfface4fa34
  );
}
