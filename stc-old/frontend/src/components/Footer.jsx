import React from "react";

export default function Footer() {
  return (
    <footer className="footer-main">
      © {new Date().getFullYear()} CSIR–CFTRI · STC Portal
      <br />
      Developed by ITS&CS, CSIR–CFTRI
    </footer>
  );
}
