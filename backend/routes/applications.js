const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");

// ✅ IMPORT BOTH CONTROLLERS
const {
  submitApplication,
  submitSbiPayment,
} = require("../controllers/applicationController");

router.post(
  "/submit",
  upload.single("casteCertificate"),
  submitApplication
);

router.post("/submit-sbi-payment", submitSbiPayment);

module.exports = router;
