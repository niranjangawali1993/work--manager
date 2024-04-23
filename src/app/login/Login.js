'use client';

import Image from 'next/image';
import loginSVG from './../../assets/login.svg';
import { useContext, useState } from 'react';
import { login } from '@/services/userService';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import UserContext from '../context/userContext';

const Login = () => {
  const router = useRouter();
  const context = useContext(UserContext);
  const { setUser } = context;

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const submitForm = async (e) => {
    try {
      e.preventDefault();
      if (data.email.trim() == '' || data.email == null) {
        toast.warning('Email is required field !!!');
        return;
      }

      if (data.password.trim() == '' || data.password == null) {
        toast.warning('Password is required field !!!');
        return;
      }

      const result = await login(data);
      setUser(result.user);

      toast('User logged in successfully !!!', {
        position: 'top-center',
      });
      resetForm(e);
      router.push('/profile/user');
      return;
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const resetForm = (e) => {
    e.preventDefault();
    setData({
      email: '',
      password: '',
    });
  };

  const onInputChange = (e, fieldName) => {
    e.preventDefault();
    setData({ ...data, [fieldName]: e.target.value });
  };

  return (
    <div className='grid grid-cols-12 justify-center'>
      <div className='col-span-4 col-start-5 p-5 border-r-emerald-300'>
        <div className='my-8 flex justify-center'>
          <Image
            src={loginSVG}
            alt='Login page'
            style={{
              width: '50%',
            }}
          />
        </div>
        <div className='py-5'>
          <h1 className='text-2xl text-center'>Login Here</h1>
          <form action='#!' className='mt-5' onSubmit={submitForm}>
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

            <div className='mt-3 flex justify-around'>
              <button
                type='submit'
                className='bg-blue-600 py-2 px-3 rounded-lg hover:bg-blue-800'
              >
                Login
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

export default Login;
