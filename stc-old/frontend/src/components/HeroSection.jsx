import React from "react";

export default function HeroSection({ userProfile }) {
  return (
    <main id="home-section">
      <section className="hero-shell fade">
        <div className="hero-grid">
          {/* LEFT HERO */}
          <div>
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              CSIR–CFTRI • Short Term Training (STC)
            </div>

            <h1 className="hero-title">
              CFTRI Certified Short Term Training Courses in Food Science &amp;
              Technology
            </h1>

            <p className="hero-subtitle">
              Structured training modules in food processing, safety and
              nutrition for students, faculty, industry and entrepreneurs.
            </p>

            <div className="hero-meta">
              <div>
                <span className="hero-meta-label">Training Session:</span>{" "}
                February – July 2025
              </div>
              <div className="hero-meta-line">
                Mode: Online | Offline | Hybrid
              </div>
            </div>

            <div className="hero-actions">
              <button
                className="hero-btn-primary"
                onClick={() =>
                  document
                    .getElementById("courses-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                View Courses
              </button>

              <button
                className="hero-btn-outline"
                onClick={() =>
                  document
                    .getElementById("about-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                About CFTRI
              </button>
            </div>
          </div>

          {/* RIGHT HERO PANEL */}
          <div className="participant-panel">
            <div className="participant-title">
              Participants &amp; Eligibility
            </div>

            <div className="participant-tag-row">
              <div className="participant-tag">Students</div>
              <div className="participant-tag">Faculty</div>
              <div className="participant-tag">Industry</div>
              <div className="participant-tag">Entrepreneurs</div>
            </div>

            <div className="participant-text">
              Join high-impact professional training modules with certification,
              hands-on sessions and expert faculty.
            </div>

            {userProfile ? (
              <div className="participant-status">
                <span className="participant-status-dot"></span>
                Logged in as <b>{userProfile.name}</b>
              </div>
            ) : (
              <div className="participant-login-hint">
                Please sign in to apply for trainings.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
