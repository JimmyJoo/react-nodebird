import axios from 'axios';

export const logInApi = (data) => axios.post('/user/login', data);

export const logOutApi = () => axios.post('/user/logout');

export const signUpApi = (data) => axios.post('/user', data);

export const loadMyInfoApi = () => axios.get('/user');

// data: new nickname
export const changeNicknameApi = (data) => axios.patch(`/user/${data}`);

// data: user id
export const followApi = (data) => axios.patch(`/user/${data}/follow`);

// data: user id
export const unfollowApi = (data) => axios.delete(`/user/${data}/follow`);

// data: user id
export const removeFollowerApi = (data) =>
  axios.delete(`/user/follower/${data}`);

export const loadFollowersApi = () => axios.get('/user/followers');

export const loadFollowingsApi = () => axios.get('/user/followings');
