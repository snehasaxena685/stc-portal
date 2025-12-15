const express = require("express");
const router = express.Router();
<<<<<<< HEAD

const {
  register,
  login,
  getProfile,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", getProfile);
=======
const { registerUser, loginUser } = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
>>>>>>> 4df6b5b47b79db96905c7a85efb35dfface4fa34

module.exports = router;
