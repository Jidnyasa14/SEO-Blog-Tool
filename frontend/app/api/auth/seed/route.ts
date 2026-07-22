export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/config/db';
import { User } from '@/models/User';

export async function GET() {
  try {
    await connectToDatabase();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        { success: false, message: 'ADMIN_EMAIL or ADMIN_PASSWORD missing in .env file.' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const adminUser = await User.findOneAndUpdate(
      { email: adminEmail.toLowerCase() },
      {
        email: adminEmail.toLowerCase(),
        password: hashedPassword,
        role: 'admin',
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      success: true,
      message: 'Permanent Admin created/updated in MongoDB successfully!',
      email: adminUser.email,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Error seeding admin user';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}