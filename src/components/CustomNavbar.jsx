'use client';
import UserContext from '@/app/context/userContext';
import { logout } from '@/services/userService';
import Link from 'next/link';
import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';

const CustomNavbar = () => {
  const context = useContext(UserContext);
  const { user, setUser } = context;
  const router = useRouter();

  const doLogout = async () => {
    try {
      const result = await logout();
      console.log(result);
      setUser(undefined);
      if (result.status) {
        router.push('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='bg-blue-600 h-12 py-2 px-4 flex justify-between items-center'>
      <div className='brand'>
        <h1 className='text-2xl font-semibold'>
          <Link href='/'>Work Manager</Link>
        </h1>
      </div>
      <div>
        <ul className='flex space-x-5 text-sm'>
          {user && (
            <>
              <li>
                <Link href={'/'} className='hover:text-blue-200'>
                  Home
                </Link>
              </li>
              <li>
                <Link href={'/add-task'} className='hover:text-blue-200'>
                  Add Task
                </Link>
              </li>
              <li>
                <Link href={'/show-tasks'} className='hover:text-blue-200'>
                  Show Tasks
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div>
        <ul className='flex space-x-3 text-sm'>
          {user && (
            <>
              <li>
                <Link href='/#'>{user.name}</Link>
              </li>
              <li>
                <button onClick={doLogout}>Logout</button>
              </li>
            </>
          )}

          {!user && (
            <>
              <li>
                <Link href='/login'>Login</Link>
              </li>
              <li>
                <Link href='/signup'>Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CustomNavbar;
