import { User } from '@/app/models/user';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectDb } from '@/helper/db';

export const POST = async (request) => {
  try {
    await connectDb();

    const { email, password } = await request.json();
    const selectedUser = await User.findOne({ email: email });

    if (selectedUser === null) {
      throw new Error('User not found !!!');
    }

    const matched = bcrypt.compareSync(password, selectedUser.password);

    if (!matched) {
      throw new Error('Incorrect password provided !!!');
    }

    const token = jwt.sign(
      { _id: selectedUser._id, name: selectedUser.name },
      process.env.JWT_KEY
    );

    const response = NextResponse.json({
      message: 'User logged in successfully !!!',
      user: selectedUser,
      token: token,
    });

    response.cookies.set('loginToken', token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day in milliseconds
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'Failed to login the user !!!',
        status: false,
      },
      {
        status: 500,
      }
    );
  }
};
