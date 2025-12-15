import React from "react";

export default function ApplicationsPanel({ applications }) {
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
