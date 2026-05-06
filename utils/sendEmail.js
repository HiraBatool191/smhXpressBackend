const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error) => {
  if (error) {
    console.log("❌ Email error:", error);
  } else {
    console.log("✅ Email server ready");
  }
});

const sendOTPEmail = async (toEmail, otp) => {
  try {
    await transporter.sendMail({
      from: `"SMH Xpress" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "OTP Verification Code",
      html: `
        <div style="font-family:Arial;padding:20px">
          <h2>🔐 OTP Verification</h2>
          <h1 style="color:red">${otp}</h1>
          <p>Valid for 10 minutes</p>
        </div>
      `,
    });

    console.log("📨 Email sent");
    return true;
  } catch (err) {
    console.log("❌ EMAIL ERROR:", err.message);
    return false;
  }
};

module.exports = { sendOTPEmail };