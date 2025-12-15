import React from "react";

export default function UpcomingTrainings({
  upcomingTrainings,
  fullSchedule,
  th,
  td,
  userProfile,
  openLogin,
  openRegister,
  openProfileEdit,
  handleAvatarChange,
  avatarFileName,
}) {
  return (
    <section className="section-shell fade" id="schedule-section">
      <div className="upcoming-strip">
        {/* LEFT SIDE */}
        <div>
          <div className="upcoming-pill">Upcoming Trainings</div>

          <div className="upcoming-list">
            <div className="ticker-wrapper">
              {[...upcomingTrainings, ...upcomingTrainings].map((t, i) => (
                <div key={i} className="upcoming-card show">
                  <div className="upcoming-title">{t.title}</div>
                  <div className="upcoming-meta">Starts: {t.dates}</div>
                  <div className="upcoming-chip">Mode: {t.mode}</div>
                </div>
              ))}
            </div>
          </div>

          {/* FULL SCHEDULE TABLE */}
          <div className="card-stc" style={{ marginTop: 20 }}>
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              Full Training Schedule – 2025
            </h3>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#e7f9ef", textAlign: "left" }}>
                    <th style={th}>Code</th>
                    <th style={th}>Course Title</th>
                    <th style={th}>Dates</th>
                    <th style={th}>Duration</th>
                    <th style={th}>Centre</th>
                  </tr>
                </thead>

                <tbody>
                  {fullSchedule.map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #e5f4ea" }}>
                      <td style={td}><strong>{row.code}</strong></td>
                      <td style={td}>{row.title}</td>
                      <td style={td}>{row.dates}</td>
                      <td style={td}>{row.duration}</td>
                      <td style={td}>{row.centre}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — PROFILE CARD */}
        <div className="profile-shell">
          <div className="profile-sticky">
            <div className="profile-card">
              {userProfile ? (
                <>
                  <div className="profile-avatar">
                    {userProfile.avatar ? (
                      <img src={userProfile.avatar} alt="avatar" />
                    ) : (
                      <div className="avatar-placeholder">👤</div>
                    )}
                  </div>

                  <div className="profile-name">{userProfile.name}</div>
                  <div className="profile-email">{userProfile.email}</div>

                  <div className="profile-actions">
                    <button
                      className="profile-btn profile-edit"
                      onClick={openProfileEdit}
                    >
                      Edit Profile
                    </button>

                    <label>
                      <input
                        type="file"
                        className="upload-input"
                        accept="image/*"
                        onChange={handleAvatarChange}
                      />
                      <button className="profile-btn profile-upload">
                        Upload Photo
                      </button>
                    </label>
                  </div>

                  {avatarFileName && (
                    <div className="upload-success">
                      ✔ {avatarFileName} ready
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="profile-name">Welcome!</div>
                  <p className="small-muted">
                    Sign in or register to apply for trainings.
                  </p>

                  <div className="profile-actions">
                    <button
                      className="profile-btn profile-edit"
                      onClick={openLogin}
                    >
                      Sign In
                    </button>
                    <button
                      className="profile-btn profile-upload"
                      onClick={openRegister}
                    >
                      Register
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
