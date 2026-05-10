const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  // ✅ Yeh add karo
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 10000,
  socketTimeout: 15000,
});

const sendOTPEmail = async (toEmail, otp) => {
  try {
    const info = await transporter.sendMail({
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

    console.log("✅ Email sent to:", toEmail);
    return true;
  } catch (err) {
    console.log("❌ EMAIL ERROR:", err.message); // exact error dekho
    return false;
  }
};

module.exports = { sendOTPEmail };
