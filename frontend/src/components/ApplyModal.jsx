import React from "react";

export default function ApplyModal({
  applyOpen,
  selectedCourse,
  applyForm,
  updateApplyForm,
  submitApplication,
  setApplyOpen,
}) {
  if (!applyOpen) return null;

  return (
    <div className="apply-bg">
      <div className="apply-box">
        <h3 className="text-lg font-semibold text-green-900">
          Apply for {selectedCourse?.title}
        </h3>

        <p className="text-sm text-gray-700 mt-2">
          Please fill the details below to submit your application.
        </p>

        {/* FORM */}
        <div className="mt-3">
          <div className="mb-2">
            <div className="label-sm">Full Name *</div>
            <input
              className="input-field"
              value={applyForm.fullName}
              onChange={(e) =>
                updateApplyForm("fullName", e.target.value)
              }
            />
          </div>

          <div className="mb-2">
            <div className="label-sm">Email *</div>
            <input
              className="input-field"
              value={applyForm.email}
              onChange={(e) =>
                updateApplyForm("email", e.target.value)
              }
            />
          </div>

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

          <div className="grid-two">
            <div className="mb-2">
              <div className="label-sm">Country *</div>
              <input
                className="input-field"
                value={applyForm.country}
                onChange={(e) =>
                  updateApplyForm("country", e.target.value)
                }
              />
            </div>

            <div className="mb-2">
              <div className="label-sm">State *</div>
              <input
                className="input-field"
                value={applyForm.state}
                onChange={(e) =>
                  updateApplyForm("state", e.target.value)
                }
              />
            </div>
          </div>

          <div className="mb-2">
            <div className="label-sm">Organisation *</div>
            <input
              className="input-field"
              value={applyForm.organisation}
              onChange={(e) =>
                updateApplyForm("organisation", e.target.value)
              }
            />
          </div>

          <div className="mb-2">
            <div className="label-sm">Category *</div>
            <select
              className="input-field"
              value={applyForm.category}
              onChange={(e) =>
                updateApplyForm("category", e.target.value)
              }
            >
              <option value="">Select</option>
              <option value="Student">Student</option>
              <option value="Faculty">Faculty</option>
              <option value="Industry Professional">
                Industry Professional
              </option>
              <option value="Entrepreneur">Entrepreneur</option>
            </select>
          </div>

          <div className="mb-2">
            <div className="label-sm">Phone *</div>
            <input
              className="input-field"
              value={applyForm.phone}
              onChange={(e) =>
                updateApplyForm("phone", e.target.value)
              }
            />
          </div>

          <div className="mb-2">
            <div className="label-sm">Comments</div>
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
          style={{
            marginTop: "10px",
            width: "100%",
            padding: "9px",
            borderRadius: "12px",
            border: "1px solid #d1d5db",
            background: "#f8fafb",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
