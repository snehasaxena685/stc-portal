const express = require("express");
const router = express.Router();
const Application = require("../models/Application");

/* ================= ADMIN DASHBOARD STATS ================= */
router.get("/stats", async (req, res) => {
  try {
    const totalApplications = await Application.countDocuments();

    const approved = await Application.countDocuments({
      status: "Approved",
    });

    const pending = await Application.countDocuments({
      status: "Pending",
    });

    const paymentsReceived = await Application.countDocuments({
      "payment.status": "VERIFIED",
    });

    res.json({
      totalApplications,
      approved,
      pending,
      paymentsReceived,
    });
  } catch (error) {
    console.error("❌ Dashboard stats error:", error);
    res.status(500).json({ message: "Dashboard stats error" });
  }
});

module.exports = router;
