import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, username, userid, handleLike, handleBlogDelete }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const isOwner = userid === blog.user.id;

  const spanStyle = { display: visible ? '' : 'none' };

  const removeButtonStyle = {
    display: isOwner ? '' : 'none',
    backgroundColor: '#008CBA',
    border: 'none',
    color: 'white',
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button type="button" onClick={toggleVisibility}>
        {visible ? 'hide' : 'view'}
      </button>
      <span style={spanStyle}>
        <br />
        {blog.url}
        <br />
        likes: {blog.likes}
        <button type="button" onClick={handleLike}>
          like
        </button>
        <br />
        {username} <br />
        <button
          style={removeButtonStyle}
          type="button"
          onClick={handleBlogDelete}
        >
          remove
        </button>
      </span>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.objectOf(PropTypes.string).isRequired,
  }).isRequired,
  username: PropTypes.string.isRequired,
  userid: PropTypes.string.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleBlogDelete: PropTypes.func.isRequired,
};

export default Blog;
