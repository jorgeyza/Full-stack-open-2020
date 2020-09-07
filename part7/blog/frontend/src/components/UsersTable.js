import React from 'react';
import { useSelector } from 'react-redux';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Typography,
} from '@material-ui/core';
import UserRow from './UserRow';

const UsersTable = () => {
  const userSelector = useSelector(({ user }) => user);
  return (
    <div>
      <Typography variant="h4">Users</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Blogs created</TableCell>
            </TableRow>
          </TableHead>
          {userSelector.map((u) => (
            <UserRow
              key={u.id}
              name={u.name}
              blogsQty={u.blogs.length}
              userid={u.id}
            />
          ))}
        </Table>
      </TableContainer>
    </div>
  );
};

export default UsersTable;
