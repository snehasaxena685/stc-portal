const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");

/* ================= RAZORPAY INSTANCE ================= */
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* ================= CREATE ORDER ================= */
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    res.json(order);
  } catch (err) {
    console.error("ORDER CREATE ERROR:", err);
    res.status(500).json({ error: "Order creation failed" });
  }
});

/* ================= VERIFY PAYMENT ================= */
router.post("/verify", (req, res) => {
  try {
    const { order_id, payment_id, signature } = req.body;

    const body = order_id + "|" + payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === signature) {
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false });
    }
  } catch (err) {
    console.error("PAYMENT VERIFY ERROR:", err);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
