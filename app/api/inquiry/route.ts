import { Resend } from "resend";
import type { NextRequest } from "next/server";

/* ─── In-memory rate limiter (per IP, resets on cold start) ─────────────── */
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 3; // max submissions per window per IP

interface RateLimitEntry {
  count: number;
  resetAt: number;
}
const rateMap = new Map<string, RateLimitEntry>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

/* ─── Allowed values ─────────────────────────────────────────────────────── */
const ALLOWED_REQUEST_TYPES = ["consultation", "projectRequest", "serviceRequest"] as const;
const ALLOWED_CONSULTATION_TYPES = ["website", "mobileApp", "uiux", "general"] as const;
const ALLOWED_SERVICE_TYPES = ["website", "mobileApp", "design"] as const;
const ALLOWED_BUDGET_VALUES = [
  "under-5k",
  "5k-10k",
  "10k-25k",
  "25k-50k",
  "50k-plus",
  "not-sure",
] as const;

type RequestType = (typeof ALLOWED_REQUEST_TYPES)[number];
type ConsultationType = (typeof ALLOWED_CONSULTATION_TYPES)[number];
type ServiceType = (typeof ALLOWED_SERVICE_TYPES)[number];
type BudgetValue = (typeof ALLOWED_BUDGET_VALUES)[number];

/* ─── HTML escape ────────────────────────────────────────────────────────── */
function escHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

/* ─── Label helpers ──────────────────────────────────────────────────────── */
const REQUEST_TYPE_LABELS: Record<RequestType, string> = {
  consultation: "Consultation",
  projectRequest: "Project Request",
  serviceRequest: "Service Request",
};

const CONSULTATION_TYPE_LABELS: Record<ConsultationType, string> = {
  website: "Website Consultation",
  mobileApp: "Mobile App Consultation",
  uiux: "UI/UX Design Consultation",
  general: "General Consultation",
};

const SERVICE_TYPE_LABELS: Record<ServiceType, string> = {
  website: "Website",
  mobileApp: "Mobile App",
  design: "Design",
};

/* ─── Email HTML builder ─────────────────────────────────────────────────── */
function buildEmailHtml(fields: {
  email: string;
  requestType: RequestType;
  consultationType?: ConsultationType;
  serviceType?: ServiceType;
  budget?: string;
  description?: string;
  lang: string;
  receivedAt: string;
}): string {
  const rows = [
    { label: "Visitor Email", value: fields.email },
    { label: "Request Type", value: REQUEST_TYPE_LABELS[fields.requestType] },
    fields.consultationType
      ? {
          label: "Consultation Type",
          value: CONSULTATION_TYPE_LABELS[fields.consultationType],
        }
      : null,
    fields.serviceType
      ? {
          label: "Service Type",
          value: SERVICE_TYPE_LABELS[fields.serviceType],
        }
      : null,
    fields.budget ? { label: "Estimated Budget", value: fields.budget } : null,
    fields.description ? { label: "Description / Brief", value: fields.description } : null,
    { label: "Site Language", value: fields.lang === "ar" ? "Arabic (ar)" : "English (en)" },
    { label: "Received At", value: fields.receivedAt },
  ].filter(Boolean) as { label: string; value: string }[];

  const tableRows = rows
    .map(
      (r) => `
      <tr>
        <td style="padding:10px 16px;border-bottom:1px solid #2E3342;color:#94A3B8;font-size:13px;white-space:nowrap;font-family:monospace;">${escHtml(r.label)}</td>
        <td style="padding:10px 16px;border-bottom:1px solid #2E3342;color:#F5F5F5;font-size:14px;">${escHtml(r.value)}</td>
      </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#0A0E16;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0E16;padding:32px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#1C1E26;border-radius:16px;border:1px solid #2E3342;overflow:hidden;">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#14161C,#1C1E26);padding:28px 32px;border-bottom:1px solid #2E3342;">
            <p style="margin:0;font-size:11px;color:#22D3EE;font-family:monospace;letter-spacing:0.1em;text-transform:uppercase;">INOVIX · New Inquiry</p>
            <h1 style="margin:8px 0 0;font-size:22px;color:#F5F5F5;font-weight:700;">${escHtml(REQUEST_TYPE_LABELS[fields.requestType])}${fields.serviceType ? " — " + escHtml(SERVICE_TYPE_LABELS[fields.serviceType]) : ""}</h1>
          </td>
        </tr>
        <!-- Table -->
        <tr><td style="padding:0 0 8px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            ${tableRows}
          </table>
        </td></tr>
        <!-- Reply note -->
        <tr>
          <td style="padding:20px 32px 28px;border-top:1px solid #2E3342;">
            <p style="margin:0;font-size:12px;color:#64748B;">Reply-To is set to the visitor's email — you can reply directly from your inbox.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/* ─── Route Handler ──────────────────────────────────────────────────────── */
export async function POST(request: NextRequest) {
  /* --- Environment config ------------------------------------------------ */
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ?? "Inovix <onboarding@resend.dev>";

  if (!apiKey || apiKey === "re_xxxxxxxxx") {
    return Response.json(
      { error: "Server configuration error: missing RESEND_API_KEY." },
      { status: 500 }
    );
  }
  if (!toEmail) {
    return Response.json(
      { error: "Server configuration error: missing CONTACT_TO_EMAIL." },
      { status: 500 }
    );
  }

  /* --- Rate limiting ----------------------------------------------------- */
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";
  if (isRateLimited(ip)) {
    return Response.json(
      { error: "Too many requests. Please wait a minute and try again." },
      { status: 429 }
    );
  }

  /* --- Parse & validate body --------------------------------------------- */
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return Response.json({ error: "Invalid payload." }, { status: 400 });
  }

  const raw = body as Record<string, unknown>;

  // email
  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Invalid email address." }, { status: 400 });
  }

  // requestType
  const requestType = raw.requestType as string;
  if (!ALLOWED_REQUEST_TYPES.includes(requestType as RequestType)) {
    return Response.json({ error: "Invalid request type." }, { status: 400 });
  }

  const lang = raw.lang === "ar" ? "ar" : "en";

  let consultationType: ConsultationType | undefined;
  let serviceType: ServiceType | undefined;
  let budget: string | undefined;

  if (requestType === "consultation") {
    const ct = raw.consultationType as string;
    if (!ALLOWED_CONSULTATION_TYPES.includes(ct as ConsultationType)) {
      return Response.json(
        { error: "Invalid consultation type." },
        { status: 400 }
      );
    }
    consultationType = ct as ConsultationType;
  } else {
    // projectRequest or serviceRequest
    const st = raw.serviceType as string;
    if (!ALLOWED_SERVICE_TYPES.includes(st as ServiceType)) {
      return Response.json(
        { error: "Invalid service type." },
        { status: 400 }
      );
    }
    serviceType = st as ServiceType;

    const bv = typeof raw.budget === "string" ? raw.budget.trim() : "";
    if (!bv || bv.length > 50) {
      return Response.json(
        { error: "Invalid budget value." },
        { status: 400 }
      );
    }
    budget = bv;
  }

  const description =
    typeof raw.description === "string" && raw.description.trim().length > 0
      ? raw.description.trim().slice(0, 3000)
      : undefined;

  /* --- Build email subject ----------------------------------------------- */
  const subjectParts = ["New", REQUEST_TYPE_LABELS[requestType as RequestType]];
  if (serviceType) subjectParts.push("—", SERVICE_TYPE_LABELS[serviceType]);
  if (consultationType)
    subjectParts.push("—", CONSULTATION_TYPE_LABELS[consultationType]);
  const subject = subjectParts.join(" ");

  /* --- Send via Resend ---------------------------------------------------- */
  const receivedAt = new Date().toLocaleString("en-GB", {
    dateStyle: "full",
    timeStyle: "long",
    timeZone: "UTC",
  });

  const html = buildEmailHtml({
    email,
    requestType: requestType as RequestType,
    consultationType,
    serviceType,
    budget,
    description,
    lang,
    receivedAt,
  });

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: email,
    subject,
    html,
  });

  if (error) {
    console.error("[inquiry] Resend error:", error);
    return Response.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }

  return Response.json({ ok: true }, { status: 200 });
}
