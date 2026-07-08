import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, company, message, serviceType, volume, addOnsSelected, estimatedRange } = body;

    // Verify presence of required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (name, email, message)" },
        { status: 400 }
      );
    }

    // If SMTP credentials are not configured, fallback to Mock Mode
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn("SMTP credentials not configured. Falling back to Mock Mode.");
      console.log("=========================================");
      console.log(`From: ${name} <${email}>`);
      console.log(`Company: ${company || "N/A"}`);
      console.log(`Service: ${serviceType || "N/A"}`);
      console.log(`Volume: ${volume || "N/A"}`);
      console.log(`Add-ons: ${addOnsSelected || "N/A"}`);
      console.log(`Estimate: ${estimatedRange || "N/A"}`);
      console.log(`Message: ${message}`);
      console.log("=========================================");

      return NextResponse.json({
        success: true,
        message: "Email logged (Mock Mode — no SMTP credentials configured)"
      });
    }

    const smtpUser = process.env.SMTP_USER;
    const smtpHost = process.env.SMTP_HOST || "smtp.hostinger.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "465");
    const smtpSecure = process.env.SMTP_SECURE !== "false"; // default true for port 465

    // Configure SMTP transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // The "from" MUST be the authenticated SMTP user (Hostinger requirement).
    // The visitor's email goes in "replyTo" so you can reply directly to them.
    const mailOptions = {
      from: `"AAVA Customs Website" <${smtpUser}>`,
      to: smtpUser,
      replyTo: email,
      subject: `New Project Inquiry from ${name}${company ? ` — ${company}` : ""}`,
      text: `
New Inquiry Received from AAVA Customs Website

Name: ${name}
Email: ${email}
Company: ${company || "N/A"}
Service: ${serviceType || "N/A"}
Volume / Guests: ${volume || "N/A"}
Selected Add-ons: ${addOnsSelected || "N/A"}
Ballpark Budget Estimate: ${estimatedRange || "N/A"}

Message:
${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #1a365d, #2c7a7b); padding: 20px 24px;">
            <h2 style="color: #ffffff; margin: 0; font-size: 18px;">New Website Inquiry</h2>
          </div>
          <div style="padding: 24px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 150px; color: #555; border-bottom: 1px solid #f0f0f0;">Name</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555; border-bottom: 1px solid #f0f0f0;">Email</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><a href="mailto:${email}" style="color: #2c7a7b;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555; border-bottom: 1px solid #f0f0f0;">Company</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">${company || "N/A"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555; border-bottom: 1px solid #f0f0f0;">Service Type</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0; text-transform: capitalize;">${serviceType || "N/A"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 150px; color: #555; border-bottom: 1px solid #f0f0f0;">Volume / Guests</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">${volume || "N/A"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555; border-bottom: 1px solid #f0f0f0;">Add-ons</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">${addOnsSelected || "N/A"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Budget Estimate</td>
                <td style="padding: 8px 0; font-weight: bold; color: #2c7a7b; font-size: 15px;">${estimatedRange || "N/A"}</td>
              </tr>
            </table>
            <div style="margin-top: 20px; border-top: 1px solid #eee; padding-top: 16px;">
              <p style="font-weight: bold; color: #555; margin-bottom: 8px;">Message:</p>
              <p style="background-color: #f8f9fa; padding: 14px; border-radius: 6px; white-space: pre-wrap; color: #333; border-left: 3px solid #2c7a7b;">${message}</p>
            </div>
            <p style="margin-top: 20px; font-size: 11px; color: #999;">This inquiry was submitted via the AAVA Customs website contact form. Hit reply to respond directly to the sender.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to send email" },
      { status: 500 }
    );
  }
}
