import React from 'react';
import { useQuery } from '@apollo/client';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { ALL_BOOKS } from '../queries';

const Books = () => {
  const result = useQuery(ALL_BOOKS);

  if (result.loading) {
    return <CircularProgress />;
  }

  const books = result.data.allBooks;

  return (
    <div>
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
          {books.map((b) => (
            <TableRow key={b.id}>
              <TableCell>{b.title}</TableCell>
              <TableCell>{b.author}</TableCell>
              <TableCell>{b.published}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Books;
