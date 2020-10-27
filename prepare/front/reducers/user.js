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
export const loginAction = (data) => ({ type: LOG_IN, data });

export const logoutAction = () => ({ type: LOG_OUT });

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

const createDummyUser = (data) => ({
  ...data,
  nickname: 'Jimmy Joo',
  id: 1,
  Posts: [],
  Followings: [{ nickname: 'a' }, { nickname: 'b' }, { nickname: 'c' }],
  Followers: [{ nickname: 'A' }],
});

// reducer
const user = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        logInLoading: true,
        logInDone: false,
        logInError: null,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        logInLoading: false,
        logInDone: true,
        me: createDummyUser(action.data),
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        logInLoading: false,
        logInError: action.error,
      };
    case LOG_OUT:
      return {
        ...state,
        logOutLoading: true,
        logOutDone: false,
        logOutError: null,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        logOutLoading: false,
        logOutDone: true,
        me: null,
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        logOutLoading: false,
        logOutError: action.error,
      };
    case SIGN_UP:
      return {
        ...state,
        signUpLoading: true,
        signUpDone: false,
        signUpError: null,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpLoading: false,
        signUpDone: true,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        signUpLoading: false,
        signUpError: action.error,
      };
    case CHANGE_NICKNAME:
      return {
        ...state,
        changeNicknameLoading: true,
        changeNicknameDone: false,
        changeNicknameError: null,
      };
    case CHANGE_NICKNAME_SUCCESS:
      return {
        ...state,
        changeNicknameLoading: false,
        changeNicknameDone: true,
      };
    case CHANGE_NICKNAME_FAILURE:
      return {
        ...state,
        changeNicknameLoading: false,
        changeNicknameError: action.error,
      };
    case FOLLOW:
      return {
        ...state,
        followLoading: true,
        followDone: false,
        followError: null,
      };
    case FOLLOW_SUCCESS:
      return {
        ...state,
        followLoading: false,
        followDone: true,
      };
    case FOLLOW_FAILURE:
      return {
        ...state,
        followLoading: false,
        followError: action.error,
      };
    case UNFOLLOW:
      return {
        ...state,
        unfollowLoading: true,
        unfollowDone: false,
        unfollowError: null,
      };
    case UNFOLLOW_SUCCESS:
      return {
        ...state,
        unfollowLoading: false,
        unfollowDone: true,
      };
    case UNFOLLOW_FAILURE:
      return {
        ...state,
        unfollowLoading: false,
        unfollowError: action.error,
      };
    case ADD_POST_TO_ME:
      return {
        ...state,
        addPostToMeLoading: true,
        addPostToMeDone: false,
        addPostToMeError: null,
      };
    case ADD_POST_TO_ME_SUCCESS:
      return {
        ...state,
        addPostToMeLoading: false,
        addPostToMeDone: true,
        me: {
          ...state.me,
          Posts: [{ id: action.id }, ...state.me.Posts],
        },
      };
    case ADD_POST_TO_ME_FAILURE:
      return {
        ...state,
        addPostToMeLoading: false,
        addPostToMeError: action.error,
      };
    case REMOVE_POST_OF_ME:
      return {
        ...state,
        removePostOfMeLoading: true,
        removePostOfMeDone: false,
        removePostOfMeError: null,
      };
    case REMOVE_POST_OF_ME_SUCCESS:
      return {
        ...state,
        removePostOfMeLoading: false,
        removePostOfMeDone: true,
        me: {
          ...state.me,
          Posts: state.me.Posts.filter((p) => p.id !== action.id),
        },
      };
    case REMOVE_POST_OF_ME_FAILURE:
      return {
        ...state,
        removePostOfMeLoading: false,
        removePostOfMeError: action.error,
      };
    default:
      return state;
  }
};

export default user;
