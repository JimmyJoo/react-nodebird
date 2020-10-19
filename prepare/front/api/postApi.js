import axios from 'axios';

export const addPostApi = (data) => {
  return axios.post('/api/post', data);
};
