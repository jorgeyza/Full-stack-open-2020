import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

const Blog = ({ blog, handleDeleteBlog, handleLike, index }) => {
  const [visible, setVisible] = useState(false);
  const userSelector = useSelector(({ user }) => user);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const spanStyle = { display: visible ? '' : 'none' };

  const removeButtonStyle = {
    backgroundColor: '#008CBA',
    border: 'none',
    color: 'white',
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <li style={blogStyle} className="blog" id={`blog${index}`}>
      {blog.title} {blog.author}
      <button type="button" className="showHide" onClick={toggleVisibility}>
        {visible ? 'hide' : 'view'}
      </button>
      <span style={spanStyle} className="detailView">
        <br />
        <span className="url">{blog.url}</span>
        <br />
        <span className="likes">likes: {blog.likes}</span>
        <button type="button" className="likeButton" onClick={handleLike}>
          like
        </button>
        <br />
        <span className="userName">{userSelector.name}</span> <br />
        {userSelector.id === blog.user.id || userSelector.id === blog.user ? (
          <button
            id="remove"
            style={removeButtonStyle}
            type="button"
            onClick={handleDeleteBlog}
          >
            remove
          </button>
        ) : null}
      </span>
    </li>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      blogs: PropTypes.array,
    }),
  }).isRequired,
  index: PropTypes.number.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
};

export default Blog;
