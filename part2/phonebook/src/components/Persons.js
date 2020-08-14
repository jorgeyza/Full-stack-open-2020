import React from "react";
import Person from "./Person";

const Persons = ({ persons, newFilter }) => {
  return (
    <ul>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(newFilter.toLowerCase())
        )
        .map((person) => (
          <Person key={person.name} person={person} />
        ))}
    </ul>
  );
};

export default Persons;
