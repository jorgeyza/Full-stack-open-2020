import blogService from '../services/blogs';
import loginService from '../services/login';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      blogService.setToken(action.data);
      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(action.data)
      );
      return action.data;
    case 'LOGOUT_USER':
      return null;
    case 'SET_LOGGED_USER':
      const loggedUser = JSON.parse(action.data);
      blogService.setToken(loggedUser.token);
      return loggedUser;
    default:
      return state;
  }
};

export const setLoggedUser = (loggedUserJSON) => {
  return {
    type: 'SET_LOGGED_USER',
    data: loggedUserJSON,
  };
};

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const userInfo = await loginService.login(credentials);
    blogService.setToken(userInfo.token);
    dispatch({
      type: 'LOGIN_USER',
      data: userInfo,
    });
  };
};

export const logoutUser = () => {
  return {
    type: 'LOGOUT_USER',
  };
};

export default userReducer;
