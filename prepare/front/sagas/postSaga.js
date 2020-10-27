import shortId from 'shortid';
import { all, fork, takeLatest, delay, put } from 'redux-saga/effects';
// import { addPostApi } from '../api/postApi';
import {
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

function* addPost(action) {
  try {
    yield delay(1000);
    const id = shortId.generate();
    // const { data } = yield call(addPostApi, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        id,
        content: action.data,
      },
    });
    yield put({
      type: ADD_POST_TO_ME_SUCCESS,
      id,
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

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST, removePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchRemovePost), fork(watchAddComment)]);
}
