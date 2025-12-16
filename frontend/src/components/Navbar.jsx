import React from "react";

export default function Navbar({
  userProfile,
  navOpen,
  setNavOpen,
  openLogin,
  openRegister,
  handleLogout,
  setScheduleOpen, // ✅ ADD THIS
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
            </div>
          </div>
        </div>

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
    onClick={() => {
      document.getElementById("home-section")?.scrollIntoView({
        behavior: "smooth",
      });
      setNavOpen(false);
    }}
  >
    Home
  </span>

  <span
    className="navbar-link"
    onClick={() => {
      document.getElementById("about-section")?.scrollIntoView({
        behavior: "smooth",
      });
      setNavOpen(false);
    }}
  >
    About
  </span>

  <span
    className="navbar-link"
    onClick={() => {
      document.getElementById("courses-section")?.scrollIntoView({
        behavior: "smooth",
      });
      setNavOpen(false);
    }}
  >
    Courses
  </span>

  {/* ✅ FIXED SCHEDULE BUTTON */}
  <span
    className="navbar-link"
    onClick={() => {
      setScheduleOpen(true);
      setNavOpen(false);
    }}
  >
    Schedule (2025–2026)
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
  );
}
