import { httpAxios } from '@/helper/httpHelper';

export const addTask = async (task) => {
  const result = await httpAxios
    .post('/api/tasks', task)
    .then((response) => response.data);
  return result;
};
