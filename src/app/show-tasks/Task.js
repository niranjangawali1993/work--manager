'use client';
import React, { useContext } from 'react';
import UserContext from '../context/userContext';
import { MdDeleteOutline } from 'react-icons/md';
import Swal from 'sweetalert2';

const Task = ({ task, deleteTaskById }) => {
  const context = useContext(UserContext);
  const { user } = context;

  const deleteSelectedTask = (taskId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTaskById(taskId);

        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
      }
    });
  };

  return (
    <div
      className={`${
        task.status === 'completed' ? 'bg-green-800' : 'bg-gray-800'
      }  shadow-lg mt-5 mb-4 rounded-md grid`}
    >
      <div className='p-5'>
        <div className='flex justify-between'>
          <h1 className='text-2xl font-semibold'>{task.title}</h1>
          <button onClick={() => deleteSelectedTask(task._id)}>
            <MdDeleteOutline className='shadow-lg' cursor='pointer' />
          </button>
        </div>
        <p className='font-normal'>{task.content}</p>
        <div className='flex justify-between'>
          <p className='text-left'>
            Task Status : <span className='font-bold'>{task.status}</span>
          </p>
          <p className='text-right'>
            Author : <span className='font-bold'>{user?.name}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Task;
