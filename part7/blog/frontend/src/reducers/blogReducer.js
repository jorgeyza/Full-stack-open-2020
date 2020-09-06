import blogService from '../services/blogs';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data.sort((b1, b2) => b2.likes - b1.likes);
    case 'CREATE_BLOG':
      return state.concat(action.data);
    case 'UPDATE_BLOG':
      debugger;
      return state.map((b) =>
        b.id === action.data.id ? action.data.updatedBlog : b
      );
    case 'DELETE_BLOG':
      return state.filter((b) => b.id !== action.data.id);
    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const fetchedBlogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      data: fetchedBlogs,
    });
  };
};

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject);
    dispatch({
      type: 'CREATE_BLOG',
      data: newBlog,
    });
  };
};

export const updateBlog = (id, changedBlog) => {
  return async (dispatch) => {
    console.log('updateBlog -> id', id);
    debugger;
    const updatedBlog = await blogService.update(id, changedBlog);
    console.log('updateBlog -> updatedBlog', updatedBlog);
    dispatch({
      type: 'UPDATE_BLOG',
      data: { id, updatedBlog },
    });
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch({ type: 'DELETE_BLOG', data: { id } });
  };
};

export default blogReducer;
