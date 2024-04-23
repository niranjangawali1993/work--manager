import { User } from '@/app/models/user';
import { connectDb } from '@/helper/db';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export const GET = async (request) => {
  try {
    await connectDb();

    const loginToken = request.cookies.get('loginToken')?.value;
    if (!loginToken) {
      return NextResponse.json({
        message: 'User is not logged in !!!',
      });
    }
    const userInfo = jwt.verify(loginToken, process.env.JWT_KEY);
    let user = undefined;
    if (userInfo)
      user = await User.findOne({ _id: userInfo._id }).select('-password');

    return NextResponse.json({
      message: 'Current user details found !!!',
      user: user,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: 'Failed to get user data !!!',
      status: false,
    });
  }
};
