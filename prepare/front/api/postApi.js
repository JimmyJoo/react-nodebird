import axios from 'axios';

export const addPostApi = (data) => axios.post('/post', { content: data });

export const addCommentApi = (data) =>
  axios.post(`/post/${data.postId}/comment`, data);
