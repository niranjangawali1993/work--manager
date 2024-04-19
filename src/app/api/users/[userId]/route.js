import { User } from '@/app/models/user';
import { NextResponse } from 'next/server';

export const DELETE = async (request, { params }) => {
  try {
    const userId = params.userId;
    const user = await User.findOneAndDelete(userId);
    return NextResponse.json({
      message: `deleted the use with id ${userId}!!!`,
      data: user,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      message: 'Failed to create user !!!',
      status: false,
    });
  }
};

export const GET = async (request, { params }) => {
  try {
    const userId = params.userId;
    const user = await User.findOne({ _id: userId });
    return NextResponse.json({
      message: `Getting user details by id ${userId}`,
      data: user,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      message: 'Failed to create user !!!',
      status: false,
    });
  }
};

export const PUT = async (request, { params }) => {
  const userId = params.userId;
  const { name, password, about, profileURL } = await request.json();
  try {
    const user = await User.findById(userId);
    user.name = name;
    user.password = password;
    user.about = about;
    user.profileURL = profileURL;

    const updatedUser = await user.save();
    return NextResponse.json({
      message: `Updated user for id ${userId}`,
      data: updatedUser,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      message: 'Failed to update user !!!',
      status: false,
    });
  }
};
