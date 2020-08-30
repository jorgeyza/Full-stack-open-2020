import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({
  blog,
  username,
  userid,
  handleLike,
  handleBlogDelete,
  index,
}) => {
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
    <div style={blogStyle} className="blog" id={`blog${index}`}>
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
        <span className="userName">{username}</span> <br />
        <button
          id="remove"
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
  index: PropTypes.number.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleBlogDelete: PropTypes.func.isRequired,
};

export default Blog;
