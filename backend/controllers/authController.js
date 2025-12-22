const transporter = require("../utils/mailer");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password, phone, address, nationality } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Name, email & password required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      phone: phone || "",
      address: address || "",
      nationality: nationality || "",
      avatar: "",
    });

    /* ================= SEND EMAILS ================= */

    // 📩 Mail to USER
    await transporter.sendMail({
      from: `"CFTRI STC Portal" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Registration Successful – CFTRI STC Portal",
      html: `
        <h3>Dear ${name},</h3>
        <p>Your registration on <b>CSIR–CFTRI Short Term Training Courses Portal</b> was successful.</p>
        <p><b>Email:</b> ${email}</p>
        <p>You can now login and apply for courses.</p>
        <br/>
        <p>Regards,<br/>CFTRI STC Team</p>
      `,
    });

    // 📩 Mail to ADMIN (STC)
    await transporter.sendMail({
      from: `"CFTRI STC Portal" <${process.env.MAIL_USER}>`,
      to: process.env.STC_ADMIN_EMAIL,
      subject: "New User Registration – CFTRI STC Portal",
      html: `
        <h3>New User Registered</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone || "N/A"}</p>
        <p><b>Nationality:</b> ${nationality || "N/A"}</p>
      `,
    });

    /* ================= RESPONSE ================= */

    res.json({
      msg: "Registration successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        nationality: user.nationality,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
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
  token,
  user: {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone || "",
    address: user.address || "",
    nationality: user.nationality || "",
    avatar: user.avatar || "",
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
