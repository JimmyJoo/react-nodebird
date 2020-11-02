import axios from 'axios';

export const logInApi = (data) => {
  return axios.post('/user/login', data);
};

export const logOutApi = () => {
  return axios.post('/user/logout');
};

export const signUpApi = (data) => {
  return axios.post('/user', data);
};
