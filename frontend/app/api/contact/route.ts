export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    // Your verified Resend email
    const registeredAccountEmail = process.env.ADMIN_EMAIL || 'avinaashavi1212@gmail.com';

    // 1. Send Confirmation Email 
    // (In local dev, send to registeredAccountEmail so Resend doesn't throw 403)
    const userEmailPromise = resend.emails.send({
      from: 'Toolverse Support <onboarding@resend.dev>',
      to: registeredAccountEmail, 
      subject: `[Copy for User ${email}] Confirmation: We received your message!`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="color: #6d28d9; margin-top: 0;">Hello ${name},</h2>
          <p style="font-size: 14px; line-height: 1.6;">Thank you for contacting Toolverse! Your message was submitted successfully and our team will get back to you shortly.</p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          
          <h3 style="font-size: 14px; color: #475569; margin-bottom: 8px;">Summary of your submission:</h3>
          <p style="font-size: 13px; color: #64748b; margin: 4px 0;"><strong>User Email:</strong> ${email}</p>
          <p style="font-size: 13px; color: #64748b; margin: 4px 0;"><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
          <div style="background: #f8fafc; padding: 15px; border-left: 4px solid #6d28d9; border-radius: 4px; font-size: 13px; color: #334155; margin-top: 8px;">
            ${message}
          </div>
        </div>
      `,
    });

    // 2. Send Alert Notification Email to the Admin
    const adminEmailPromise = resend.emails.send({
      from: 'Toolverse Contact Form <onboarding@resend.dev>',
      to: registeredAccountEmail,
      subject: `🚨 New Contact Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="color: #6d28d9; margin-top: 0;">New User Inquiry Received</h2>
          <p style="font-size: 14px;">A visitor submitted a new message on the contact page.</p>
          
          <table style="width: 100%; text-align: left; border-collapse: collapse; margin: 15px 0; font-size: 13px;">
            <tr>
              <th style="padding: 8px; border-bottom: 1px solid #e2e8f0; width: 30%; color: #64748b;">User Name</th>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <th style="padding: 8px; border-bottom: 1px solid #e2e8f0; color: #64748b;">User Email</th>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">${email}</td>
            </tr>
            <tr>
              <th style="padding: 8px; border-bottom: 1px solid #e2e8f0; color: #64748b;">Subject</th>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${subject || 'N/A'}</td>
            </tr>
          </table>

          <h3 style="font-size: 14px; color: #475569; margin-top: 20px;">Submitted Message:</h3>
          <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; font-size: 13px; color: #1e293b; line-height: 1.5;">
            ${message}
          </div>
        </div>
      `,
    });

    await Promise.all([userEmailPromise, adminEmailPromise]);

    return NextResponse.json({
      success: true,
      message: 'Your message was submitted successfully!',
    });
  } catch (error: unknown) {
    console.error('🔴 RESEND API ERROR:', error);
    const msg = error instanceof Error ? error.message : 'Failed to dispatch email messages.';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}