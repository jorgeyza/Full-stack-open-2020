import userService from '../services/users';

const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data.sort();
    default:
      return state;
  }
};

export const initializeUsers = () => {
  return async (dispatch) => {
    const fetchedUsers = await userService.getAll();
    dispatch({
      type: 'INIT_USERS',
      data: fetchedUsers,
    });
  };
};

export default userReducer;
