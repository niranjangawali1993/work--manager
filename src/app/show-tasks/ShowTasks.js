'use client';
import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../context/userContext';
import { deleteTask, getUserTasks } from '@/services/taskService';
import Task from './Task';

const ShowTasks = () => {
  const context = useContext(UserContext);
  const { user } = context;
  const [tasks, setTasks] = useState([]);

  const getTasks = async (userId) => {
    const output = await getUserTasks(userId);
    setTasks([...output.data].reverse());
  };

  const deleteTaskById = async (taskId) => {
    const result = await deleteTask(taskId);
    if (result.status) {
      let tempTask = tasks.filter((t) => t._id !== taskId);
      setTasks(tempTask);
    }
  };

  useEffect(() => {
    if (context.user) {
      getTasks(user?._id);
    }
  }, [user]);

  return (
    <div className='grid grid-cols-12 mt-3'>
      <div className='col-span-6 col-start-4'>
        <h1 className='text-3xl mt-3'>Your Tasks ({tasks.length})</h1>
        {tasks.map((singleTask) => {
          return (
            <Task
              task={singleTask}
              key={singleTask._id}
              deleteTaskById={deleteTaskById}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ShowTasks;
