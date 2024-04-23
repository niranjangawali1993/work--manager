'use client';
import React, { useContext, useState } from 'react';
import addTaskSVG from './../../assets/add-task.svg';
import Image from 'next/image';
import { addTask } from '@/services/taskService';
import { toast } from 'react-toastify';
import UserContext from '../context/userContext';

const AddTaskPage = () => {
  const context = useContext(UserContext);

  const [task, setTask] = useState({
    title: '',
    content: '',
    status: 'pending',
    userId: context?.user?._id,
  });

  const onInputChange = (e, fieldName) => {
    e.preventDefault();
    setTask({ ...task, [fieldName]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const result = await addTask(task);
      toast('Task added successfully !!!', {
        position: 'top-center',
      });
      resetForm(e);
    } catch (error) {
      console.error(error);
      toast.error('Task not added !!!');
    }
  };

  const resetForm = (e) => {
    e.preventDefault();
    setTask({
      title: '',
      content: '',
      status: 'pending',
    });
  };

  return (
    <div className='grid grid-cols-12 justify-center'>
      <div className='col-span-4 col-start-5 border-red-400 p-5 shadow-sm'>
        <div className='my-8 flex justify-center'>
          <Image
            src={addTaskSVG}
            alt='Demo'
            style={{
              width: '50%',
            }}
          />
        </div>
        <h1 className='text-2xl mb-4'>Add your task here !!!</h1>
        <form action='' onSubmit={submitForm}>
          {/* task title */}
          <div className='mt4'>
            <label
              htmlFor='task_title'
              className='block text-sm font-medium mb-2'
            >
              Title
            </label>
            <input
              type='text'
              id='task_title'
              name='task_title'
              className='w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-100 border border-gray-800'
              onChange={(e) => onInputChange(e, 'title')}
              value={task?.title}
            />
          </div>

          {/* task content */}
          <div className='mt4'>
            <label
              htmlFor='task_content'
              className='block text-sm font-medium mb-2'
            >
              Content
            </label>
            <textarea
              type='text'
              id='task_content'
              name='task_content'
              className='w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-100 border border-gray-800'
              rows={5}
              onChange={(e) => onInputChange(e, 'content')}
              value={task?.content}
            ></textarea>
          </div>

          {/* task status */}
          <div className='mt4'>
            <label
              htmlFor='task_status'
              className='block text-sm font-medium mb-2'
            >
              Status
            </label>
            <select
              id='task_status'
              name='task_status'
              className='w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-100 border border-gray-800'
              onChange={(e) => onInputChange(e, 'status')}
              value={task?.status}
            >
              <option defaultValue='none' disabled>
                --- Select status ---
              </option>
              <option value='pending'>Pending</option>
              <option value='completed'>Completed</option>
            </select>
          </div>
          {/* button actions  */}
          <div className='mt-4 flex justify-around'>
            <button
              className='bg-blue-600 py-2 px-3 rounded-lg hover:bg-blue-800'
              type='submit'
            >
              Add Todo
            </button>
            <button
              className='bg-red-600 py-2 px-3 rounded-lg hover:bg-red-800'
              onClick={resetForm}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskPage;
