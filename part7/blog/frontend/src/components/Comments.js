import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { notify } from '../reducers/notificationReducer';
import { addBlogComment } from '../reducers/blogReducer';
import {
  Button,
  TextField,
  List,
  ListItem,
  Typography,
  ListItemText,
} from '@material-ui/core';

const Comments = ({ blog }) => {
  const [commentInput, setCommentInput] = useState('');
  const dispatch = useDispatch();

  const handleAddComment = async (id) => {
    if (!commentInput) {
      return;
    }
    try {
      await dispatch(addBlogComment(id, commentInput));
      setCommentInput('');
      dispatch(
        notify(
          {
            type: 'success',
            content: `a new comment added`,
          },
          5000
        )
      );
    } catch (error) {
      dispatch(
        notify({ type: 'error', content: 'Could not add comment' }, 5000)
      );
    }
  };

  return (
    <div>
      <Typography variant="h4">Comments</Typography>
      <TextField
        name="comment"
        onChange={(event) => setCommentInput(event.target.value)}
        value={commentInput}
      />
      <Button
        style={{ marginLeft: 10 }}
        color="primary"
        variant="outlined"
        onClick={() => handleAddComment(blog.id)}
      >
        ADD COMMENT
      </Button>
      <List>
        {blog.comments.map((c, index) => (
          <ListItem key={index}>
            <ListItemText primary={c} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Comments;
