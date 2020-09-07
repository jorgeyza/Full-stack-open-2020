import React, { useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createBlog } from '../reducers/blogReducer';
import { notify } from '../reducers/notificationReducer';
import blogService from '../services/blogs';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const BlogForm = ({ blogFormRef }) => {
  const classes = useStyles();
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
  const loginSelector = useSelector(({ login }) => login);

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
      blogService.setToken(loginSelector.token);
      await dispatch(createBlog(blogObject));
      dispatch(
        notify(
          {
            type: 'success',
            content: `a new blog ${blogFormInput.newTitle} by ${blogFormInput.newAuthor} added`,
          },
          5000
        )
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
      <Typography variant="h4">Create new</Typography>
      <form className={classes.root} onSubmit={handleAddBlog}>
        <TextField
          variant="outlined"
          name="newTitle"
          label="title*"
          id="title"
          value={blogFormInput.newTitle}
          onChange={handleBlogFormInputChange}
        />
        <TextField
          variant="outlined"
          name="newAuthor"
          label="author*"
          id="author"
          value={blogFormInput.newAuthor}
          onChange={handleBlogFormInputChange}
        />
        <TextField
          variant="outlined"
          name="newUrl"
          label="url*"
          id="url"
          value={blogFormInput.newUrl}
          onChange={handleBlogFormInputChange}
        />
        <Button variant="contained" color="primary" type="submit" id="create">
          create
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
