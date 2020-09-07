import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateBlog } from '../reducers/blogReducer';
import { notify } from '../reducers/notificationReducer';

const BlogDetail = () => {
  const blogsSelector = useSelector(({ blog }) => blog);
  const dispatch = useDispatch();
  const id = useParams().id;
  const blog = blogsSelector.find((blog) => blog.id === id);
  if (!blog) {
    return null;
  }

  const handleLike = async (id) => {
    const udpatedBlog = {
      ...blog,
      likes: blog.likes + 1,
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

  return (
    <div>
      <h2>{blog.title}</h2>
      <span className="url">{blog.url}</span>
      <br />
      <span className="likes">likes: {blog.likes}</span>
      <button
        type="button"
        className="likeButton"
        onClick={() => handleLike(id)}
      >
        like
      </button>
      <br />
      <span className="userName">{blog.author}</span> <br />
    </div>
  );
};

export default BlogDetail;
