import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
  }

  try {
    // Email to support
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "muskansingh7105@gmail.com", // TODO: change to support@uptrend.in after domain verification
      subject: `New Contact Form: ${subject || "General Inquiry"}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#0a0a14">New Contact Form Submission</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#555;font-weight:bold">Name:</td><td style="padding:8px 0">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#555;font-weight:bold">Email:</td><td style="padding:8px 0">${email}</td></tr>
            <tr><td style="padding:8px 0;color:#555;font-weight:bold">Subject:</td><td style="padding:8px 0">${subject || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#555;font-weight:bold;vertical-align:top">Message:</td><td style="padding:8px 0">${message}</td></tr>
          </table>
        </div>
      `,
    });

    // Auto-reply to user
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "muskansingh7105@gmail.com", // TODO: change to `email` after domain verification
      subject: "Thanks for contacting Uptrender",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a14;padding:40px;border-radius:12px">
          <h2 style="color:#00f0ff;margin-bottom:8px">Hello ${name} 👋</h2>
          <p style="color:#cccccc;line-height:1.7">Thank you for reaching out to us. We've received your message and our support team will get back to you within <strong style="color:#ffffff">24 hours</strong>.</p>
          <p style="color:#cccccc;line-height:1.7">If your query is urgent, you can also reach us directly at <a href="mailto:support@uptrend.in" style="color:#00f0ff">support@uptrend.in</a>.</p>
          <br/>
          <p style="color:#888888;font-size:13px">Team Uptrender<br/>509, Babylon Capital, VIP Road, Raipur, Chhattisgarh</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Emails sent" });
  } catch (error) {
    console.error("Email error:", error);
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
