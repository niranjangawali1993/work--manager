import { NextResponse } from 'next/server';
import { connectDb } from '@/helper/db';

connectDb();

export const GET = async (request) => {
  try {
    const response = NextResponse.json({
      message: 'Logged out !!!',
      status: true,
    });

    response.cookies.set('loginToken', '', {
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: 'Failed to logout user !!!',
      status: false,
    });
  }
};
