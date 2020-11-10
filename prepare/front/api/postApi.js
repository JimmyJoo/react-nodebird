import axios from 'axios';

export const loadPostsApi = () => axios.get('/posts');

export const addPostApi = (data) => axios.post('/post', { content: data });

export const addCommentApi = (data) =>
  axios.post(`/post/${data.postId}/comment`, data);

export const likePostApi = (id) => axios.patch(`/post/${id}/like`);

export const unlikePostApi = (id) => axios.delete(`/post/${id}/like`);
