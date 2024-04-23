'use client';

import React, { useEffect, useState } from 'react';
import UserContext from './userContext';
import { getCurrentUser } from '@/services/userService';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    async function getCurrentUserData() {
      try {
        const loggedInUser = await getCurrentUser();
        const userData = loggedInUser.user ? loggedInUser.user : undefined;
        if (loggedInUser) setUser({ ...userData });
      } catch (error) {
        console.error(error);
      }
    }
    getCurrentUserData();
  }, []);

  // useEffect(() => {
  //   console.log('User State:', user);
  // }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
