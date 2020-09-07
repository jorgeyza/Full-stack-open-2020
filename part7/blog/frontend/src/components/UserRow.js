import React from 'react';
import { Link } from 'react-router-dom';

const UserRow = ({ name, blogsQty, userid }) => {
  return (
    <tbody>
      <tr>
        <td>
          <Link to={`/users/${userid}`}>{name}</Link>
        </td>
        <td>{blogsQty}</td>
      </tr>
    </tbody>
  );
};

export default UserRow;
