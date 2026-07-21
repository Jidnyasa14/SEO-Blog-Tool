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
        { message: 'Missing email address or password parameter.' }, 
        { status: 400 }
      );
    }

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

    
    if (user.role !== 'admin') {
      return NextResponse.json(
        { message: 'Unauthorized. Regular users cannot access this ecosystem.' }, 
        { status: 403 }
      );
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    const response = NextResponse.json(
      { success: true, message: 'Authentication successful.' },
      { status: 200 }
    );

    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return response;

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown runtime exception';
    console.error('Auth handler runtime error:', errorMessage);
    
    return NextResponse.json(
      { message: 'Internal Server Error occurring during processing.' }, 
      { status: 500 }
    );
  }
}

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
//         { message: 'Missing email address or password parameter.' }, 
//         { status: 400 }
//       );
//     }

    
//     const user = await User.findOne({ email: email.toLowerCase() });
//     if (!user) {
//       return NextResponse.json(
//         { message: 'Invalid authentication credentials provided.' }, 
//         { status: 401 }
//       );
//     }

    
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return NextResponse.json(
//         { message: 'Invalid authentication credentials provided.' }, 
//         { status: 401 }
//       );
//     }

    
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET as string,
//       { expiresIn: '1d' }
//     );

    
//     const response = NextResponse.json(
//       { success: true, message: 'Authentication successful.' },
//       { status: 200 }
//     );

//     response.cookies.set('admin_session', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       maxAge: 60 * 60 * 24,
//       path: '/',
//     });

//     return response;

//   } catch (error: unknown) {
//     const errorMessage = error instanceof Error ? error.message : 'Unknown runtime exception';
//     console.error('Auth handler runtime error:', errorMessage);
    
//     return NextResponse.json(
//       { message: 'Internal Server Error occurring during processing.' }, 
//       { status: 500 }
//     );
//   }
// }