const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

<<<<<<< HEAD
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashed,
    });

    res.json({ msg: "Registration successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

const login = async (req, res) => {
=======
// REGISTER
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, address, phone, nationality } = req.body;

    let existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ msg: "Email already registered" });

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPass,
      address,
      phone,
      nationality,
    });

    res.json({
      msg: "Registration successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        registrationNumber: user.registrationNumber,
      },
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ msg: "Error registering user", error: err.message });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
>>>>>>> 4df6b5b47b79db96905c7a85efb35dfface4fa34
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
<<<<<<< HEAD
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
=======
    if (!user)
      return res.status(400).json({ msg: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ msg: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, "SECRET123", { expiresIn: "7d" });

    res.json({
      msg: "Login successful",
>>>>>>> 4df6b5b47b79db96905c7a85efb35dfface4fa34
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
<<<<<<< HEAD
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

const getProfile = async (req, res) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
      return res.status(401).json({ msg: "No token" });
    }

    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    res.json({ user });
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = {
  register,
  login,
  getProfile,
};
=======
        phone: user.phone,
        registrationNumber: user.registrationNumber,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ msg: "Error logging in", error: err.message });
  }
};
>>>>>>> 4df6b5b47b79db96905c7a85efb35dfface4fa34
