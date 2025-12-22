export default function UpcomingTrainings({
  upcomingTrainings,
  userProfile,
  openLogin,
  openRegister,
  openProfileEdit,
  handleAvatarChange,
  avatarFileName,
  openUpcomingModal,
}) {
  return (
    <section className="section-shell fade" id="upcoming-section">
      <div className="upcoming-strip">

        {/* LEFT SIDE */}
        <div className="upcoming-left">
          <div className="upcoming-pill">Upcoming Trainings</div>

          {/* VERTICAL NOTIFICATION SCROLLER */}
          <div className="notification-box">
            <div className="notification-ticker">
              {[...upcomingTrainings, ...upcomingTrainings].map((t, i) => (
                <div
                  key={i}
                  className={`notification-item ${
                    t.startingSoon ? "starting-soon" : ""
                  }`}
                  onClick={() => openUpcomingModal(t)}
                >
                  <div className="notification-title">{t.title}</div>
                  <div className="notification-meta">{t.dates}</div>

                  {t.startingSoon && (
                    <span className="soon-badge">Starting Soon</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* INFO BANNER */}
          <div className="application-info-banner">
            <span>ℹ️</span>
            <marquee behavior="scroll" direction="left">
              Applications open 3 months prior to course commencement and
              close 15 days before the start date.
            </marquee>
          </div>
        </div>

        {/* RIGHT SIDE — PROFILE */}
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
  