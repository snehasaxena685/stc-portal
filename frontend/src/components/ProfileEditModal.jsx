import React from "react";

export default function ProfileEditModal({
  profileEditOpen,
  setProfileEditOpen,
  tempProfile,
  setTempProfile,
  avatarUploadSuccess,
  handleAvatarChange,
  removeAvatar,
  saveProfileEdits,
}) {
  if (!profileEditOpen) return null;

  return (
    <div className="profile-edit-bg">
      <div className="profile-edit-box">
        {/* HEADER */}
        <div className="profile-edit-header">
          <h3>Edit Profile</h3>
          <button
            className="profile-edit-close"
            onClick={() => setProfileEditOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className="profile-edit-grid">
          {/* LEFT — AVATAR */}
          <div className="profile-edit-avatar">
            <div className="avatar-preview">
              {tempProfile.avatar ? (
                <img src={tempProfile.avatar} alt="preview" />
              ) : (
                <div className="avatar-placeholder">👤</div>
              )}
            </div>

            <div className="avatar-actions">
              <label>
                <input
                  type="file"
                  className="upload-input"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
                <button className="profile-btn profile-upload">
                  Choose Photo
                </button>
              </label>

              {tempProfile.avatar && (
                <button
                  className="profile-btn profile-edit"
                  onClick={removeAvatar}
                >
                  Remove
                </button>
              )}
            </div>

            {avatarUploadSuccess && (
              <div className="small-muted">
                Preview ready — save to keep.
              </div>
            )}
          </div>

          {/* RIGHT — FORM */}
          <div className="profile-edit-form">
            <div className="form-row">
              <div className="label-sm">Name *</div>
              <input
                className="input-field"
                value={tempProfile.name}
                onChange={(e) =>
                  setTempProfile((p) => ({ ...p, name: e.target.value }))
                }
              />
            </div>

            <div className="form-row">
              <div className="label-sm">Email *</div>
              <input
                className="input-field"
                value={tempProfile.email}
                onChange={(e) =>
                  setTempProfile((p) => ({ ...p, email: e.target.value }))
                }
              />
            </div>

            <div className="grid-two">
              <div className="form-row">
                <div className="label-sm">Phone</div>
                <input
                  className="input-field"
                  value={tempProfile.phone}
                  onChange={(e) =>
                    setTempProfile((p) => ({ ...p, phone: e.target.value }))
                  }
                />
              </div>

              <div className="form-row">
                <div className="label-sm">Nationality</div>
                <input
                  className="input-field"
                  value={tempProfile.nationality}
                  onChange={(e) =>
                    setTempProfile((p) => ({
                      ...p,
                      nationality: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="form-row">
              <div className="label-sm">Address</div>
              <input
                className="input-field"
                value={tempProfile.address}
                onChange={(e) =>
                  setTempProfile((p) => ({
                    ...p,
                    address: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="profile-edit-actions">
          <button className="btn-apply" onClick={saveProfileEdits}>
            Save Profile
          </button>
          <button
            className="btn-cancel"
            onClick={() => setProfileEditOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
