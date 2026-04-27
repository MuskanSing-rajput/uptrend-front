import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, phone, date, time, description, source } = await req.json();

  if (!name || !email) {
    return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
  }

  const sourceLabel = source === "white-label" ? "White Label" : "Partnership";

  try {
    // Email to support
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "support@uptrend.in",
      subject: `New Demo Call Request — ${sourceLabel}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#0a0a14">New Demo Call Request (${sourceLabel})</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#555;font-weight:bold">Name:</td><td style="padding:8px 0">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#555;font-weight:bold">Email:</td><td style="padding:8px 0">${email}</td></tr>
            <tr><td style="padding:8px 0;color:#555;font-weight:bold">Phone:</td><td style="padding:8px 0">${phone || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#555;font-weight:bold">Preferred Date:</td><td style="padding:8px 0">${date || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#555;font-weight:bold">Preferred Time:</td><td style="padding:8px 0">${time || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#555;font-weight:bold;vertical-align:top">Description:</td><td style="padding:8px 0">${description || "—"}</td></tr>
          </table>
        </div>
      `,
    });

    // Auto-reply to user
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: `Your Demo Call Request — Uptrender ${sourceLabel}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a14;padding:40px;border-radius:12px">
          <h2 style="color:#00f0ff;margin-bottom:8px">Hello ${name} 👋</h2>
          <p style="color:#cccccc;line-height:1.7">Thank you for your interest in Uptrender's <strong style="color:#ffffff">${sourceLabel}</strong> programme.</p>
          <p style="color:#cccccc;line-height:1.7">We've received your demo call request${date ? ` for <strong style="color:#ffffff">${date}${time ? " at " + time : ""}</strong>` : ""}. Our team will reach out to you shortly to confirm the schedule.</p>
          <p style="color:#cccccc;line-height:1.7">In the meantime, feel free to reach us at <a href="mailto:support@uptrend.in" style="color:#00f0ff">support@uptrend.in</a> for any queries.</p>
          <br/>
          <p style="color:#888888;font-size:13px">Team Uptrender<br/>509, Babylon Capital, VIP Road, Raipur, Chhattisgarh</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Emails sent" });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ success: false, message: "Failed to send email" }, { status: 500 });
  }
}
