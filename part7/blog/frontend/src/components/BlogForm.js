import React, { useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import { notify } from '../reducers/notificationReducer';
import blogService from '../services/blogs';

const BlogForm = ({ blogFormRef }) => {
  const [blogFormInput, setBlogFormInput] = useReducer(
    (state, newState) => {
      return { ...state, ...newState };
    },
    {
      newTitle: '',
      newAuthor: '',
      newUrl: '',
    }
  );
  const dispatch = useDispatch();
  const userSelector = useSelector(({ user }) => user);

  const handleBlogFormInputChange = (event) => {
    const { name, value } = event.target;
    setBlogFormInput({ [name]: value });
  };

  const handleAddBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: blogFormInput.newTitle,
      author: blogFormInput.newAuthor,
      url: blogFormInput.newUrl,
    };
    try {
      blogFormRef.current.toggleVisibility();
      blogService.setToken(userSelector.token);
      dispatch(createBlog(blogObject));
      dispatch(
        notify({
          type: 'success',
          content: `a new blog ${blogFormInput.newTitle} by ${blogFormInput.newAuthor} added`,
        }),
        5000
      );
      setBlogFormInput({
        newTitle: '',
        newAuthor: '',
        newUrl: '',
      });
    } catch (error) {
      dispatch(notify({ type: 'error', content: 'Could not add blog' }, 5000));
    }
  };

  return (
    <div>
      <h2>create new</h2>
      <form className="form" onSubmit={handleAddBlog}>
        <label htmlFor="title">
          title:
          <input
            type="text"
            name="newTitle"
            id="title"
            value={blogFormInput.newTitle}
            onChange={handleBlogFormInputChange}
          />
        </label>
        <label htmlFor="author">
          author:
          <input
            type="text"
            name="newAuthor"
            id="author"
            value={blogFormInput.newAuthor}
            onChange={handleBlogFormInputChange}
          />
        </label>
        <label htmlFor="url">
          url:
          <input
            type="text"
            name="newUrl"
            id="url"
            value={blogFormInput.newUrl}
            onChange={handleBlogFormInputChange}
          />
        </label>
        <button type="submit" id="create">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
