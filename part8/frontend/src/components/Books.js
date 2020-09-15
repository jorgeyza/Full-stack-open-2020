import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Typography,
  Chip,
  CircularProgress,
  makeStyles,
  Box,
} from '@material-ui/core';
import { ALL_BOOKS } from '../queries';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const Books = () => {
  const [filteredGenres, setFilteredGenres] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [activeChips, setActiveChips] = useState([]);
  const classes = useStyles();
  const result = useQuery(ALL_BOOKS);

  useEffect(() => {
    if (result.data) {
      setFilteredBooks(books);
    }
  }, [result.data]); // eslint-disable-line

  useEffect(() => {
    if (result.data) {
      setFilteredBooks(
        books.filter((b) => b.genres.some((g) => filteredGenres.includes(g)))
      );
      if (filteredGenres.length === 0) {
        setFilteredBooks(books);
      }
    }
  }, [filteredGenres]); // eslint-disable-line

  if (result.loading) {
    return <CircularProgress />;
  }

  const books = result.data.allBooks;

  const genreArrays = books.map((b) => b.genres);
  const booksGenres = [...new Set([].concat(...genreArrays))];

  const handleGenreFilter = (genre, id) => {
    if (filteredGenres.includes(genre)) {
      setFilteredGenres(filteredGenres.filter((g) => g !== genre));
    } else {
      setFilteredGenres(filteredGenres.concat(genre));
    }

    if (activeChips.some((i) => i === id)) {
      setActiveChips(activeChips.filter((i) => i !== id));
    } else {
      setActiveChips(activeChips.concat(id));
    }
  };

  return (
    <Box>
      <Typography variant="h2">books</Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Author</TableCell>
            <TableCell>Published</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredBooks.map((b) => (
            <TableRow key={b.id}>
              <TableCell>{b.title}</TableCell>
              <TableCell>{b.author.name}</TableCell>
              <TableCell>{b.published}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Typography variant="h6">Filter by genre:</Typography>
      <Box className={classes.root}>
        {booksGenres.map((g, index) => (
          <Chip
            key={g}
            label={g}
            color={activeChips.includes(index) ? 'primary' : 'default'}
            onClick={() => handleGenreFilter(g, index)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Books;
