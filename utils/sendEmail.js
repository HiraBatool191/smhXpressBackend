const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTPEmail = async (toEmail, otp) => {
  const mailOptions = {
    from: `"SMH Xpress" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Your OTP Verification Code - SMH Xpress",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 30px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #302b63; text-align: center;">SMH Xpress</h2>
        <h3 style="text-align: center;">Email Verification</h3>
        <p>Your OTP verification code is:</p>
        <div style="text-align: center; margin: 30px 0;">
          <span style="font-size: 36px; font-weight: bold; letter-spacing: 10px; color: #302b63; background: #f4f4f4; padding: 15px 30px; border-radius: 8px;">
            ${otp}
          </span>
        </div>
        <p>This code will expire in <strong>10 minutes</strong>.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendOTPEmail };