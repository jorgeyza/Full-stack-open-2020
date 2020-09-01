const initialState = { message: '', show: false };

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return { message: action.data.message, show: true };
    case 'REMOVE_MESSAGE':
      return { message: '', show: false };
    default:
      return state;
  }
};

export const setMessage = (message) => {
  return {
    type: 'SET_MESSAGE',
    data: { message },
  };
};

export const removeMessage = () => {
  return {
    type: 'REMOVE_MESSAGE',
  };
};

export default notificationReducer;
