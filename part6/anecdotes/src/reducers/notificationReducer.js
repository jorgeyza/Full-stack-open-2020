const initialState = { message: '', show: false };

let timedOutId;

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_MESSAGE':
      return { message: action.data.message, show: true };
    case 'REMOVE_MESSAGE':
      return { message: '', show: false };
    default:
      return state;
  }
};

export const initMessage = (message) => {
  return {
    type: 'INIT_MESSAGE',
    data: { message },
  };
};

export const removeMessage = () => {
  return {
    type: 'REMOVE_MESSAGE',
  };
};

export const setMessage = (message, timeout) => {
  return async (dispatch) => {
    dispatch(initMessage(message));
    clearTimeout(timedOutId);
    timedOutId = setTimeout(() => {
      dispatch(removeMessage());
    }, timeout);
  };
};

export default notificationReducer;
