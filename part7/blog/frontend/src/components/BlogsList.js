import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBlog } from '../reducers/blogReducer';
import { notify } from '../reducers/notificationReducer';
import Blog from './Blog';
import { List } from '@material-ui/core';

const BlogsList = () => {
  const blogsSelector = useSelector(({ blog }) => blog);
  const dispatch = useDispatch();

  const handleDeleteBlog = async (id) => {
    const selectedBlog = blogsSelector.find((b) => b.id === id);
    if (
      window.confirm(
        `Remove blog ${selectedBlog.title} by ${selectedBlog.author}`
      )
    ) {
      try {
        dispatch(deleteBlog(id));
        dispatch(
          notify(
            {
              type: 'success',
              content: `${selectedBlog.title} blog deleted`,
            },
            5000
          )
        );
      } catch (error) {
        dispatch(
          notify({ type: 'error', content: 'Could not delete blog' }, 5000)
        );
      }
    }
  };

  return (
    <List>
      {blogsSelector.map((b, i) => (
        <Blog
          key={b.id}
          blog={b}
          index={i}
          handleDeleteBlog={() => handleDeleteBlog(b.id)}
        />
      ))}
    </List>
  );
};

export default BlogsList;
