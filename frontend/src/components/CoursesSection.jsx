import React from "react";

export default function CoursesSection({
  courses,
  userProfile,
  handleApplyClick,
  getApplyButtonLabel,
}) {
  return (
    <section id="courses-section" className="section-shell fade">
      <h2 className="section-heading">Available Courses</h2>
      <p className="section-subtitle">
        Explore CFTRI’s certified short-term training programs.
      </p>

      <div className="course-grid">
        {courses.map((c, i) => (
          <div key={i} className="course-card-shell">
            <div className="course-card">
              <div className="course-media">
                <img src={c.image} alt={c.title} className="course-img" />
                <div className="course-overlay">
                  <div className="course-overlay-title">{c.title}</div>
                  <div className="course-overlay-text">
                    {c.description}
                  </div>
                </div>
              </div>

              <div className="course-content">
                <div className="course-title">{c.title}</div>
                <div className="course-meta">
                  Duration: {c.duration} • Fee: {c.fee}
                </div>

                <button
                  className="btn-apply"
                  onClick={() => handleApplyClick(c)}
                >
                  {getApplyButtonLabel()}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
