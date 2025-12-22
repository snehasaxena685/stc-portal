const Application = require("../models/Application");
const User = require("../models/User");
const transporter = require("../utils/mailer");

/* ================= SUBMIT APPLICATION ================= */
exports.submitApplication = async (req, res) => {
  try {
    console.log("🔥 STEP 1: submitApplication HIT");

    const {
      userId,
      courseTitle,
      fullName,
      email,
      degree,
      country,
      state,
      organisation,
      category,
      phone,
      notes,
    } = req.body;

    console.log("➡ userId:", userId);
    console.log("➡ email from form:", email);

    // 1️⃣ Create application
    const application = await Application.create({
      userId,
      courseTitle,
      fullName,
      email,
      degree,
      country,
      state,
      organisation,
      category,
      phone,
      notes,
    });

    console.log("✅ Application saved:", application.applicationNumber);

    /* ================= SUBMIT SBI PAYMENT REFERENCE ================= */
exports.submitSbiPayment = async (req, res) => {
  try {
    const { applicationId, sbiReferenceNo, amount } = req.body;

    if (!sbiReferenceNo) {
      return res.status(400).json({ msg: "SBI Reference Number required" });
    }

    await Application.findByIdAndUpdate(applicationId, {
      payment: {
        method: "SBI_COLLECT",
        status: "SUBMITTED",
        sbiReferenceNo,
        paidAmount: amount,
        paidAt: new Date(),
      },
    });

    res.json({
      msg: "Payment reference submitted. Awaiting verification.",
    });

  } catch (err) {
    console.error("❌ SBI PAYMENT ERROR:", err);
    res.status(500).json({ msg: "Payment submission failed" });
  }
};


    // 2️⃣ Fetch user
    const user = await User.findById(userId);
    const regNo = user?.registrationNumber || "REG-PENDING";
    const userEmail = user?.email || email; // ⭐ FIX

    console.log("📧 FINAL MAIL TO USER:", userEmail);

    // 3️⃣ MAIL TO USER
    await transporter.sendMail({
      from: `"CFTRI STC Portal" <${process.env.MAIL_USER}>`,
      to: userEmail,
      subject: "Application Submitted – CFTRI STC",
      html: `
        <h3>Dear ${fullName},</h3>
        <p>Your application has been <b>successfully submitted</b>.</p>
        <p>
          <b>Application No:</b> ${application.applicationNumber}<br/>
          <b>Registration No:</b> ${regNo}<br/>
          <b>Course:</b> ${courseTitle}
        </p>
        <p>Regards,<br/>CFTRI STC Team</p>
      `,
    });

    console.log("✅ USER MAIL SENT");

    // 4️⃣ MAIL TO ADMIN
    await transporter.sendMail({
      from: `"CFTRI STC Portal" <${process.env.MAIL_USER}>`,
      to: process.env.STC_ADMIN_EMAIL,
      subject: `New Application – ${application.applicationNumber}`,
      html: `
        <h3>New Course Application Received</h3>
        <p>
          <b>Application No:</b> ${application.applicationNumber}<br/>
          <b>Registration No:</b> ${regNo}<br/>
          <b>Name:</b> ${fullName}<br/>
          <b>Email:</b> ${userEmail}<br/>
          <b>Phone:</b> ${phone}<br/>
          <b>Course:</b> ${courseTitle}
        </p>
      `,
    });

    console.log("✅ ADMIN MAIL SENT");

    res.json({
      msg: "Application submitted successfully",
      applicationNumber: application.applicationNumber,
    });

  } catch (err) {
    console.error("❌ APPLICATION ERROR:", err);
    res.status(500).json({
      msg: "Application saved but mail failed",
      error: err.message,
    });
  }
};
/* ================= SUBMIT SBI PAYMENT ================= */
exports.submitSbiPayment = async (req, res) => {
  try {
    const { applicationNumber, sbiRefNo } = req.body;

    if (!applicationNumber || !sbiRefNo) {
      return res.status(400).json({
        msg: "Application number and SBI reference number are required",
      });
    }

    const application = await Application.findOneAndUpdate(
      { applicationNumber },
      {
        paymentStatus: "Payment Submitted",
        sbiReferenceNumber: sbiRefNo,
        paymentSubmittedAt: new Date(),
      },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ msg: "Application not found" });
    }

    // 📧 Notify admin
    await transporter.sendMail({
      from: `"CFTRI STC Portal" <${process.env.MAIL_USER}>`,
      to: process.env.STC_ADMIN_EMAIL,
      subject: `Payment Submitted – ${application.applicationNumber}`,
      html: `
        <h3>SBI Collect Payment Submitted</h3>
        <p>
          <b>Application No:</b> ${application.applicationNumber}<br/>
          <b>SBI Reference No:</b> ${sbiRefNo}<br/>
          <b>Course:</b> ${application.courseTitle}
        </p>
        <p>Please verify payment in SBI Collect dashboard.</p>
      `,
    });

    res.json({
      msg: "Payment reference submitted successfully",
    });
  } catch (err) {
    console.error("❌ SBI PAYMENT ERROR:", err);
    res.status(500).json({ msg: "Payment submission failed" });
  }
};
