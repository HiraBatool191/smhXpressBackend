// const nodemailer = require("nodemailer");
// console.log("BREVO_USER =>", process.env.BREVO_USER);
// console.log("BREVO_PASS =>", process.env.BREVO_PASS);
// // ✅ Better config (Gmail SMTP explicit)
// const transporter = nodemailer.createTransport({
//   host: "smtp-relay.brevo.com",
//   port: 587,
//   secure: false, // TLS
//   auth: {
//     user: process.env.BREVO_USER,   // usually email OR login id
//     pass: process.env.BREVO_PASS,   // SMTP key from Brevo
//   },
// });

// // ✅ Server start pe verify
// transporter.verify((error, success) => {
//   if (error) {
//     console.error("❌ Email transporter error:", error);
//   } else {
//     console.log("✅ Email server is ready");
//   }
// });

// // ✅ SEND OTP EMAIL FUNCTION (IMPROVED)
// const sendOTPEmail = async (toEmail, otp) => {
//   try {
//     const mailOptions = {
//       from: process.env.BREVO_USER, // 🔥 simpler & safer
//       to: toEmail,
//       subject: "Your OTP Verification Code - SMH Xpress",
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 30px; border: 1px solid #eee; border-radius: 10px;">
//           <h2 style="color: #302b63; text-align: center;">SMH Xpress</h2>
//           <h3 style="text-align: center;">Email Verification</h3>
//           <p>Your OTP verification code is:</p>
//           <div style="text-align: center; margin: 30px 0;">
//             <span style="font-size: 36px; font-weight: bold; letter-spacing: 10px; color: #302b63; background: #f4f4f4; padding: 15px 30px; border-radius: 8px;">
//               ${otp}
//             </span>
//           </div>
//           <p>This code will expire in <strong>10 minutes</strong>.</p>
//         </div>
//       `,
//     };

//     const info = await transporter.sendMail(mailOptions);

//     // ✅ SUCCESS LOG
//     console.log("📨 Email sent successfully:", info.response);

//     return true;
//   } catch (error) {
//     // ❌ FULL ERROR (IMPORTANT)
//     console.error("❌ SEND MAIL ERROR:", error);

//     return false; // 🔥 throw nahi kar rahe taake signup break na ho
//   }
// };

// module.exports = { sendOTPEmail };



const nodemailer = require("nodemailer");

console.log("BREVO_USER =>", process.env.BREVO_USER);
console.log("BREVO_PASS =>", process.env.BREVO_PASS);

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
});

transporter.verify((error) => {
  if (error) {
    console.error("❌ Email transporter error:", error);
  } else {
    console.log("✅ Email server is ready");
  }
});

const sendOTPEmail = async (toEmail, otp) => {
  try {
    const info = await transporter.sendMail({
  from: '"SMH Xpress" <afzaalminahil0@gmail.com>',
  to: toEmail,
  subject: "Your OTP Verification Code - SMH Xpress",
  html: `<h2>Your OTP is ${otp}</h2>`,
});

    console.log("📨 Email sent:", info.response);
    return true;
  } catch (err) {
    console.log("❌ EMAIL ERROR:", err.message);
    return false;
  }
};

module.exports = { sendOTPEmail };