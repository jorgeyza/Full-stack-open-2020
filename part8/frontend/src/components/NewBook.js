import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { TextField, Button, Typography } from '@material-ui/core';
import { NotificationContext } from '../context';
import { CREATE_BOOK } from '../queries';

const NewBook = ({ updateCacheWith }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  const { addMessage } = useContext(NotificationContext);

  const [createBook] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      addMessage(
        error.graphQLErrors[0] ? error.graphQLErrors[0].message : error.message,
        'error'
      );
    },
    update: (store, response) => {
      console.log('update executed');
      updateCacheWith(response.data.createBook);
    },
  });

  const handleAddBook = async (event) => {
    event.preventDefault();

    await createBook({
      variables: { title, author, published: parseInt(published), genres },
    });

    setTitle('');
    setPublished('');
    setAuthor('');
    setGenres([]);
    setGenre('');
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <div>
      <form onSubmit={handleAddBook}>
        <div>
          <TextField
            value={title}
            variant="outlined"
            label="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            value={author}
            variant="outlined"
            label="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            type="number"
            value={published}
            variant="outlined"
            label="published"
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <TextField
            value={genre}
            variant="outlined"
            label="genre"
            onChange={({ target }) => setGenre(target.value)}
          />
          <Button color="primary" onClick={addGenre} type="button">
            Add genre
          </Button>
        </div>
        <Typography>genres: {genres.join(' ')}</Typography>
        <Button color="primary" variant="contained" type="submit">
          Create book
        </Button>
      </form>
    </div>
  );
};

export default NewBook;
