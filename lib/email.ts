import { google } from "googleapis";

function getOAuthClient() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });
  return oauth2Client;
}

export async function sendEmail(
  to: string,
  template: { subject: string; html: string }
) {
  try {
    const auth = getOAuthClient();
    const gmail = google.gmail({ version: "v1", auth });

    const emailLines = [
      `To: ${to}`,
      `Subject: ${template.subject}`,
      `Content-Type: text/html; charset=utf-8`,
      ``,
      template.html,
    ].join("\n");

    const encodedEmail = Buffer.from(emailLines)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const result = await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw: encodedEmail },
    });

    return { success: true, messageId: result.data.id ?? undefined };
  } catch (error) {
    console.error("Email sending failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const emailTemplates = {
  communitySignup: (data: { name: string; email: string }) => ({
    subject: "New Community Member - OneUpAI",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>New Community Member - OneUpAI</title></head>
      <body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.6;color:#1e293b;background:#f8fafc;">
        <div style="padding:40px 20px;">
          <div style="max-width:600px;margin:0 auto;background:white;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
            <div style="background:white;padding:30px 30px 20px;text-align:center;border-bottom:1px solid #f1f5f9;">
              <img src="https://oneupai.com/images/logo.svg" alt="OneUpAI" style="height:40px;width:auto;margin-bottom:20px;">
              <h1 style="color:#1e293b;margin:0;font-size:24px;font-weight:600;">New Community Member</h1>
              <p style="color:#64748b;margin:8px 0 0;font-size:16px;">Someone just joined your community</p>
            </div>
            <div style="padding:30px;">
              <table style="width:100%;border-collapse:collapse;font-size:15px;">
                <tr><td style="padding:10px 12px;color:#64748b;width:100px;">Name</td><td style="padding:10px 12px;font-weight:600;color:#1e293b;">${data.name}</td></tr>
                <tr style="background:#f8fafc;"><td style="padding:10px 12px;color:#64748b;">Email</td><td style="padding:10px 12px;color:#1e293b;">${data.email}</td></tr>
                <tr><td style="padding:10px 12px;color:#64748b;">Joined</td><td style="padding:10px 12px;color:#1e293b;">${new Date().toLocaleString("en-CA", { timeZone: "America/Toronto" })} EST</td></tr>
              </table>
              <div style="margin-top:24px;text-align:center;">
                <a href="mailto:${data.email}" style="display:inline-block;background:#2563eb;color:white;padding:12px 24px;text-decoration:none;border-radius:100px;font-weight:600;font-size:14px;">Send Welcome Email</a>
              </div>
            </div>
            <div style="background:#f8fafc;padding:16px 30px;text-align:center;border-top:1px solid #e2e8f0;">
              <p style="color:#94a3b8;font-size:12px;margin:0;">OneUpAI Admin Notification</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  salesInquiry: (data: { name: string; email: string; message: string }) => ({
    subject: "New Sales Inquiry - OneUpAI",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>New Sales Inquiry - OneUpAI</title></head>
      <body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.6;color:#1e293b;background:#f8fafc;">
        <div style="padding:40px 20px;">
          <div style="max-width:600px;margin:0 auto;background:white;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
            <div style="background:white;padding:30px 30px 20px;text-align:center;border-bottom:1px solid #f1f5f9;">
              <img src="https://oneupai.com/images/logo.svg" alt="OneUpAI" style="height:40px;width:auto;margin-bottom:20px;">
              <h1 style="color:#1e293b;margin:0;font-size:24px;font-weight:600;">New Sales Inquiry</h1>
              <p style="color:#64748b;margin:8px 0 0;font-size:16px;">A potential customer wants to talk</p>
            </div>
            <div style="padding:30px;">
              <table style="width:100%;border-collapse:collapse;font-size:15px;">
                <tr><td style="padding:10px 12px;color:#64748b;width:100px;">Name</td><td style="padding:10px 12px;font-weight:600;color:#1e293b;">${data.name}</td></tr>
                <tr style="background:#f8fafc;"><td style="padding:10px 12px;color:#64748b;">Email</td><td style="padding:10px 12px;color:#1e293b;">${data.email}</td></tr>
                <tr><td style="padding:10px 12px;color:#64748b;">Time</td><td style="padding:10px 12px;color:#1e293b;">${new Date().toLocaleString("en-CA", { timeZone: "America/Toronto" })} EST</td></tr>
              </table>
              <div style="margin-top:20px;padding:16px;background:#f0f9ff;border-radius:10px;border-left:4px solid #2563eb;">
                <p style="color:#64748b;margin:0 0 8px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
                <p style="color:#1e293b;margin:0;font-size:15px;line-height:1.6;white-space:pre-wrap;">${data.message}</p>
              </div>
              <div style="margin-top:24px;text-align:center;">
                <a href="mailto:${data.email}" style="display:inline-block;background:#2563eb;color:white;padding:12px 24px;text-decoration:none;border-radius:100px;font-weight:600;font-size:14px;">Reply via Email</a>
              </div>
            </div>
            <div style="background:#f8fafc;padding:16px 30px;text-align:center;border-top:1px solid #e2e8f0;">
              <p style="color:#94a3b8;font-size:12px;margin:0;">OneUpAI Sales Notification</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  communityConfirmation: (data: { name: string; email: string }) => ({
    subject: "Welcome to the OneUpAI Community!",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Welcome to OneUpAI</title></head>
      <body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.6;color:#1e293b;background:#f8fafc;">
        <div style="padding:40px 20px;">
          <div style="max-width:600px;margin:0 auto;background:white;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
            <div style="background:white;padding:40px 30px 30px;text-align:center;border-bottom:1px solid #f1f5f9;">
              <img src="https://oneupai.com/images/logo.svg" alt="OneUpAI" style="height:40px;width:auto;margin-bottom:20px;">
              <h1 style="color:#1e293b;margin:0;font-size:28px;font-weight:600;">Welcome to OneUpAI!</h1>
              <p style="color:#64748b;margin:12px 0 0;font-size:18px;">Hi ${data.name}, you&apos;re in!</p>
            </div>
            <div style="padding:36px 30px;">
              <p style="color:#64748b;font-size:16px;line-height:1.6;margin:0 0 24px;">Thanks for joining. You now have free access to learning resources, ready-made tools, and a support community to help your business grow.</p>
              <div style="text-align:center;margin:32px 0;">
                <a href="https://dashboard.oneupai.com/onboard" style="display:inline-block;background:#2563eb;color:white;padding:14px 32px;text-decoration:none;border-radius:100px;font-weight:600;font-size:16px;">Get Started with OneUpAI</a>
              </div>
              <p style="color:#94a3b8;font-size:14px;text-align:center;margin:0;">Questions? Email <a href="mailto:start@oneupai.com" style="color:#2563eb;text-decoration:none;">start@oneupai.com</a></p>
            </div>
            <div style="background:#f8fafc;padding:16px 30px;text-align:center;border-top:1px solid #e2e8f0;">
              <p style="color:#94a3b8;font-size:12px;margin:0;">© 2024 OneUpAI. Helping businesses grow with AI.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  salesConfirmation: (data: { name: string; email: string; message: string }) => ({
    subject: "Thanks for reaching out! We'll be in touch soon",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Message Received - OneUpAI</title></head>
      <body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.6;color:#1e293b;background:#f8fafc;">
        <div style="padding:40px 20px;">
          <div style="max-width:600px;margin:0 auto;background:white;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
            <div style="background:white;padding:40px 30px 30px;text-align:center;border-bottom:1px solid #f1f5f9;">
              <img src="https://oneupai.com/images/logo.svg" alt="OneUpAI" style="height:40px;width:auto;margin-bottom:20px;">
              <h1 style="color:#1e293b;margin:0;font-size:28px;font-weight:600;">Message Received!</h1>
              <p style="color:#64748b;margin:12px 0 0;font-size:18px;">Hi ${data.name}, thanks for reaching out!</p>
            </div>
            <div style="padding:36px 30px;">
              <div style="padding:16px;background:#f0f9ff;border-radius:10px;border-left:4px solid #2563eb;margin-bottom:24px;">
                <p style="color:#64748b;margin:0 0 8px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Your Message</p>
                <p style="color:#1e293b;margin:0;font-size:15px;line-height:1.6;font-style:italic;">"${data.message}"</p>
              </div>
              <p style="color:#64748b;font-size:16px;line-height:1.6;margin:0 0 24px;">Our team will review your message and get back to you <strong style="color:#1e293b;">within a few hours</strong> to schedule a call.</p>
              <p style="color:#94a3b8;font-size:14px;text-align:center;margin:0;">Questions? Email <a href="mailto:start@oneupai.com" style="color:#2563eb;text-decoration:none;">start@oneupai.com</a></p>
            </div>
            <div style="background:#f8fafc;padding:16px 30px;text-align:center;border-top:1px solid #e2e8f0;">
              <p style="color:#94a3b8;font-size:12px;margin:0;">© 2024 OneUpAI. Helping businesses grow with AI.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  }),
};
