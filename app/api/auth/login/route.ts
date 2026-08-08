// import { NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import { connectToDatabase } from '@/config/db';
// import { User } from '@/models/User';

// export async function POST(request: Request) {
//   try {
//     await connectToDatabase();
    
//     const { email, password } = await request.json();

//     if (!email || !password) {
//       return NextResponse.json(
//         { success: false, message: 'Missing email address or password parameter.' }, 
//         { status: 400 }
//       );
//     }

//     // Sanitize input
//     const cleanEmail = email.trim().toLowerCase();

//     // 1. Find user in MongoDB
//     const user = await User.findOne({ email: cleanEmail });
//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: 'Invalid authentication credentials provided.' }, 
//         { status: 401 }
//       );
//     }

//     // 2. Compare hashed password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return NextResponse.json(
//         { success: false, message: 'Invalid authentication credentials provided.' }, 
//         { status: 401 }
//       );
//     }

//     // 3. Verify admin role
//     if (user.role !== 'admin') {
//       return NextResponse.json(
//         { success: false, message: 'Unauthorized. Regular users cannot access this ecosystem.' }, 
//         { status: 403 }
//       );
//     }

//     // 4. Generate JWT token with fallback secret
//     const jwtSecret = process.env.JWT_SECRET || 'fallback_admin_secret_key_123';
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       jwtSecret,
//       { expiresIn: '1d' }
//     );

//     // 5. Construct JSON response payload
//     const response = NextResponse.json(
//       { 
//         success: true, 
//         message: 'Authentication successful.',
//         token: token,
//         admin: { id: user._id, name: user.name, email: user.email, role: user.role }
//       },
//       { status: 200 }
//     );

//     // 6. Set HTTP-Only session cookie
//     response.cookies.set('admin_session', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'lax',
//       maxAge: 60 * 60 * 24,
//       path: '/',
//     });

//     return response;

//   } catch (error: unknown) {
//     const errorMessage = error instanceof Error ? error.message : 'Unknown runtime exception';
//     console.error('Auth handler runtime error:', errorMessage);
    
//     return NextResponse.json(
//       { success: false, message: 'Internal Server Error occurring during processing.' }, 
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/config/db';
import { User } from '@/models/User';

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Missing email address or password parameter.' }, 
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: cleanEmail });
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid authentication credentials provided.' }, 
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Invalid authentication credentials provided.' }, 
        { status: 401 }
      );
    }

    const jwtSecret = process.env.JWT_SECRET || 'fallback_admin_secret_key_123';
    const token = jwt.sign(
      { id: user._id, role: user.role },
      jwtSecret,
      { expiresIn: '1d' }
    );

    const response = NextResponse.json(
      { 
        success: true, 
        message: 'Authentication successful.',
        token: token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role }
      },
      { status: 200 }
    );

    response.cookies.set('user_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return response;

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown runtime exception';
    console.error('Auth handler runtime error:', errorMessage);
    
    return NextResponse.json(
      { success: false, message: 'Internal Server Error occurring during processing.' }, 
      { status: 500 }
    );
  }
}