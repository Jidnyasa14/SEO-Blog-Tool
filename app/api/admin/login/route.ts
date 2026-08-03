export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/config/db';
import { User } from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'toolverse_admin_secret_key_2026';

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    
    
    const adminUser = await User.findOne({ email: cleanEmail });

    if (!adminUser) {
      return NextResponse.json(
        { success: false, message: 'Invalid admin credentials.' },
        { status: 401 }
      );
    }

    // Compare entered password with hashed password stored in MongoDB
    const isMatch = await bcrypt.compare(password, adminUser.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Invalid admin credentials.' },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: adminUser._id, email: adminUser.email, role: adminUser.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const response = NextResponse.json(
      { success: true, message: 'Admin authenticated successfully.' },
      { status: 200 }
    );

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error: unknown) {
    console.error('🔴 Admin Login Exception:', error);
    return NextResponse.json(
      { success: false, message: 'An exception occurred during authentication.' },
      { status: 500 }
    );
  }
}