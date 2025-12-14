import React, { useEffect } from "react";

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-screen">
      <div className="splash-inner">
        <div className="splash-logo-wrap">
          <img
            src="/images/logo1.jpg"
            alt="CFTRI Logo"
            className="splash-logo"
          />
        </div>

        <div className="splash-title">CSIR – CFTRI</div>
        <div className="splash-sub">
          Short Term Training Courses Portal
        </div>
      </div>
    </div>
  );
}
