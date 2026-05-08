const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTPEmail = async (toEmail, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: "OTP Verification",
      html: `
        <div>
          <h2>Your OTP Code</h2>
          <h1>${otp}</h1>
          <p>Valid for 10 minutes</p>
        </div>
      `,
    });

    console.log("OTP SENT:", otp);

  } catch (err) {
    console.log("EMAIL ERROR:", err.message);
  }
};

module.exports = { sendOTPEmail };