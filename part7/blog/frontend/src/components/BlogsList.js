import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateBlog, deleteBlog } from '../reducers/blogReducer';
import { notify } from '../reducers/notificationReducer';
import Blog from './Blog';

const BlogsList = () => {
  const blogsSelector = useSelector(({ blog }) => blog);
  const dispatch = useDispatch();

  const handleLike = async (id) => {
    const blogIndex = blogsSelector.findIndex((b) => b.id === id);
    const udpatedBlog = {
      ...blogsSelector[blogIndex],
      likes: blogsSelector[blogIndex].likes + 1,
    };
    try {
      dispatch(updateBlog(id, udpatedBlog));
      dispatch(
        notify(
          {
            type: 'success',
            content: `${udpatedBlog.title} blog liked`,
          },
          5000
        )
      );
    } catch (error) {
      dispatch(
        notify({ type: 'error', content: 'Could not increase likes' }, 5000)
      );
    }
  };

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
    <ul>
      {blogsSelector.map((b, i) => {
        return (
          <Blog
            key={b.id}
            blog={b}
            index={i}
            handleLike={() => handleLike(b.id)}
            handleDeleteBlog={() => handleDeleteBlog(b.id)}
          />
        );
      })}
    </ul>
  );
};

export default BlogsList;
