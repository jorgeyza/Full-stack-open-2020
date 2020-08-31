const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

const counterReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case 'GOOD':
      return { ...state, good: state.good + action.data.value };
    case 'OK':
      return { ...state, ok: state.ok + action.data.value };
    case 'BAD':
      return { ...state, bad: state.bad + action.data.value };
    case 'ZERO':
      return { good: 0, ok: 0, bad: 0 };
    default:
      return state;
  }
};

export default counterReducer;
