const initialState = { content: null, type: null };

let timedOutId;

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_NOTIFICATION':
      return { content: action.data.content, type: action.data.type };
    case 'REMOVE_NOTIFICATION':
      return { content: null, type: null };
    default:
      return state;
  }
};

export const setNotification = (content, type) => {
  return {
    type: 'INIT_NOTIFICATION',
    data: { content, type },
  };
};

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
  };
};

export const notify = ({ content, type }, timeout) => {
  return async (dispatch) => {
    dispatch(setNotification(content, type));
    clearTimeout(timedOutId);
    timedOutId = setTimeout(() => {
      dispatch(removeNotification());
    }, timeout);
  };
};

export default notificationReducer;
