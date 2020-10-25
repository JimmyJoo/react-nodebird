import { all, fork, takeLatest, delay, put } from 'redux-saga/effects';
// import { addPostApi } from '../api/postApi';
import {
  ADD_POST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_COMMENT,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
} from '../reducers/post';

function* addPost(action) {
  try {
    yield delay(1000);
    // const { data } = yield call(addPostApi, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* addComment(action) {
  try {
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST, addPost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment)]);
}
