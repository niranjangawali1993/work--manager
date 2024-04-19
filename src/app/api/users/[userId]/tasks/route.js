import { Task } from '@/app/models/task';
import { getResponseMessage } from '@/helper/responseMesssage';
import { NextResponse } from 'next/server';

export const GET = async (request, { params }) => {
  try {
    const userId = params.userId;
    const tasks = await Task.find({ userId: userId });
    console.log(tasks);
    if (tasks.length == 0)
      return getResponseMessage('No tasks found!!!', 404, false);

    return NextResponse.json({
      message: `Getting tasks by userId ${userId}`,
      data: tasks,
    });
  } catch (err) {
    console.error(err);
    getResponseMessage('Error while fetching user tasks', 401, false);
  }
};
