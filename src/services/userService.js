import { httpAxios } from '@/helper/httpHelper';

export const createUser = async (user) => {
  const result = await httpAxios
    .post('/api/users', user)
    .then((response) => response.data);
  return result;
};

export const login = async (userInfo) => {
  const result = await httpAxios
    .post('/api/login', userInfo)
    .then((response) => response.data);
  return result;
};

export const getCurrentUser = async () => {
  const result = await httpAxios
    .get('/api/current')
    .then((response) => response.data);
  return result;
};

export const logout = async () => {
  const result = await httpAxios
    .get('/api/logout')
    .then((response) => response.data);
  return result;
};
