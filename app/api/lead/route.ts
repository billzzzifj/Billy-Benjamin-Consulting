import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

interface LeadPayload {
  founderName: string;
  email: string;
  storeUrl: string;
  primaryBottleneck: string;
  whatsapp?: string;
}

export async function POST(request: Request) {
  try {
    const body: LeadPayload = await request.json();

    const { founderName, email, storeUrl, primaryBottleneck, whatsapp } = body;

    // Strict validation
    if (!founderName || !email || !storeUrl) {
      return NextResponse.json(
        { error: "Missing required fields: founderName, email, or storeUrl" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address format" },
        { status: 400 }
      );
    }

    const ticketId = `BBC-TX-${Math.floor(1000 + Math.random() * 9000)}`;
    const timestamp = new Date().toISOString();

    const newLead = {
      ticketId,
      timestamp,
      founderName: founderName.trim(),
      email: email.trim().toLowerCase(),
      storeUrl: storeUrl.trim(),
      primaryBottleneck: primaryBottleneck || "Cart Abandonment (>65%)",
      whatsapp: whatsapp ? whatsapp.trim() : null,
      status: "QUEUED_FOR_FORENSIC_AUDIT",
      auditSlaHours: 24,
      followUpScheduled: {
        immediateConfirmation: true,
        auditTeardownEta: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      },
    };

    // 1. Persist lead to local JSON storage
    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "leads.json");

    try {
      await fs.mkdir(dataDir, { recursive: true });
      let existingLeads: any[] = [];
      try {
        const fileContent = await fs.readFile(filePath, "utf-8");
        existingLeads = JSON.parse(fileContent);
      } catch {
        existingLeads = [];
      }
      existingLeads.unshift(newLead);
      await fs.writeFile(filePath, JSON.stringify(existingLeads, null, 2), "utf-8");
    } catch (fsErr) {
      console.error("[LEAD_STORAGE_ERROR]", fsErr);
    }

    // 2. Dispatch Email Notification if Resend API Key is provided
    const resendApiKey = process.env.RESEND_API_KEY;
    const notificationEmail = process.env.NOTIFICATION_EMAIL || "billy@billybenjaminconsulting.online";

    if (resendApiKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Billy Benjamin Consulting <audit@billybenjaminconsulting.online>",
            to: [email, notificationEmail],
            subject: `[${ticketId}] Forensic Audit Request Registered — Billy Benjamin Consulting`,
            html: `
              <div style="font-family: monospace; background: #F5F5F3; color: #0A0A0A; padding: 24px; border: 1px solid #0A0A0A;">
                <div style="background: #CDE570; padding: 8px 12px; font-weight: bold; border: 1px solid #0A0A0A; margin-bottom: 16px;">
                  BILLY BENJAMIN CONSULTING // FORENSIC AUDIT INTAKE CONFIRMED
                </div>
                <p>Hello ${founderName},</p>
                <p>Your store URL <strong>${storeUrl}</strong> has been assigned Ticket ID <strong>${ticketId}</strong>.</p>
                <p>We are executing a dual-surface forensic teardown:</p>
                <ul>
                  <li><strong>Surface A (The Store):</strong> LCP, mobile thumb constraints, and checkout funnel drops.</li>
                  <li><strong>Surface B (Instagram):</strong> Bio link routing, content-to-cart continuity, and offer alignment.</li>
                </ul>
                <p>Your unredacted teardown spec will be delivered to this email within 24 hours.</p>
                <br/>
                <p style="font-size: 11px; color: #666;">
                  BILLY BENJAMIN CONSULTING • LAGOS // LONDON // NYC<br/>
                  <a href="https://billybenjaminconsulting.online">billybenjaminconsulting.online</a>
                </p>
              </div>
            `,
          }),
        });
      } catch (emailErr) {
        console.error("[EMAIL_DISPATCH_ERROR]", emailErr);
      }
    }

    // 3. Webhook dispatch if configured
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newLead),
        });
      } catch (webhookErr) {
        console.error("[WEBHOOK_DISPATCH_ERROR]", webhookErr);
      }
    }

    return NextResponse.json({
      success: true,
      ticketId,
      message: "Audit request registered and queued for 24-hour forensic teardown.",
      data: newLead,
    });
  } catch (err: any) {
    console.error("[LEAD_API_ERROR]", err);
    return NextResponse.json(
      { error: "Internal server error while capturing lead" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "leads.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const leads = JSON.parse(fileContent);
    return NextResponse.json({ count: leads.length, leads });
  } catch {
    return NextResponse.json({ count: 0, leads: [] });
  }
}
