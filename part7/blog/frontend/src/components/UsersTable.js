import React from 'react';
import { useSelector } from 'react-redux';
import UserRow from './UserRow';

const UsersTable = () => {
  const userSelector = useSelector(({ user }) => user);
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>
              <span>
                <b>blogs created</b>
              </span>
            </th>
          </tr>
        </thead>
        {userSelector.map((u) => (
          <UserRow
            key={u.id}
            name={u.name}
            blogsQty={u.blogs.length}
            userid={u.id}
          />
        ))}
      </table>
    </div>
  );
};

export default UsersTable;
