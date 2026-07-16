import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/config/db';
import { User } from '@/models/User';




export async function GET() {
  try {
    
    await connectToDatabase();
    return NextResponse.json({ 
      status: "Connected", 
      message: "Database pipeline is open and healthy!" 
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Connection error";
    return NextResponse.json({ status: "Error", error: msg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Missing email address or password parameter.' }, 
        { status: 400 }
      );
    }

    // Look for the target administrator record
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid authentication credentials provided.' }, 
        { status: 401 }
      );
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid authentication credentials provided.' }, 
        { status: 401 }
      );
    }

    
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    
    const response = NextResponse.json(
      { success: true, message: 'Authentication verification sequence successful.' },
      { status: 200 }
    );

    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // Exact 24-hour expiration duration match
      path: '/',
    });

    return response;

  } catch (error: unknown) {
    console.error('Auth handler thread runtime error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error occurring during processing.' }, 
      { status: 500 }
    );
  }
}