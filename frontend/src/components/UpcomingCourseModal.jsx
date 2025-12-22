import React from "react";

export default function UpcomingCourseModal({
  open,
  onClose,
  course,
  userProfile,
  onApply,
  openLogin,
}) {
  if (!open || !course) return null;

  return (
    <div className="schedule-backdrop">
      <div className="schedule-modal" style={{ maxWidth: 540 }}>
        {/* HEADER */}
        <div className="schedule-modal-header">
          <h3>{course.title}</h3>
          <button onClick={onClose}>✕</button>
        </div>

        {/* COURSE IMAGE */}
        <img
          src={course.image || "/images/courses/default.jpg"}
          alt={course.title}
          style={{
            width: "100%",
            height: 220,
            objectFit: "cover",
            borderRadius: 12,
            marginBottom: 14,
          }}
        />

        {/* DETAILS */}
        <p><b>Course Code:</b> {course.code}</p>
        <p><b>Centre:</b> {course.centre}</p>
        <p><b>Duration:</b> {course.duration}</p>
        <p><b>Dates:</b> {course.dates}</p>

        {/* ACTION */}
        <div style={{ marginTop: 18, textAlign: "center" }}>
          {userProfile ? (
            <button
              className="navbar-cta"
              onClick={() => onApply(course)}
            >
              Apply Now
            </button>
          ) : (
            <button
              className="navbar-cta"
              onClick={openLogin}
            >
              Login / Register to Apply
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
