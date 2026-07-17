import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/config/db';
import { User } from '@/models/User';

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const { name, email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required parameters.' },
        { status: 400 }
      );
    }

    // 1. Check if the user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'An account with this email address already exists.' },
        { status: 400 }
      );
    }

    // 2. Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create the user record
    const newAdmin = await User.create({
      name: name || '',
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'admin',
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Account successfully registered!',
        userId: newAdmin._id 
      },
      { status: 201 }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown runtime exception';
    console.error('Signup API handler thread error:', errorMessage);

    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}