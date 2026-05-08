const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    if (message.length < 10) {
      return res.status(400).json({ message: "Message must be at least 10 characters" });
    }

    // Email to admin/support
    await transporter.sendMail({
      from: `"SMH Xpress Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Contact Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9fafb; border-radius: 12px;">
          <h2 style="color: #dc2626; margin-bottom: 8px;">New Contact Message</h2>
          <p style="color: #6b7280; margin-bottom: 24px;">Someone reached out via the contact form.</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px; background: #fff; border-radius: 8px 8px 0 0; border-bottom: 1px solid #f3f4f6;">
                <strong style="color: #374151;">Name</strong><br/>
                <span style="color: #6b7280;">${name}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #fff; border-bottom: 1px solid #f3f4f6;">
                <strong style="color: #374151;">Email</strong><br/>
                <span style="color: #6b7280;">${email}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #fff; border-radius: 0 0 8px 8px;">
                <strong style="color: #374151;">Message</strong><br/>
                <span style="color: #6b7280;">${message}</span>
              </td>
            </tr>
          </table>
        </div>
      `,
    });

    // Auto-reply to user
    await transporter.sendMail({
      from: `"SMH Xpress" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We received your message — SMH Xpress",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9fafb; border-radius: 12px;">
          <h2 style="color: #dc2626;">Thanks for reaching out, ${name}! 👋</h2>
          <p style="color: #6b7280;">We've received your message and will get back to you within 24 hours.</p>
          <div style="background: #fff; border-radius: 8px; padding: 16px; margin-top: 16px; border-left: 4px solid #dc2626;">
            <p style="color: #374151; margin: 0;"><strong>Your message:</strong></p>
            <p style="color: #6b7280; margin-top: 8px;">${message}</p>
          </div>
          <p style="color: #9ca3af; font-size: 13px; margin-top: 24px;">— SMH Xpress Support Team</p>
        </div>
      `,
    });

    res.json({ message: "Message sent successfully! We'll get back to you soon." });

  } catch (err) {
    console.error("CONTACT ERROR:", err.message);
    res.status(500).json({ message: "Failed to send message. Please try again." });
  }
});

module.exports = router;