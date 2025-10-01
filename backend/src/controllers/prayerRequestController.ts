// ✅ **ARCHITECTURAL DECISION**: Prayer requests are EMAIL-ONLY (no database storage)
//
// DECISION: Keep current email-only approach for prayer requests
// RATIONALE:
// - Simpler implementation
// - Direct pastor communication
// - No database overhead
// - Privacy-focused (no persistent storage)
//
// Prayer requests are sent directly to configured email address for immediate attention.

import { Request, Response } from "express";
import nodemailer from "nodemailer";
import env from "../config/env";

// Setup nodemailer transporter using environment variables
const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_PORT === 465, // true for 465, false for other ports
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

export const sendPrayerRequest = async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  const mailOptions = {
    from: `"Prayer Request Form" <${env.SMTP_USER}>`,
    to: env.PRAYER_REQUEST_EMAIL, // The email address that will receive the requests
    subject: `New Prayer Request from ${name}`,
    html: `
      <h2>New Prayer Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res
      .status(200)
      .json({ success: true, message: "Prayer request sent successfully!" });
  } catch (error) {
    console.error("Error sending prayer request email:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to send prayer request." });
  }
};
