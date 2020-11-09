import { all, fork, takeLatest, delay, put, call } from 'redux-saga/effects';
import { addPostApi, addCommentApi, loadPostsApi } from '../api/postApi';
import {
  LOAD_POSTS,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  ADD_POST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  REMOVE_POST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  ADD_COMMENT,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
} from '../reducers/post';
import {
  ADD_POST_TO_ME_SUCCESS,
  ADD_POST_TO_ME_FAILURE,
  REMOVE_POST_OF_ME_SUCCESS,
  REMOVE_POST_OF_ME_FAILURE,
} from '../reducers/user';

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsApi, action.data);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function* addPost(action) {
  try {
    const result = yield call(addPostApi, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME_SUCCESS,
      id: result.data.id,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
    yield put({
      type: ADD_POST_TO_ME_FAILURE,
      error: err.reponse.data,
    });
  }
}

function* removePost(action) {
  try {
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      id: action.id,
    });
    yield put({
      type: REMOVE_POST_OF_ME_SUCCESS,
      id: action.id,
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.reponse.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME_FAILURE,
      error: err.response.data,
    });
  }
}

function* addComment(action) {
  try {
    const result = yield call(addCommentApi, action.data);
    console.log('add Comment result: ', result);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield takeLatest(LOAD_POSTS, loadPosts);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST, addPost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST, removePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT, addComment);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
  ]);
}
