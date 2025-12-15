import React from "react";

export default function AuthModal({
  authOpen,
  authMode,
  setAuthMode,
  setAuthOpen,
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
  fullName,
  setFullName,
  regEmail,
  setRegEmail,
  regPassword,
  setRegPassword,
  confirmPassword,
  setConfirmPassword,
  address,
  setAddress,
  phone,
  setPhone,
  nationality,
  setNationality,
  handleLogin,
  handleRegister,
}) {
  if (!authOpen) return null;

  return (
    <div className="auth-bg">
      <div className="auth-box">
        <div className="auth-left">
          <div>
            <div className="auth-tag">CSIR–CFTRI STC</div>
            <div className="auth-heading">
              {authMode === "login"
                ? "Participant Login"
                : "Create an Account"}
            </div>
            <p className="auth-left-sub">
              Access CFTRI's official training portal and manage applications.
            </p>
          </div>
        </div>

        <div className="auth-right">
          <button
            className="auth-close"
            onClick={() => setAuthOpen(false)}
          >
            ×
          </button>

          {/* LOGIN */}
          {authMode === "login" && (
            <>
              <h3 className="text-lg font-semibold mb-3">Login</h3>

              <div className="mb-3">
                <div className="label-sm">Email *</div>
                <input
                  className="input-field"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <div className="label-sm">Password *</div>
                <input
                  className="input-field"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>

              <button className="btn-apply mt-2" onClick={handleLogin}>
                Login
              </button>

              <div className="auth-switch">
                New user?{" "}
                <span
                  className="auth-link"
                  onClick={() => setAuthMode("register")}
                >
                  Register here
                </span>
              </div>
            </>
          )}

          {/* REGISTER */}
          {authMode === "register" && (
            <>
              <h3 className="text-lg font-semibold mb-3">
                Create Account
              </h3>

              <div className="grid-two mb-2">
                <div>
                  <div className="label-sm">Full Name *</div>
                  <input
                    className="input-field"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div>
                  <div className="label-sm">Email *</div>
                  <input
                    className="input-field"
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid-two mb-2">
                <div>
                  <div className="label-sm">Address *</div>
                  <input
                    className="input-field"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div>
                  <div className="label-sm">Phone *</div>
                  <input
                    className="input-field"
                    value={phone}
<<<<<<< HEAD
                    onChange={(e) => setPhone(e.target.value)} 
                  required/>
=======
                    onChange={(e) => setPhone(e.target.value)}
                  />
>>>>>>> 4df6b5b47b79db96905c7a85efb35dfface4fa34
                </div>
              </div>

              <div className="mb-2">
                <div className="label-sm">Nationality *</div>
                <input
                  className="input-field"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                />
              </div>

              <div className="grid-two mb-2">
                <div>
                  <div className="label-sm">Password *</div>
                  <input
                    className="input-field"
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                  />
                </div>

                <div>
                  <div className="label-sm">Confirm Password *</div>
                  <input
                    className="input-field"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                className="btn-apply mt-2"
                onClick={handleRegister}
              >
                Register
              </button>

              <div className="auth-switch">
                Already registered?{" "}
                <span
                  className="auth-link"
                  onClick={() => setAuthMode("login")}
                >
                  Sign in here
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
