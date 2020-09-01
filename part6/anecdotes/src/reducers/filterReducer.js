const initialState = '';

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.data.filterText;
    default:
      return state;
  }
};

export const filterAnecdotes = (filterText) => {
  return {
    type: 'SET_FILTER',
    data: { filterText },
  };
};

export default filterReducer;
