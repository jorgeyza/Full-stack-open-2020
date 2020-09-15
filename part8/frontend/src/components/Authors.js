import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const Authors = () => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const result = useQuery(ALL_AUTHORS);
  const [updateAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const handleUpdateAuthor = async (event) => {
    event.preventDefault();

    updateAuthor({ variables: { name, born: parseInt(born) } });
    setName('');
    setBorn('');
  };

  if (result.loading) {
    return <CircularProgress />;
  }

  const authors = result.data.allAuthors;

  return (
    <div>
      <Typography variant="h2">Authors</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Born</TableCell>
            <TableCell>Books</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {authors.map((a) => (
            <TableRow key={a.id}>
              <TableCell>{a.name}</TableCell>
              <TableCell>{a.born}</TableCell>
              <TableCell>{a.bookCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div>
        <Typography variant="h4">Set birthyear</Typography>
        <form onSubmit={handleUpdateAuthor}>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel id="name-select">Name</InputLabel>
              <Select
                labelId="name-select"
                id="nameSelect"
                value={name}
                onChange={({ target }) => setName(target.value)}
              >
                {authors.map((a) => (
                  <MenuItem key={a.id} value={a.name}>
                    {a.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <TextField
              value={name}
              variant="outlined"
              label="name"
              onChange={({ target }) => setName(target.value)}
            /> */}
          </div>
          <div>
            <TextField
              type="number"
              value={born}
              variant="outlined"
              label="born"
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <Button color="primary" variant="contained" type="submit">
            Update author
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Authors;
