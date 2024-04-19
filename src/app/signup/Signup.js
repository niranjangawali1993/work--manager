'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import signupSvg from './../../assets/signup.svg';
import { createUser } from '@/services/userService';
import { toast } from 'react-toastify';

const Signup = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    about: '',
    profileURL:
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/89566ebc-ae66-4173-858c-bdae4ee22eb2/dap48o3-b6df2aed-517b-4feb-96b5-33f0d2677c00.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzg5NTY2ZWJjLWFlNjYtNDE3My04NThjLWJkYWU0ZWUyMmViMlwvZGFwNDhvMy1iNmRmMmFlZC01MTdiLTRmZWItOTZiNS0zM2YwZDI2NzdjMDAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.5-IneqmHJLinXfaDtuwCdTtA6MNeBzwr-LlYQAx-V9I',
  });

  const onInputChange = (e, fieldName) => {
    e.preventDefault();
    setData({ ...data, [fieldName]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      if (data.name.trim() == '' || data.name == null) {
        toast.warning('Name is required field !!!');
        return;
      }

      if (data.email.trim() == '' || data.email == null) {
        toast.warning('Email is required field !!!');
        return;
      }

      if (data.password.trim() == '' || data.password == null) {
        toast.warning('Password is required field !!!');
        return;
      }

      if (data.about.trim() == '' || data.about == null) {
        toast.warning('About is required field !!!');
        return;
      }

      const result = await createUser(data);
      console.log(result);
      toast('User created successfully !!!', {
        position: 'top-center',
      });
      resetForm(e);
    } catch (error) {
      console.error(error);
      toast.error('User not added !!!');
    }
  };

  const resetForm = (e) => {
    e.preventDefault();
    setData({
      name: '',
      email: '',
      password: '',
      about: '',
      profileURL:
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/89566ebc-ae66-4173-858c-bdae4ee22eb2/dap48o3-b6df2aed-517b-4feb-96b5-33f0d2677c00.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzg5NTY2ZWJjLWFlNjYtNDE3My04NThjLWJkYWU0ZWUyMmViMlwvZGFwNDhvMy1iNmRmMmFlZC01MTdiLTRmZWItOTZiNS0zM2YwZDI2NzdjMDAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.5-IneqmHJLinXfaDtuwCdTtA6MNeBzwr-LlYQAx-V9I',
    });
  };

  return (
    <div className='grid grid-cols-12 justify-center'>
      <div className='col-span-4 col-start-5 p-5 border-r-emerald-300'>
        <div className='my-8 flex justify-center'>
          <Image
            src={signupSvg}
            alt='Demo'
            style={{
              width: '50%',
            }}
          />
        </div>
        <div className='py-5'>
          <h1 className='text-2xl text-center'>Signup Here</h1>
          <form action='#!' className='mt-5' onSubmit={submitForm}>
            {/* Username */}
            <div className='mt-3'>
              <label
                htmlFor='user_name'
                className='block text-sm font-medium mb-2 ps-3'
              >
                Name
              </label>
              <input
                id='user_name'
                type='text'
                className='w-full p-3 rounded-2xl bg-gray-800 focus:ring-gray-100 border border-gray-800'
                placeholder='Enter your username'
                onChange={(e) => onInputChange(e, 'name')}
                value={data?.name}
              />
            </div>

            {/* Email */}
            <div className='mt-3'>
              <label
                htmlFor='user_email'
                className='block text-sm font-medium mb-2 ps-3'
              >
                Email
              </label>
              <input
                id='user_email'
                type='text'
                className='w-full p-3 rounded-2xl bg-gray-800 focus:ring-gray-100 border border-gray-800'
                placeholder='Enter your email'
                onChange={(e) => onInputChange(e, 'email')}
                value={data?.email}
              />
            </div>

            {/* Password */}
            <div className='mt-3'>
              <label
                htmlFor='user_password'
                className='block text-sm font-medium mb-2 ps-3'
              >
                Password
              </label>
              <input
                id='user_password'
                type='password'
                className='w-full p-3 rounded-2xl bg-gray-800 focus:ring-gray-100 border border-gray-800'
                placeholder='Enter your password'
                onChange={(e) => onInputChange(e, 'password')}
                value={data?.password}
              />
            </div>

            {/* About */}
            <div className='mt-3'>
              <label
                htmlFor='user_about'
                className='block text-sm font-medium mb-2 ps-3'
              >
                About
              </label>
              <textarea
                id='user_about'
                type='text'
                className='w-full p-3 rounded-2xl bg-gray-800 focus:ring-gray-100 border border-gray-800'
                placeholder='Enter about'
                onChange={(e) => onInputChange(e, 'about')}
                rows={5}
                value={data?.about}
              ></textarea>
            </div>

            <div className='mt-3 flex justify-around'>
              <button
                type='submit'
                className='bg-blue-600 py-2 px-3 rounded-lg hover:bg-blue-800'
              >
                Signup
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
    </div>
  );
};

export default Signup;
