// actiion types
const LOG_IN = 'user/LOG_IN';
const LOG_OUT = 'user/LOG_OUT';

// action creator
export const loginAction = (data) => ({ type: LOG_IN, data });
export const logoutAction = () => ({ type: LOG_OUT });

// initialState
const initialState = {
  isLoggedIn: false,
  user: null,
  signUpData: {},
  loginData: {},
};

// reducer
const user = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.data,
      };
    case LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export default user;
