import { NextResponse } from 'next/server';

export async function POST() {
  try {
    
    const response = NextResponse.json(
      { success: true, message: 'Logout sequence executed successfully.' },
      { status: 200 }
    );

   
    response.cookies.set('admin_session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0),
      path: '/',
    });

    return response;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown runtime exception';
    console.error('Logout API execution error thread:', errorMessage);
    
    return NextResponse.json(
      { message: 'Internal Server Error occurring during logout processing.' },
      { status: 500 }
    );
  }
}