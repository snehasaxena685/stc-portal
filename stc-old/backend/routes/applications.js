const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload");
const Application = require("../models/Application");

/* ================= SUBMIT APPLICATION ================= */
router.post(
  "/submit",
  upload.single("casteCertificate"),
  async (req, res) => {
    try {
      const application = new Application({
        ...req.body,
        casteCertificatePath: req.file ? req.file.path : null,
      });

      await application.save();

      res.json({
        msg: "Application submitted successfully",
        applicationNumber: application.applicationNumber,
      });
    } catch (err) {
      console.error("APPLICATION SUBMIT ERROR:", err);
      res.status(500).json({ msg: "Submission failed" });
    }
  }
);

module.exports = router;
