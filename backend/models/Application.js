const mongoose = require("mongoose");

const generateApplicationNumber = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `APP-${year}-${random}`;
};

const applicationSchema = new mongoose.Schema(
  {
    userId: String,
    courseTitle: String,
    courseId: String,
    fullName: String,
    email: String,
    degree: String,
    country: String,
    state: String,
    organisation: String,
    category: String,
    phone: String,
    notes: String,

    applicationNumber: {
      type: String,
      default: generateApplicationNumber,
      unique: true,
    },

    status: {
      type: String,
      default: "Pending"
    },

    payment: {
      method: {
        type: String,
        default: "SBI_COLLECT"
      },
      status: {
        type: String,
        enum: ["PENDING", "SUBMITTED", "VERIFIED"],
        default: "PENDING"
      },
      sbiReferenceNo: String,
      paidAmount: Number,
      paidAt: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
