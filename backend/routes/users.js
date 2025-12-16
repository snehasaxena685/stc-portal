const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const User = require("../models/User");

/**
 * POST /api/users/upload-avatar
 */
router.post("/upload-avatar", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.avatar = req.body.avatar; // base64 string
    await user.save();

    res.json({ avatar: user.avatar });
  } catch (err) {
    res.status(500).json({ msg: "Avatar upload failed" });
  }
});

module.exports = router;
