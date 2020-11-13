import { all, fork, takeLatest, delay, put, call } from 'redux-saga/effects';
import {
  logInApi,
  logOutApi,
  signUpApi,
  loadMyInfoApi,
  changeNicknameApi,
  followApi,
  unfollowApi,
} from '../api/userApi';
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
  LOAD_MY_INFO,
  LOAD_MY_INFO_FAILURE,
  LOAD_MY_INFO_SUCCESS,
  CHANGE_NICKNAME,
  CHANGE_NICKNAME_FAILURE,
  CHANGE_NICKNAME_SUCCESS,
} from '../reducers/user';

function* logIn(action) {
  try {
    const result = yield call(logInApi, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
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
    yield call(logOutApi);
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
    const result = yield call(signUpApi, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function* loadMyInfo(action) {
  try {
    const result = yield call(loadMyInfoApi, action.data);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

function* follow(action) {
  try {
    const result = yield call(followApi, action.data);
    yield put({
      type: FOLLOW_SUCCESS,
      data: result.data,
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
    const result = yield call(unfollowApi, action.data);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function* changeNickname(action) {
  try {
    const result = yield call(changeNicknameApi, action.nickname);
    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: CHANGE_NICKNAME_FAILURE,
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

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO, loadMyInfo);
}

function* watchFollow() {
  yield takeLatest(FOLLOW, follow);
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW, unfollow);
}

function* watchChangeNickname() {
  yield takeLatest(CHANGE_NICKNAME, changeNickname);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchLoadMyInfo),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchChangeNickname),
  ]);
}
