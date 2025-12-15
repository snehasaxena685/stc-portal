import React from "react";

export default function ContactPanel({ contactOpen, setContactOpen }) {
  return (
    <div className={`contact-panel ${contactOpen ? "open" : ""}`}>
      <button
        className="contact-toggle"
        onClick={() => setContactOpen(!contactOpen)}
        title="Contact Us"
      >
        📞✉
      </button>

      <div className="contact-panel-inner">
        <div className="contact-title">Contact Us</div>

        <div className="contact-item">
          📞 <a href="tel:08212514310">0821-2514310</a>
        </div>

        <div className="contact-item">
          ✉ <a href="mailto:stc@cftri.res.in">stc@cftri.res.in</a>
        </div>

        <div className="contact-title" style={{ marginTop: 10 }}>
          Get in Touch
        </div>

        {/* Optional buttons (kept commented as before) */}
        {/*
        <div className="contact-actions">
          <a
            className="contact-btn whatsapp"
            href="https://wa.me/918212514310"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>

          <a className="contact-btn" href="mailto:stc@cftri.res.in">
            Contact Us
          </a>
        </div>
        */}
      </div>
    </div>
  );
}
