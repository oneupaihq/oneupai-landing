import nodemailer from 'nodemailer';

// Email configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD, // Use App Password, not regular password
    },
  });
};

// Email templates
export const emailTemplates = {
  communitySignup: (data: { name: string; email: string }) => ({
    subject: 'New Community Member - OneUpAI',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1A80E7;">New Community Signup</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">This email was sent from OneUpAI landing page community signup form.</p>
      </div>
    `,
  }),
  
  salesInquiry: (data: { name: string; email: string; message: string }) => ({
    subject: 'New Sales Inquiry - OneUpAI',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1A80E7;">New Sales Inquiry</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
          ${data.message.replace(/\n/g, '<br>')}
        </div>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">This email was sent from OneUpAI landing page sales inquiry form.</p>
      </div>
    `,
  }),
};

// Send email function
export async function sendEmail(
  to: string,
  template: { subject: string; html: string }
) {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"OneUpAI" <${process.env.GMAIL_USER}>`,
      to,
      subject: template.subject,
      html: template.html,
    };

    const result = await transporter.sendMail(mailOptions);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}