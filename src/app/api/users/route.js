import { User } from '@/app/models/user';
import { connectDb } from '@/helper/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
connectDb();

export const GET = async () => {
  let users = [];
  try {
    users = await User.find({}).select('-password');
    return NextResponse.json({
      message: 'User details found !!!',
      data: users,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      message: 'Failed to fetch users!!!',
      status: false,
    });
  }
};

export const POST = async (request) => {
  try {
    const userBody = await request.json();
    const { name, email, password, about, profileURL } = userBody;
    const newUser = new User({ name, email, password, about, profileURL });
    newUser.password = await bcrypt.hash(
      newUser.password,
      parseInt(process.env.BCRYPT_SALT)
    );
    const createdUser = await newUser.save();
    return NextResponse.json(createdUser, {
      status: 201,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      message: 'Failed to create user !!!',
      status: false,
    });
  }
};
