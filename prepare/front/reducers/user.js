// actiion types
export const LOG_IN = 'user/LOG_IN';
export const LOG_IN_SUCCESS = 'user/LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'user/LOG_IN_FAILURE';

export const LOG_OUT = 'user/LOG_OUT';
export const LOG_OUT_SUCCESS = 'user/LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'user/LOG_OUT_FAILURE';

export const SIGN_UP = 'user/SIGN_UP';
export const SIGN_UP_SUCCESS = 'user/SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'user/SIGN_UP_FAILURE';

// action creator
export const loginAction = (data) => ({ type: LOG_IN, data });
export const logoutAction = () => ({ type: LOG_OUT });

// initialState
const initialState = {
  isLoggedIn: false,
  me: null,
  isLoggingIn: false,
  isLoggingOut: false,
  signUpData: {},
  loginData: {},
};

// reducer
const user = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isLoggingIn: true,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        me: { ...action.data, nickname: 'Jimmy Joo' },
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
      };
    case LOG_OUT:
      return {
        ...state,
        isLoggingOut: true,
        me: null,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        isLoggingOut: false,
        isLoggedIn: false,
        me: null,
      };
    default:
      return state;
  }
};

export default user;
