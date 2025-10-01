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

// Email functionality disabled (SMTP vars removed)
export const sendPrayerRequest = async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  // Prayer request email sending is disabled
  return res.status(501).json({
    success: false,
    message: "Prayer request email sending is disabled in this deployment.",
  });
};
