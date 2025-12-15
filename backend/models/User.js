const mongoose = require("mongoose");

<<<<<<< HEAD
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    nationality: {
      type: String,
      default: "",
    },

    avatar: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
=======
// Generate Unique Registration Number
const generateRegistrationNumber = () => {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `REG-2025-${random}`;
};

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  address: String,
  phone: String,
  nationality: String,
  role: { type: String, default: "student" },

  registrationNumber: {
    type: String,
    unique: true,
    default: generateRegistrationNumber,
  },

  createdAt: { type: Date, default: Date.now }
});
>>>>>>> 4df6b5b47b79db96905c7a85efb35dfface4fa34

module.exports = mongoose.model("User", userSchema);
