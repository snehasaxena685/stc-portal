import React, { useEffect } from "react";

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
              value={applyForm.fullName}
              onChange={(e) =>
                updateApplyForm("fullName", e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              value={applyForm.email}
              onChange={(e) =>
                updateApplyForm("email", e.target.value)
              }
            />
          </div>

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
              value={applyForm.degree}
              onChange={(e) =>
                updateApplyForm("degree", e.target.value)
              }
            />
          </div>

          <div className="grid-two">
            <div className="form-group">
              <label>Country *</label>
              <input
                value={applyForm.country}
                onChange={(e) =>
                  updateApplyForm("country", e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>State *</label>
              <input
                value={applyForm.state}
                onChange={(e) =>
                  updateApplyForm("state", e.target.value)
                }
              />
            </div>
          </div>

          <div className="form-group">
            <label>Organisation / Institution *</label>
            <input
              value={applyForm.organisation}
              onChange={(e) =>
                updateApplyForm("organisation", e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select
              value={applyForm.category}
              onChange={(e) =>
                updateApplyForm("category", e.target.value)
              }
            >
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
              rows="3"
              value={applyForm.notes}
              onChange={(e) =>
                updateApplyForm("notes", e.target.value)
              }
            />
          </div>
        </div>

        {/* FOOTER */}
        <button
          className="btn-apply w-full"
          onClick={submitApplication}
        >
          Submit Application
        </button>
      </div>
    </div>
  );
}
