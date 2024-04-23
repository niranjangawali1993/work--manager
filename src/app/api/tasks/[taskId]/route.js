import { Task } from '@/app/models/task';
import { getResponseMessage } from '@/helper/responseMesssage';
import { NextResponse } from 'next/server';
import { connectDb } from '@/helper/db';

export const GET = async (request, { params }) => {
  try {
    await connectDb();

    const taskId = params.taskId;
    const selectedTask = await Task.findOne({ _id: taskId });
    return NextResponse.json({
      message: `Getting task details by id ${taskId}`,
      data: selectedTask,
    });
  } catch (err) {
    console.error(err);
    return getResponseMessage('Failed to fetch task', 400, false);
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectDb();

    const taskId = params.taskId;
    const deletedTask = await Task.findOneAndDelete(taskId);
    return NextResponse.json({
      message: `Deleting task details by id ${taskId}`,
      data: deletedTask,
      status: true,
    });
  } catch (err) {
    console.error(err);
    return getResponseMessage('Failed to delete task', 500, false);
  }
};

export const PUT = async (request, { params }) => {
  const taskId = params.taskId;
  const { title, content, status } = await request.json();
  try {
    await connectDb();

    const task = await Task.findById(taskId);
    task.title = title;
    task.content = content;
    task.status = status;

    const updatedTask = await task.save();
    return NextResponse.json({
      message: `Updated Task for id ${taskId}`,
      data: updatedTask,
    });
  } catch (err) {
    console.error(err);
    return getResponseMessage('Failed to update task', 500, false);
  }
};
