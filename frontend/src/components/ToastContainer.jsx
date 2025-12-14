import React from "react";

export default function ToastContainer({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`toast toast-${t.type}`}
        >
          <div className="toast-icon">
            {t.type === "success" && "✔"}
            {t.type === "error" && "⚠"}
            {t.type === "info" && "ℹ"}
            {t.type === "warning" && "⚠"}
          </div>

          <div>
            <div className="toast-title">
              {t.type.charAt(0).toUpperCase() + t.type.slice(1)}
            </div>
            <div className="toast-message">{t.msg}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
