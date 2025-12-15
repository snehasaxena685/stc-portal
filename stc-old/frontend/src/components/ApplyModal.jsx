import React from "react";

<<<<<<< HEAD
/* Basic lists (keep light, govt-safe) */
const COUNTRIES = ["India", "Nepal", "Bhutan", "Bangladesh", "Sri Lanka", "Other"];

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Gujarat",
  "Karnataka",
  "Kerala",
  "Maharashtra",
  "Odisha",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal",
];

export default function ApplyModal({
  applyOpen,
  selectedCourse,
  applyForm,
  updateApplyForm,
  submitApplication,
  setApplyOpen,
}) {
  if (!applyOpen) return null;

  const isSCST = applyForm.category === "SC" || applyForm.category === "ST";
  const isIndia = applyForm.country === "India";

  return (
    <div className="apply-bg">
      <div className="apply-box">
        <h3 className="text-lg font-semibold text-green-900">
          Apply for {selectedCourse?.title}
        </h3>

        <p className="text-sm text-gray-700 mt-2">
          Fields marked with <b>*</b> are mandatory.
        </p>

        {/* FORM */}
        <div className="mt-3">
          {/* NAME */}
          <div className="mb-2">
            <div className="label-sm">Full Name *</div>
            <input
              className="input-field"
              value={applyForm.fullName}
              readOnly
            />
          </div>

          {/* EMAIL */}
          <div className="mb-2">
            <div className="label-sm">Email *</div>
            <input
              className="input-field"
              value={applyForm.email}
              readOnly
            />
          </div>

          {/* PHONE */}
          <div className="mb-2">
            <div className="label-sm">Mobile Number *</div>
            <input
              className="input-field"
              value={applyForm.phone}
              readOnly
            />
          </div>

          {/* DEGREE */}
          <div className="mb-2">
            <div className="label-sm">Degree / Qualification *</div>
            <input
              className="input-field"
              value={applyForm.degree}
              onChange={(e) =>
                updateApplyForm("degree", e.target.value)
              }
            />
          </div>

          {/* COUNTRY + STATE */}
          <div className="grid-two">
            <div className="mb-2">
              <div className="label-sm">Country *</div>
              <select
                className="input-field"
                value={applyForm.country}
                onChange={(e) =>
                  updateApplyForm("country", e.target.value)
                }
              >
                <option value="">Select Country</option>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="mb-2">
              <div className="label-sm">State *</div>
              {isIndia ? (
                <select
                  className="input-field"
                  value={applyForm.state}
                  onChange={(e) =>
                    updateApplyForm("state", e.target.value)
                  }
                >
                  <option value="">Select State</option>
                  {INDIAN_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              ) : (
                <input
                  className="input-field"
                  value={applyForm.state}
                  onChange={(e) =>
                    updateApplyForm("state", e.target.value)
                  }
                />
              )}
            </div>
          </div>

          {/* ORGANISATION */}
          <div className="mb-2">
            <div className="label-sm">Organisation / Institution *</div>
            <input
              className="input-field"
              value={applyForm.organisation}
              onChange={(e) =>
                updateApplyForm("organisation", e.target.value)
              }
            />
          </div>

          {/* CATEGORY */}
          <div className="mb-2">
            <div className="label-sm">Category *</div>
            <select
              className="input-field"
              value={applyForm.category}
              onChange={(e) =>
                updateApplyForm("category", e.target.value)
              }
            >
              <option value="">Select Category</option>
              <option value="GEN">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
            </select>
          </div>

          {/* CASTE CERTIFICATE */}
          {isSCST && (
            <div className="mb-2">
              <div className="label-sm">
                Caste Certificate (Latest) *
              </div>
              <input
                type="file"
                className="input-field"
                accept=".pdf,.jpg,.png"
                onChange={(e) =>
                  updateApplyForm("casteCertificate", e.target.files[0])
                }
              />
            </div>
          )}

          {/* ID PROOF */}
          <div className="mb-2">
            <div className="label-sm">ID Proof *</div>
            <select
              className="input-field"
              value={applyForm.idProofType}
              onChange={(e) =>
                updateApplyForm("idProofType", e.target.value)
              }
            >
              <option value="">Select ID Proof</option>
              <option value="Aadhaar">Aadhaar</option>
              <option value="PAN">PAN</option>
              <option value="Voter ID">Voter ID</option>
            </select>
          </div>

          {applyForm.idProofType && (
            <div className="mb-2">
              <div className="label-sm">
                {applyForm.idProofType} Number *
              </div>
              <input
                className="input-field"
                value={applyForm.idProofNumber}
                onChange={(e) =>
                  updateApplyForm("idProofNumber", e.target.value)
                }
              />
            </div>
          )}

          {/* NOTES */}
          <div className="mb-2">
            <div className="label-sm">Comments (Optional)</div>
            <textarea
              className="input-field"
              rows="3"
              value={applyForm.notes}
              onChange={(e) =>
                updateApplyForm("notes", e.target.value)
              }
            />
          </div>
        </div>

        <button className="btn-apply mt-2" onClick={submitApplication}>
          Submit Application
        </button>

        <button
          onClick={() => setApplyOpen(false)}
          className="btn-secondary"
=======
export default function ApplyModal({ isOpen, course, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="apply-modal-bg" style={{ display: "flex" }}>
      <div className="apply-modal">
        <h3 className="text-lg font-bold text-[var(--g1)] mb-3">
          Confirm Application
        </h3>

        <div className="bg-green-50 border border-green-300 p-3 rounded mb-4">
          Applying for: <b>{course?.title}</b>
        </div>

        <button
          onClick={onConfirm}
          className="w-full py-2 bg-[var(--g2)] text-white rounded font-semibold"
        >
          Confirm Apply
        </button>

        <button
          onClick={onClose}
          className="w-full py-2 mt-2 bg-gray-200 rounded font-semibold"
>>>>>>> 4df6b5b47b79db96905c7a85efb35dfface4fa34
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
