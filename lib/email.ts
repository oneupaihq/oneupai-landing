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
    subject: 'New Community Member - OneUpAI 🎉',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Community Member - OneUpAI</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 30px; text-align: center;">
              <div style="background: white; width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 20px rgba(0,0,0,0.1);">
                <span style="font-size: 32px;">👥</span>
              </div>
              <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">New Community Member!</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 18px; font-weight: 300;">Someone just joined the OneUpAI community 🚀</p>
            </div>

            <!-- Main Content -->
            <div style="padding: 40px 30px;">
              
              <!-- Member Info Card -->
              <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 25px; border-radius: 12px; margin-bottom: 30px; border-left: 4px solid #10b981;">
                <h3 style="color: #1e293b; margin: 0 0 20px; font-size: 20px; font-weight: 600;">📋 Member Details</h3>
                
                <div style="display: table; width: 100%; margin-bottom: 15px;">
                  <div style="display: table-cell; width: 80px; vertical-align: top; padding-right: 15px;">
                    <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #1A80E7 0%, #00C48C 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                      <span style="color: white; font-size: 20px;">👤</span>
                    </div>
                  </div>
                  <div style="display: table-cell; vertical-align: top;">
                    <h4 style="color: #1e293b; margin: 0 0 5px; font-size: 18px; font-weight: 600;">${data.name}</h4>
                    <p style="color: #64748b; margin: 0; font-size: 14px;">New community member</p>
                  </div>
                </div>

                <div style="display: table; width: 100%; margin-bottom: 15px;">
                  <div style="display: table-cell; width: 80px; vertical-align: top; padding-right: 15px;">
                    <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                      <span style="color: white; font-size: 20px;">📧</span>
                    </div>
                  </div>
                  <div style="display: table-cell; vertical-align: top;">
                    <h4 style="color: #1e293b; margin: 0 0 5px; font-size: 18px; font-weight: 600;">${data.email}</h4>
                    <p style="color: #64748b; margin: 0; font-size: 14px;">Contact email address</p>
                  </div>
                </div>

                <div style="display: table; width: 100%;">
                  <div style="display: table-cell; width: 80px; vertical-align: top; padding-right: 15px;">
                    <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                      <span style="color: white; font-size: 20px;">⏰</span>
                    </div>
                  </div>
                  <div style="display: table-cell; vertical-align: top;">
                    <h4 style="color: #1e293b; margin: 0 0 5px; font-size: 18px; font-weight: 600;">${new Date().toLocaleString()}</h4>
                    <p style="color: #64748b; margin: 0; font-size: 14px;">Signup timestamp</p>
                  </div>
                </div>
              </div>

              <!-- Quick Actions -->
              <div style="background: linear-gradient(135deg, #1A80E7 0%, #00C48C 100%); padding: 25px; border-radius: 12px; margin: 30px 0; text-align: center;">
                <h3 style="color: white; margin: 0 0 15px; font-size: 20px; font-weight: 600;">🎯 Suggested Actions</h3>
                <p style="color: rgba(255,255,255,0.9); margin: 0 0 20px; font-size: 14px;">Consider reaching out to welcome them personally or add them to your email sequences.</p>
                <a href="mailto:${data.email}" style="display: inline-block; background: white; color: #1A80E7; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: 600; font-size: 14px; margin-right: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                  📧 Send Welcome Email
                </a>
              </div>

              <!-- Stats Box -->
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; text-align: center; border: 1px solid #e2e8f0;">
                <p style="color: #64748b; margin: 0; font-size: 14px;">
                  🎉 <strong>Community Growth:</strong> Keep building your audience with valuable content and engagement!
                </p>
              </div>
            </div>

            <!-- Bottom Brand Bar -->
            <div style="background: #f8fafc; padding: 20px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                OneUpAI Admin Notification • Sent from your landing page community signup form
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  }),
  
  salesInquiry: (data: { name: string; email: string; message: string }) => ({
    subject: 'New Sales Inquiry - OneUpAI 💼',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Sales Inquiry - OneUpAI</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #dc2626 0%, #ea580c 100%); padding: 40px 30px; text-align: center;">
              <div style="background: white; width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 20px rgba(0,0,0,0.1);">
                <span style="font-size: 32px;">💼</span>
              </div>
              <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">New Sales Inquiry!</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 18px; font-weight: 300;">A potential customer wants to talk 🔥</p>
            </div>

            <!-- Main Content -->
            <div style="padding: 40px 30px;">
              
              <!-- Prospect Info Card -->
              <div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); padding: 25px; border-radius: 12px; margin-bottom: 30px; border-left: 4px solid #dc2626;">
                <h3 style="color: #1e293b; margin: 0 0 20px; font-size: 20px; font-weight: 600;">🎯 Prospect Details</h3>
                
                <div style="display: table; width: 100%; margin-bottom: 15px;">
                  <div style="display: table-cell; width: 80px; vertical-align: top; padding-right: 15px;">
                    <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #1A80E7 0%, #00C48C 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                      <span style="color: white; font-size: 20px;">👤</span>
                    </div>
                  </div>
                  <div style="display: table-cell; vertical-align: top;">
                    <h4 style="color: #1e293b; margin: 0 0 5px; font-size: 18px; font-weight: 600;">${data.name}</h4>
                    <p style="color: #64748b; margin: 0; font-size: 14px;">Potential customer name</p>
                  </div>
                </div>

                <div style="display: table; width: 100%; margin-bottom: 15px;">
                  <div style="display: table-cell; width: 80px; vertical-align: top; padding-right: 15px;">
                    <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                      <span style="color: white; font-size: 20px;">📧</span>
                    </div>
                  </div>
                  <div style="display: table-cell; vertical-align: top;">
                    <h4 style="color: #1e293b; margin: 0 0 5px; font-size: 18px; font-weight: 600;">${data.email}</h4>
                    <p style="color: #64748b; margin: 0; font-size: 14px;">Contact email address</p>
                  </div>
                </div>

                <div style="display: table; width: 100%;">
                  <div style="display: table-cell; width: 80px; vertical-align: top; padding-right: 15px;">
                    <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                      <span style="color: white; font-size: 20px;">⏰</span>
                    </div>
                  </div>
                  <div style="display: table-cell; vertical-align: top;">
                    <h4 style="color: #1e293b; margin: 0 0 5px; font-size: 18px; font-weight: 600;">${new Date().toLocaleString()}</h4>
                    <p style="color: #64748b; margin: 0; font-size: 14px;">Inquiry timestamp</p>
                  </div>
                </div>
              </div>

              <!-- Message Content -->
              <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 25px; border-radius: 12px; margin-bottom: 30px; border-left: 4px solid #1A80E7;">
                <h3 style="color: #1e293b; margin: 0 0 15px; font-size: 18px; font-weight: 600;">💬 Their Message:</h3>
                <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
                  <p style="color: #1e293b; margin: 0; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${data.message}</p>
                </div>
              </div>

              <!-- Action Buttons -->
              <div style="background: linear-gradient(135deg, #1A80E7 0%, #00C48C 100%); padding: 25px; border-radius: 12px; margin: 30px 0; text-align: center;">
                <h3 style="color: white; margin: 0 0 15px; font-size: 20px; font-weight: 600;">⚡ Quick Actions</h3>
                <p style="color: rgba(255,255,255,0.9); margin: 0 0 20px; font-size: 14px;">Respond quickly to convert this lead into a customer!</p>
                
                <div style="margin: 15px 0;">
                  <a href="mailto:${data.email}?subject=Re: Your OneUpAI Inquiry&body=Hi ${data.name},%0D%0A%0D%0AThank you for your interest in OneUpAI! I'd love to discuss how we can help your business grow with AI.%0D%0A%0D%0AWhen would be a good time for a quick 15-minute call?%0D%0A%0D%0ABest regards,%0D%0AOneUpAI Team" style="display: inline-block; background: white; color: #1A80E7; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: 600; font-size: 14px; margin: 5px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                    📧 Reply via Email
                  </a>
                  <a href="tel:${data.email}" style="display: inline-block; background: rgba(255,255,255,0.2); color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: 600; font-size: 14px; margin: 5px; border: 2px solid white;">
                    📞 Call Them
                  </a>
                </div>
              </div>

              <!-- Priority Alert -->
              <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 20px; border-radius: 12px; margin: 30px 0; text-align: center; border: 2px solid #f59e0b;">
                <h4 style="color: #92400e; margin: 0 0 10px; font-size: 16px; font-weight: 600;">🔥 High Priority Lead</h4>
                <p style="color: #92400e; margin: 0; font-size: 14px; line-height: 1.5;">
                  <strong>Recommended Response Time:</strong> Within 2 hours for best conversion rates.<br>
                  Studies show 78% higher conversion when responding within the first hour!
                </p>
              </div>

              <!-- Lead Source -->
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; text-align: center; border: 1px solid #e2e8f0;">
                <p style="color: #64748b; margin: 0; font-size: 14px;">
                  📊 <strong>Lead Source:</strong> OneUpAI Landing Page - Scale Plan "Book a Call" Button
                </p>
              </div>
            </div>

            <!-- Bottom Brand Bar -->
            <div style="background: #f8fafc; padding: 20px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                OneUpAI Sales Notification • Sent from your landing page sales inquiry form
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  // User confirmation templates
  communityConfirmation: (data: { name: string; email: string }) => ({
    subject: 'Welcome to the OneUpAI Community! 🎉',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to OneUpAI</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1A80E7 0%, #00C48C 100%); padding: 40px 30px; text-align: center;">
              <div style="background: white; width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 20px rgba(0,0,0,0.1);">
                <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #1A80E7 0%, #00C48C 100%); border-radius: 50%;"></div>
              </div>
              <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">Welcome to OneUpAI!</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 18px; font-weight: 300;">Hi ${data.name}, you're now part of something amazing! ✨</p>
            </div>

            <!-- Main Content -->
            <div style="padding: 40px 30px;">
              
              <!-- Welcome Message -->
              <div style="text-align: center; margin-bottom: 35px;">
                <h2 style="color: #1e293b; margin: 0 0 15px; font-size: 24px; font-weight: 600;">🚀 You're In!</h2>
                <p style="color: #64748b; margin: 0; font-size: 16px; line-height: 1.6;">Thanks for joining thousands of business owners who are using AI to grow faster and work smarter.</p>
              </div>

              <!-- Benefits Cards -->
              <div style="margin: 30px 0;">
                <h3 style="color: #1e293b; margin: 0 0 20px; font-size: 20px; font-weight: 600; text-align: center;">Here's what you'll get:</h3>
                
                <div style="display: table; width: 100%; margin-bottom: 15px;">
                  <div style="display: table-cell; width: 50px; vertical-align: top; padding-right: 15px;">
                    <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #1A80E7 0%, #00C48C 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                      <span style="color: white; font-size: 18px;">📧</span>
                    </div>
                  </div>
                  <div style="display: table-cell; vertical-align: top;">
                    <h4 style="color: #1e293b; margin: 0 0 5px; font-size: 16px; font-weight: 600;">Weekly AI Tips</h4>
                    <p style="color: #64748b; margin: 0; font-size: 14px; line-height: 1.5;">Actionable strategies to grow your business with AI</p>
                  </div>
                </div>

                <div style="display: table; width: 100%; margin-bottom: 15px;">
                  <div style="display: table-cell; width: 50px; vertical-align: top; padding-right: 15px;">
                    <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #1A80E7 0%, #00C48C 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                      <span style="color: white; font-size: 18px;">🎨</span>
                    </div>
                  </div>
                  <div style="display: table-cell; vertical-align: top;">
                    <h4 style="color: #1e293b; margin: 0 0 5px; font-size: 16px; font-weight: 600;">Free Templates</h4>
                    <p style="color: #64748b; margin: 0; font-size: 14px; line-height: 1.5;">Professional website templates and resources</p>
                  </div>
                </div>

                <div style="display: table; width: 100%; margin-bottom: 15px;">
                  <div style="display: table-cell; width: 50px; vertical-align: top; padding-right: 15px;">
                    <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #1A80E7 0%, #00C48C 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                      <span style="color: white; font-size: 18px;">⚡</span>
                    </div>
                  </div>
                  <div style="display: table-cell; vertical-align: top;">
                    <h4 style="color: #1e293b; margin: 0 0 5px; font-size: 16px; font-weight: 600;">Early Access</h4>
                    <p style="color: #64748b; margin: 0; font-size: 14px; line-height: 1.5;">Be first to try new OneUpAI features</p>
                  </div>
                </div>

                <div style="display: table; width: 100%;">
                  <div style="display: table-cell; width: 50px; vertical-align: top; padding-right: 15px;">
                    <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #1A80E7 0%, #00C48C 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                      <span style="color: white; font-size: 18px;">🎯</span>
                    </div>
                  </div>
                  <div style="display: table-cell; vertical-align: top;">
                    <h4 style="color: #1e293b; margin: 0 0 5px; font-size: 16px; font-weight: 600;">Exclusive Events</h4>
                    <p style="color: #64748b; margin: 0; font-size: 14px; line-height: 1.5;">Community webinars and networking opportunities</p>
                  </div>
                </div>
              </div>

              <!-- CTA Button -->
              <div style="text-align: center; margin: 40px 0 30px;">
                <a href="https://dashboard.oneupai.com/onboard" style="display: inline-block; background: linear-gradient(135deg, #1A80E7 0%, #00C48C 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 16px; box-shadow: 0 8px 20px rgba(26, 128, 231, 0.3); transition: all 0.3s ease;">
                  🚀 Get Started with OneUpAI
                </a>
              </div>

              <!-- Divider -->
              <div style="height: 1px; background: linear-gradient(90deg, transparent 0%, #e2e8f0 50%, transparent 100%); margin: 30px 0;"></div>

              <!-- Footer -->
              <div style="text-align: center;">
                <p style="color: #64748b; font-size: 14px; margin: 0 0 10px;">
                  Questions? We're here to help!
                </p>
                <p style="color: #64748b; font-size: 14px; margin: 0;">
                  Email us at <a href="mailto:start@oneupai.com" style="color: #1A80E7; text-decoration: none; font-weight: 500;">start@oneupai.com</a>
                </p>
              </div>
            </div>

            <!-- Bottom Brand Bar -->
            <div style="background: #f8fafc; padding: 20px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                © 2024 OneUpAI. Helping businesses grow with AI.
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  salesConfirmation: (data: { name: string; email: string; message: string }) => ({
    subject: 'Thanks for reaching out! We\'ll be in touch soon 📞',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Message Received - OneUpAI</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1A80E7 0%, #00C48C 100%); padding: 40px 30px; text-align: center;">
              <div style="background: white; width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 20px rgba(0,0,0,0.1);">
                <span style="font-size: 32px;">📞</span>
              </div>
              <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">Message Received!</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 18px; font-weight: 300;">Hi ${data.name}, thanks for reaching out! 🙌</p>
            </div>

            <!-- Main Content -->
            <div style="padding: 40px 30px;">
              
              <!-- Confirmation Message -->
              <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 25px; border-radius: 12px; margin-bottom: 30px; border-left: 4px solid #1A80E7;">
                <h3 style="color: #1e293b; margin: 0 0 15px; font-size: 18px; font-weight: 600;">✅ Your message has been received</h3>
                <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
                  <p style="color: #64748b; margin: 0 0 10px; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Your Message:</p>
                  <p style="color: #1e293b; margin: 0; font-size: 15px; line-height: 1.6; font-style: italic;">"${data.message}"</p>
                </div>
              </div>

              <!-- Timeline -->
              <div style="background: linear-gradient(135deg, #1A80E7 0%, #00C48C 100%); padding: 25px; border-radius: 12px; margin: 30px 0; text-align: center;">
                <h2 style="color: white; margin: 0 0 15px; font-size: 22px; font-weight: 600;">⏰ What happens next?</h2>
                <p style="color: rgba(255,255,255,0.95); margin: 0; font-size: 16px; line-height: 1.6;">Our team will review your message and get back to you <strong>within a few hours</strong> to schedule a call and discuss how OneUpAI can help your business grow.</p>
              </div>

              <!-- Quick Actions -->
              <div style="margin: 30px 0;">
                <h3 style="color: #1e293b; margin: 0 0 20px; font-size: 20px; font-weight: 600; text-align: center;">While you wait, check these out:</h3>
                
                <div style="display: table; width: 100%; margin-bottom: 15px;">
                  <div style="display: table-cell; width: 50px; vertical-align: top; padding-right: 15px;">
                    <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                      <span style="color: white; font-size: 18px;">📚</span>
                    </div>
                  </div>
                  <div style="display: table-cell; vertical-align: top;">
                    <h4 style="color: #1e293b; margin: 0 0 5px; font-size: 16px; font-weight: 600;">
                      <a href="https://oneupai.com/blog" style="color: #1A80E7; text-decoration: none;">Read Our Blog</a>
                    </h4>
                    <p style="color: #64748b; margin: 0; font-size: 14px; line-height: 1.5;">AI business tips and growth strategies</p>
                  </div>
                </div>

                <div style="display: table; width: 100%; margin-bottom: 15px;">
                  <div style="display: table-cell; width: 50px; vertical-align: top; padding-right: 15px;">
                    <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                      <span style="color: white; font-size: 18px;">🎨</span>
                    </div>
                  </div>
                  <div style="display: table-cell; vertical-align: top;">
                    <h4 style="color: #1e293b; margin: 0 0 5px; font-size: 16px; font-weight: 600;">
                      <a href="https://oneupai.com/#portfolio" style="color: #1A80E7; text-decoration: none;">Browse Templates</a>
                    </h4>
                    <p style="color: #64748b; margin: 0; font-size: 14px; line-height: 1.5;">See our AI-powered website designs</p>
                  </div>
                </div>

                <div style="display: table; width: 100%;">
                  <div style="display: table-cell; width: 50px; vertical-align: top; padding-right: 15px;">
                    <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                      <span style="color: white; font-size: 18px;">👥</span>
                    </div>
                  </div>
                  <div style="display: table-cell; vertical-align: top;">
                    <h4 style="color: #1e293b; margin: 0 0 5px; font-size: 16px; font-weight: 600;">
                      <a href="https://oneupai.com/#community" style="color: #1A80E7; text-decoration: none;">Join Community</a>
                    </h4>
                    <p style="color: #64748b; margin: 0; font-size: 14px; line-height: 1.5;">Connect with other business owners</p>
                  </div>
                </div>
              </div>

              <!-- Urgent Contact -->
              <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 20px; border-radius: 12px; margin: 30px 0; text-align: center; border: 2px solid #f59e0b;">
                <h4 style="color: #92400e; margin: 0 0 10px; font-size: 18px; font-weight: 600;">🔥 Need to talk right now?</h4>
                <p style="color: #92400e; margin: 0 0 15px; font-size: 14px;">Don't wait - call us directly!</p>
                <a href="tel:+18336638724" style="display: inline-block; background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);">
                  📞 1-833-ONEUPAI (663-8724)
                </a>
              </div>

              <!-- Divider -->
              <div style="height: 1px; background: linear-gradient(90deg, transparent 0%, #e2e8f0 50%, transparent 100%); margin: 30px 0;"></div>

              <!-- Footer -->
              <div style="text-align: center;">
                <p style="color: #64748b; font-size: 14px; margin: 0 0 10px;">
                  Questions? We're here to help!
                </p>
                <p style="color: #64748b; font-size: 14px; margin: 0;">
                  Email us at <a href="mailto:start@oneupai.com" style="color: #1A80E7; text-decoration: none; font-weight: 500;">start@oneupai.com</a>
                </p>
              </div>
            </div>

            <!-- Bottom Brand Bar -->
            <div style="background: #f8fafc; padding: 20px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                © 2024 OneUpAI. Helping businesses grow with AI.
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
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