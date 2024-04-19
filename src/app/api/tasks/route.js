import { Task } from '@/app/models/task';
import { connectDb } from '@/helper/db';
import { getResponseMessage } from '@/helper/responseMesssage';
import { NextResponse } from 'next/server';
connectDb();

export const GET = async () => {
  let tasks = [];
  try {
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
    const reqBody = await request.json();
    console.log(reqBody);
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
