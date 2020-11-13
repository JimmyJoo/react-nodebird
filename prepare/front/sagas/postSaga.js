import { all, fork, takeLatest, put, call } from 'redux-saga/effects';
import {
  addPostApi,
  addCommentApi,
  loadPostsApi,
  likePostApi,
  unlikePostApi,
  removePostApi,
} from '../api/postApi';
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
  LIKE_POST,
  LIKE_POST_FAILURE,
  LIKE_POST_SUCCESS,
  UNLIKE_POST,
  UNLIKE_POST_FAILURE,
  UNLIKE_POST_SUCCESS,
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
    const result = yield call(removePostApi, action.id);
    yield put({
      type: REMOVE_POST_SUCCESS,
      PostId: result.data.PostId,
    });
    yield put({
      type: REMOVE_POST_OF_ME_SUCCESS,
      PostId: result.data.PostId,
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

function* likePost(action) {
  try {
    const result = yield call(likePostApi, action.id);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* unlikePost(action) {
  try {
    const result = yield call(unlikePostApi, action.id);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UNLIKE_POST_FAILURE,
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

function* watchLikePost() {
  yield takeLatest(LIKE_POST, likePost);
}

function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST, unlikePost);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
    fork(watchLikePost),
    fork(watchUnlikePost),
  ]);
}
