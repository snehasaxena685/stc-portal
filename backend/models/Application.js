const mongoose = require("mongoose");

/* ================= APPLICATION NUMBER GENERATOR ================= */
const generateApplicationNumber = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `APP-${year}-${random}`;
};

/* ================= APPLICATION SCHEMA ================= */
const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    courseTitle: {
      type: String,
      required: true,
    },

    courseId: {
      type: String,
    },

    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    degree: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    organisation: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    notes: {
      type: String,
    },

    /* 🔑 UNIQUE APPLICATION NUMBER */
    applicationNumber: {
      type: String,
      default: generateApplicationNumber,
      unique: true,
    },

    status: {
      type: String,
      default: "Pending",
    },
applicationNumber: {
  type: String,
  default: generateApplicationNumber,
  unique: true,
},

/* 💳 SBI COLLECT PAYMENT INFO */
payment: {
  method: {
    type: String,
    default: "SBI_COLLECT",
  },
  status: {
    type: String,
    enum: ["PENDING", "SUBMITTED", "VERIFIED"],
    default: "PENDING",
  },
  sbiReferenceNo: {
    type: String,
  },
  paidAmount: {
    type: Number,
  },
  paidAt: {
    type: Date,
  },
},

status: {
  type: String,
  default: "Pending",
},
  
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

/* ❗ Prevent index crashes in dev */
applicationSchema.set("autoIndex", false);

module.exports = mongoose.model("Application", applicationSchema);
