import { Task } from '@/app/models/task';
import { connectDb } from '@/helper/db';
import { getResponseMessage } from '@/helper/responseMesssage';
import { NextResponse } from 'next/server';

export const GET = async () => {
  let tasks = [];
  try {
    await connectDb();

    tasks = await Task.find({});
    return NextResponse.json({
      message: 'Tasks found !!!',
      data: tasks,
    });
  } catch (err) {
    console.error(err);
    return getResponseMessage('Failed to get tasks', 401, false);
  }
};

export const POST = async (request) => {
  try {
    await connectDb();

    const reqBody = await request.json();
    const newTask = new Task(reqBody);
    const createdTask = await newTask.save();
    return NextResponse.json(createdTask, {
      status: 201,
    });
  } catch (err) {
    console.error(err);
    return getResponseMessage('Failed to create task', 401, false);
  }
};
