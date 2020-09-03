import React from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({
  newTitle,
  newAuthor,
  newUrl,
  handleInputChange,
  handleAddBlog,
}) => {
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
            value={newTitle}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="author">
          author:
          <input
            type="text"
            name="newAuthor"
            id="author"
            value={newAuthor}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="url">
          url:
          <input
            type="text"
            name="newUrl"
            id="url"
            value={newUrl}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit" id="create">
          create
        </button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  newTitle: PropTypes.string.isRequired,
  newAuthor: PropTypes.string.isRequired,
  newUrl: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleAddBlog: PropTypes.func.isRequired,
};

export default BlogForm;
