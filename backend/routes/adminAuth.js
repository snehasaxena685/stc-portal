const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * TEMP ADMIN (hardcoded for now)
 * Later we will move this to MongoDB model
 */
const ADMIN_EMAIL = "snehasaxena685@gmail.com";
const ADMIN_PASSWORD = "admin123"; // plain for now

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ msg: "Invalid admin credentials" });
  }

  const token = jwt.sign(
    { role: "admin", email },
    process.env.JWT_SECRET || "secret123",
    { expiresIn: "1d" }
  );

  res.json({
    token,
    admin: { email },
  });
});

module.exports = router;
