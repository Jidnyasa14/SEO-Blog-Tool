import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = async (toEmail: string): Promise<boolean> => {
  try {
    await resend.emails.send({
      from: 'Toolverse Studio <onboarding@resend.dev>', // Your custom domain once verified
      to: [toEmail],
      subject: 'Welcome to our platform 🚀',
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
          <h2 style="color: #7c3aed;">Welcome 🎉</h2>
          <p>Your admin account has been created successfully.</p>
          <p>Glad to have you onboard 🚀</p>
        </div>
      `
    });
    return true;
  } catch (error) {
    console.error("❌ Email error:", error);
    return false;
  }
};