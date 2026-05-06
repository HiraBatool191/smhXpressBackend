const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: "YOUR_BREVO_USER",
    pass: "YOUR_BREVO_PASS",
  },
});

const sendTestEmail = async () => {
  try {
    const info = await transporter.sendMail({
      from: '"SMH Xpress" <afzaalminahil0@gmail.com>',
      to: "your-email@gmail.com", // 👈 apna real email yahan
      subject: "Test Email",
      text: "Hello from SMH Xpress 🚀",
    });

    console.log("EMAIL SENT:", info.response);
  } catch (err) {
    console.log("EMAIL ERROR:", err);
  }
};

sendTestEmail();