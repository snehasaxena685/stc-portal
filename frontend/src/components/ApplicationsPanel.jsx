import React from "react";

export default function ApplicationsPanel({ applications, onPayNow }) {
  if (!applications.length) {
    return (
      <div className="card-stc">
        <h3 className="text-lg font-semibold text-green-900">
          My Applications
        </h3>
        <p className="text-sm text-gray-600">
          No applications submitted yet.
        </p>
      </div>
    );
  }

  return (
    <div className="card-stc">
      <h3 className="text-lg font-semibold text-green-900 mb-2">
        My Applications
      </h3>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#e7f9ef" }}>
              <th>Course</th>
              <th>Date</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Transaction</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((a, i) => (
              <tr key={i}>
                <td>{a.course}</td>
                <td>{a.date}</td>
                <td>{a.status}</td>
                <td>{a.payment}</td>
                <td>{a.txnId || "-"}</td>

                <td>
                  {a.payment === "Pending" ? (
                    <button
                      onClick={() => onPayNow(i)}
                      style={{
                        padding: "6px 12px",
                        background: "#16a34a",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "12px",
                      }}
                    >
                      Pay Now
                    </button>
                  ) : (
                    <span style={{ color: "#16a34a", fontWeight: 600 }}>
                      Paid
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
