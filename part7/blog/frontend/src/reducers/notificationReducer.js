const initialState = { content: null, type: null };

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { content: action.data.content, type: action.data.type };
    case 'CLEAR_NOTIFICATION':
      return { content: null, type: null };
    default:
      return state;
  }
};

let timedOutId;

export const setNotification = (content, type) => {
  return {
    type: 'SET_NOTIFICATION',
    data: { content, type },
  };
};

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  };
};

export const notify = ({ content, type }, timeout) => {
  return async (dispatch) => {
    dispatch(setNotification(content, type));
    if (timedOutId) {
      clearTimeout(timedOutId);
    }
    timedOutId = setTimeout(() => {
      dispatch(clearNotification());
    }, timeout);
  };
};

export default notificationReducer;
