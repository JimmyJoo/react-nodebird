import produce from 'immer';

// action types
export const LOG_IN = 'user/LOG_IN';
export const LOG_IN_SUCCESS = 'user/LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'user/LOG_IN_FAILURE';

export const LOG_OUT = 'user/LOG_OUT';
export const LOG_OUT_SUCCESS = 'user/LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'user/LOG_OUT_FAILURE';

export const SIGN_UP = 'user/SIGN_UP';
export const SIGN_UP_SUCCESS = 'user/SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'user/SIGN_UP_FAILURE';
export const SIGN_UP_DONE = 'user/SIGN_UP_DONE';

export const LOAD_MY_INFO = 'user/LOAD_MY_INFO';
export const LOAD_MY_INFO_SUCCESS = 'user/LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'user/LLOAD_MY_INFO_FAILURE';

export const CHANGE_NICKNAME = 'user/CHANGE_NICKNAME';
export const CHANGE_NICKNAME_SUCCESS = 'user/CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'user/CHANGE_NICKNAME_FAILURE';

export const FOLLOW = 'user/FOLLOW';
export const FOLLOW_SUCCESS = 'user/FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'user/FOLLOW_FAILURE';

export const UNFOLLOW = 'user/UNFOLLOW';
export const UNFOLLOW_SUCCESS = 'user/UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'user/UNFOLLOW_FAILURE';

export const ADD_POST_TO_ME = 'user/ADD_POST_TO_ME';
export const ADD_POST_TO_ME_SUCCESS = 'user/ADD_POST_TO_ME_SUCCESS';
export const ADD_POST_TO_ME_FAILURE = 'user/ADD_POST_TO_ME_FAILURE';

export const REMOVE_POST_OF_ME = 'user/REMOVE_POST_OF_ME';
export const REMOVE_POST_OF_ME_SUCCESS = 'user/REMOVE_POST_OF_ME_SUCCESS';
export const REMOVE_POST_OF_ME_FAILURE = 'user/REMOVE_POST_OF_ME_FAILURE';

// action creator
export const login = (data) => ({ type: LOG_IN, data });
export const logout = () => ({ type: LOG_OUT });
export const signup = () => ({ type: SIGN_UP });
export const loadMyInfo = () => ({ type: LOAD_MY_INFO });
export const changeNickname = (nickname) => ({
  type: CHANGE_NICKNAME,
  nickname,
});
export const follow = (id) => ({ type: FOLLOW, id });
export const unfollow = (id) => ({ type: UNFOLLOW, id });
export const addPostToMe = (id) => ({ type: ADD_POST_TO_ME, id });
export const removePostOfMe = (id) => ({ type: REMOVE_POST_OF_ME, id });

// initialState
const initialState = {
  logInLoading: false,
  logInDone: false,
  logInError: null,
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,
  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: null,
  followLoading: false,
  followDone: false,
  followError: null,
  unfollowLoading: false,
  unfollowDone: false,
  unfollowError: null,
  addPostToMeLoading: false,
  addPostToMeDone: false,
  addPostToMeError: null,
  removePostOfMeLoading: false,
  removePostOfMeDone: false,
  removePostOfMeError: null,
  isLoggedIn: false,
  me: null,
  signUpData: {},
  loginData: {},
};

// reducer
const user = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOG_IN:
        draft.logInLoading = true;
        draft.logInDone = false;
        draft.logInError = null;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.loginDone = true;
        draft.me = action.data;
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      case LOG_OUT:
        draft.logOutLoading = false;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;
      case SIGN_UP:
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
      case SIGN_UP_DONE:
        draft.signUpDone = false;
        break;
      case LOAD_MY_INFO:
        draft.loadMyInfoLoading = true;
        draft.loadMyInfoDone = false;
        draft.loadMyInfoError = null;
        break;
      case LOAD_MY_INFO_SUCCESS:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoDone = true;
        draft.me = action.data;
        break;
      case LOAD_MY_INFO_FAILURE:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoError = action.error;
        break;
      case CHANGE_NICKNAME:
        draft.changeNicknameLoading = true;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = null;
        break;
      case CHANGE_NICKNAME_SUCCESS:
        draft.me.nickname = action.data.nickname;
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
        break;
      case CHANGE_NICKNAME_FAILURE:
        draft.changeNicknameLoading = false;
        draft.changeNicknameError = action.error;
        break;
      case FOLLOW:
        draft.followLoading = true;
        draft.followDone = false;
        draft.followError = null;
        break;
      case FOLLOW_SUCCESS:
        draft.followLoading = false;
        draft.followDone = true;
        draft.me.Followings.push({ id: action.id });
        break;
      case FOLLOW_FAILURE:
        draft.followLoading = false;
        draft.followError = action.error;
        break;
      case UNFOLLOW:
        draft.unfollowLoading = true;
        draft.unfollowDone = false;
        draft.unfollowError = null;
        break;
      case UNFOLLOW_SUCCESS:
        draft.unfollowLoading = false;
        draft.unfollowDone = true;
        draft.me.Followings = draft.me.Followings.filter(
          (v) => v.id !== action.id
        );
        break;
      case UNFOLLOW_FAILURE:
        draft.unfollowLoading = false;
        draft.unfollowError = action.error;
        break;
      case ADD_POST_TO_ME:
        draft.addPostToMeLoading = true;
        draft.addPostToMeDone = false;
        draft.addPostToMeError = null;
        break;
      case ADD_POST_TO_ME_SUCCESS:
        draft.addPostToMeLoading = false;
        draft.addPostToMeDone = true;
        draft.me.Posts.unshift({ id: action.id });
        break;
      case ADD_POST_TO_ME_FAILURE:
        draft.addPostToMeLoading = false;
        draft.addPostToMeError = action.error;
        break;
      case REMOVE_POST_OF_ME:
        draft.removePostOfMeLoading = true;
        draft.removePostOfMeDone = false;
        draft.removePostOfMeError = action.error;
        break;
      case REMOVE_POST_OF_ME_SUCCESS:
        draft.removePostOfMeLoading = false;
        draft.removePostOfMeDone = true;
        draft.me.Posts = draft.me.Posts.filter((p) => p.id !== action.PostId);
        break;
      case REMOVE_POST_OF_ME_FAILURE:
        draft.removePostOfMeLoading = false;
        draft.removePostOfMeError = action.error;
        break;
      default:
        return state;
    }
  });

export default user;
