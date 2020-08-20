import React from 'react';

const Person = ({ person, handleDelete }) => {
  return (
    <li>
      {person.name} {person.number}
      <button type="button" onClick={() => handleDelete(person.id)}>
        delete
      </button>
    </li>
  );
};

export default Person;
