import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import {
  CircularProgress,
  Typography,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { BOOKS_BY_GENRE, ME } from '../queries';

const Recommended = () => {
  const [filteredBooks, setFilteredBooks] = useState([]);
  const { data: meData, loading: meLoading } = useQuery(ME);
  const [
    getBooksByGenreQuery,
    { data: booksByGenreData, loading: booksByGenreLoading },
  ] = useLazyQuery(BOOKS_BY_GENRE);

  useEffect(() => {
    if (meData) {
      console.log(
        'Recommended -> meData.me.favoriteGenre',
        meData.me.favoriteGenre
      );
      getBooksByGenreQuery({ variables: { genre: meData.me.favoriteGenre } });
    }
  }, [meData, getBooksByGenreQuery]);

  useEffect(() => {
    if (booksByGenreData) {
      console.log(booksByGenreData);
      setFilteredBooks(booksByGenreData.allBooks);
    }
  }, [booksByGenreData]);

  if (meLoading || booksByGenreLoading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Typography variant="h2">Recommendations</Typography>
      <Typography>
        Books in your favorite genre <strong>{meData.me.favoriteGenre}</strong>
      </Typography>
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
    </Box>
  );
};

export default Recommended;
