import { all, fork, takeLatest, delay, put, call } from 'redux-saga/effects';
import { signUpApi } from '../api/userApi';
import {
  LOG_IN,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  FOLLOW,
  UNFOLLOW,
  FOLLOW_FAILURE,
  FOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  UNFOLLOW_SUCCESS,
} from '../reducers/user';

function* logIn(action) {
  try {
    yield delay(1000);
    // const { data } = yield call(logInApi, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function* logOut() {
  try {
    yield delay(1000);
    // const { data } = yield call(logOutApi);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function* signUp(action) {
  try {
    const { result } = yield call(signUpApi, action.data);
    console.log('result: ', result);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function* follow(action) {
  try {
    yield delay(1000);
    yield put({
      type: FOLLOW_SUCCESS,
      id: action.id,
    });
  } catch (err) {
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function* unfollow(action) {
  try {
    yield delay(1000);
    yield put({
      type: UNFOLLOW_SUCCESS,
      id: action.id,
    });
  } catch (err) {
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN, logIn);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP, signUp);
}

function* watchFollow() {
  yield takeLatest(FOLLOW, follow);
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW, unfollow);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnfollow),
  ]);
}
