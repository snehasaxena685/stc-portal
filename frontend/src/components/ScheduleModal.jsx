import React, { useEffect } from "react";

export default function ScheduleModal({
  open,
  onClose,
  schedule,
  downloadPDF,
}) {

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="schedule-backdrop" onClick={onClose}>
      <div
        className="schedule-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="schedule-modal-header">
          <h3>Full Training Schedule (2025–2026)</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <button className="btn-download" onClick={downloadPDF}>
          ⬇ Download PDF
        </button>

        {/* DESKTOP TABLE */}
        <div className="desktop-only">
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Course</th>
                <th>Dates</th>
                <th>Duration</th>
                <th>Centre</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((s, i) => (
                <tr key={i}>
                  <td>{s.code}</td>
                  <td>{s.title}</td>
                  <td>{s.dates}</td>
                  <td>{s.duration}</td>
                  <td>{s.centre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS */}
        <div className="mobile-only">
          {schedule.map((s, i) => (
            <div key={i} className="schedule-card">
              <div className="card-top">
                <span>{s.code}</span>
                <span>{s.centre}</span>
              </div>
              <h4>{s.title}</h4>
              <p><b>Dates:</b> {s.dates}</p>
              <p><b>Duration:</b> {s.duration}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
