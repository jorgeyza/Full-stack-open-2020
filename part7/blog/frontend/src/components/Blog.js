import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

const Blog = ({ blog, handleDeleteBlog, index }) => {
  const loginSelector = useSelector(({ login }) => login);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const removeButtonStyle = {
    backgroundColor: '#008CBA',
    border: 'none',
    color: 'white',
  };

  return (
    <li style={blogStyle} className="blog" id={`blog${index}`}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
      <span>
        {loginSelector.id === blog.user.id || loginSelector.id === blog.user ? (
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
