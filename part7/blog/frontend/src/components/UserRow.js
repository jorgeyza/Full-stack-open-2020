import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { TableBody, TableRow, TableCell, Typography } from '@material-ui/core';

const UserRow = ({ name, blogsQty, userid }) => {
  return (
    <TableBody>
      <TableRow>
        <TableCell>
          <Link component={RouterLink} to={`/users/${userid}`}>
            <Typography>{name}</Typography>
          </Link>
        </TableCell>
        <TableCell>
          <Typography>{blogsQty}</Typography>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default UserRow;
