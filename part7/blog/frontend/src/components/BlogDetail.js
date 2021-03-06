import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { updateBlog } from '../reducers/blogReducer';
import { notify } from '../reducers/notificationReducer';
import Comments from './Comments';

const BlogDetail = () => {
  const blogsSelector = useSelector(({ blog }) => blog);
  const dispatch = useDispatch();
  const { id } = useParams();
  const blog = blogsSelector.find((b) => b.id === id);
  if (!blog) {
    return null;
  }

  const handleLike = async (blogId) => {
    const udpatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    try {
      dispatch(updateBlog(blogId, udpatedBlog));
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
      <Typography>
        <b>Title:</b> {blog.title}
      </Typography>
      <Typography className="url">
        <b>URL:</b> {blog.url}
      </Typography>
      <Typography className="likes">
        <b>Likes:</b> {blog.likes}
        <Button
          style={{ marginLeft: 10 }}
          color="primary"
          variant="contained"
          className="likeButton"
          onClick={() => handleLike(id)}
        >
          LIKE
        </Button>
      </Typography>
      <Typography className="userName">
        <b>Author:</b>
        {blog.author}
      </Typography>
      <Comments blog={blog} />
    </div>
  );
};

export default BlogDetail;
