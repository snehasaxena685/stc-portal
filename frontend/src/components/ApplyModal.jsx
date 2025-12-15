<<<<<<< HEAD
import React, { useEffect } from "react";
=======
import React from "react";
>>>>>>> 4df6b5b47b79db96905c7a85efb35dfface4fa34

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
<<<<<<< HEAD

        {/* HEADER */}
        <div className="apply-header">
          <h3>
            Apply for{" "}
            <span className="text-green-800">
              {selectedCourse?.title}
            </span>
          </h3>
          <button
            className="apply-close"
            onClick={() => setApplyOpen(false)}
          >
            ×
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-3">
          Fields marked with <strong>*</strong> are mandatory.
        </p>

        {/* FORM (SCROLLABLE) */}
        <div className="apply-form-scroll">

          <div className="form-group">
            <label>Full Name *</label>
            <input
=======
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
>>>>>>> 4df6b5b47b79db96905c7a85efb35dfface4fa34
              value={applyForm.fullName}
              onChange={(e) =>
                updateApplyForm("fullName", e.target.value)
              }
            />
          </div>

<<<<<<< HEAD
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
=======
          <div className="mb-2">
            <div className="label-sm">Email *</div>
            <input
              className="input-field"
>>>>>>> 4df6b5b47b79db96905c7a85efb35dfface4fa34
              value={applyForm.email}
              onChange={(e) =>
                updateApplyForm("email", e.target.value)
              }
            />
          </div>

<<<<<<< HEAD
          <div className="form-group">
            <label>Mobile Number *</label>
            <input
              value={applyForm.phone}
              onChange={(e) =>
                updateApplyForm("phone", e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Degree / Qualification *</label>
            <input
=======
          <div className="mb-2">
            <div className="label-sm">Degree / Qualification *</div>
            <input
              className="input-field"
>>>>>>> 4df6b5b47b79db96905c7a85efb35dfface4fa34
              value={applyForm.degree}
              onChange={(e) =>
                updateApplyForm("degree", e.target.value)
              }
            />
          </div>

          <div className="grid-two">
<<<<<<< HEAD
            <div className="form-group">
              <label>Country *</label>
              <input
=======
            <div className="mb-2">
              <div className="label-sm">Country *</div>
              <input
                className="input-field"
>>>>>>> 4df6b5b47b79db96905c7a85efb35dfface4fa34
                value={applyForm.country}
                onChange={(e) =>
                  updateApplyForm("country", e.target.value)
                }
              />
            </div>

<<<<<<< HEAD
            <div className="form-group">
              <label>State *</label>
              <input
=======
            <div className="mb-2">
              <div className="label-sm">State *</div>
              <input
                className="input-field"
>>>>>>> 4df6b5b47b79db96905c7a85efb35dfface4fa34
                value={applyForm.state}
                onChange={(e) =>
                  updateApplyForm("state", e.target.value)
                }
              />
            </div>
          </div>

<<<<<<< HEAD
          <div className="form-group">
            <label>Organisation / Institution *</label>
            <input
=======
          <div className="mb-2">
            <div className="label-sm">Organisation *</div>
            <input
              className="input-field"
>>>>>>> 4df6b5b47b79db96905c7a85efb35dfface4fa34
              value={applyForm.organisation}
              onChange={(e) =>
                updateApplyForm("organisation", e.target.value)
              }
            />
          </div>

<<<<<<< HEAD
          <div className="form-group">
            <label>Category *</label>
            <select
=======
          <div className="mb-2">
            <div className="label-sm">Category *</div>
            <select
              className="input-field"
>>>>>>> 4df6b5b47b79db96905c7a85efb35dfface4fa34
              value={applyForm.category}
              onChange={(e) =>
                updateApplyForm("category", e.target.value)
              }
            >
<<<<<<< HEAD
              <option value="">Select Category</option>
              <option>Student</option>
              <option>Entrepreneur</option>
              <option>Industry Professional</option>
              <option>Faculty</option>
              <option>Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Comments (Optional)</label>
            <textarea
=======
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
>>>>>>> 4df6b5b47b79db96905c7a85efb35dfface4fa34
              rows="3"
              value={applyForm.notes}
              onChange={(e) =>
                updateApplyForm("notes", e.target.value)
              }
            />
          </div>
        </div>

<<<<<<< HEAD
        {/* FOOTER */}
        <button
          className="btn-apply w-full"
          onClick={submitApplication}
        >
          Submit Application
        </button>
=======
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
>>>>>>> 4df6b5b47b79db96905c7a85efb35dfface4fa34
      </div>
    </div>
  );
}
