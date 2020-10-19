import { all, fork, takeLatest, delay, call, put } from 'redux-saga/effects';
import { addPostApi } from '../api/postApi';
import { ADD_POST, ADD_POST_SUCCESS, ADD_POST_FAILURE } from '../reducers/post';

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

function* watchAddPost() {
  yield takeLatest(ADD_POST, addPost);
}

export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}
