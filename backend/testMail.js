require("dotenv").config();
const transporter = require("./utils/mailer");

console.log("MAIL_USER:", process.env.MAIL_USER);
console.log("MAIL_PASS:", process.env.MAIL_PASS ? "OK" : "MISSING");

(async () => {
  await transporter.sendMail({
    from: `"CFTRI STC Portal" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_USER,
    subject: "STC Test Mail",
    text: "Mail system working successfully ✅",
  });

  console.log("✅ Test mail sent");
})();
