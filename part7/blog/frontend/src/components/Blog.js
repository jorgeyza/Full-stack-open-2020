import React from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { Button, ListItem } from '@material-ui/core';

import PropTypes from 'prop-types';

const Blog = ({ blog, handleDeleteBlog, index }) => {
  const loginSelector = useSelector(({ login }) => login);

  return (
    <ListItem className="blog" id={`blog${index}`}>
      <Link component={RouterLink} to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
      {loginSelector.id === blog.user.id || loginSelector.id === blog.user ? (
        <Button
          style={{ marginLeft: 10 }}
          variant="contained"
          id="remove"
          onClick={handleDeleteBlog}
        >
          remove
        </Button>
      ) : null}
    </ListItem>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      blogs: PropTypes.arrayOf(PropTypes.object),
    }),
  }).isRequired,
  index: PropTypes.number.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
};

export default Blog;
