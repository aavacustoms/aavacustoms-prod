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

    // Configure SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: "hello@aavacustoms.com",
      replyTo: email,
      subject: `New Project Inquiry: ${company || name}`,
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
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #f0f0f0; padding: 20px; border-radius: 8px;">
          <h2 style="color: #2c7a7b; border-bottom: 2px solid #2c7a7b; padding-bottom: 10px;">New Website Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 160px;">Name:</td>
              <td style="padding: 6px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Email:</td>
              <td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #2c7a7b;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Company:</td>
              <td style="padding: 6px 0;">${company || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Service Type:</td>
              <td style="padding: 6px 0; text-transform: uppercase;">${serviceType || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Volume / Guests:</td>
              <td style="padding: 6px 0;">${volume || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Add-ons:</td>
              <td style="padding: 6px 0;">${addOnsSelected || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Ballpark Estimate:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #2c7a7b;">${estimatedRange || "N/A"}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; border-top: 1px solid #eee; padding-top: 15px;">
            <p style="font-weight: bold; margin-bottom: 8px;">Message:</p>
            <p style="background-color: #f9f9f9; padding: 12px; border-radius: 6px; white-space: pre-wrap; font-style: italic;">${message}</p>
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
