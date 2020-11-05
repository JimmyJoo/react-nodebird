import axios from 'axios';

export const logInApi = (data) => axios.post('/user/login', data);

export const logOutApi = () => axios.post('/user/logout');

export const signUpApi = (data) =>
  axios.post('http://localhost:3065/user', data);
