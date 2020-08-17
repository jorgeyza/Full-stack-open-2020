import React, { useState, useEffect } from "react";
import "./App.css";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axiosHelper from "./services/axiosHelper";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    axiosHelper
      .getAll()
      .then((persons) => setPersons(persons))
      .catch((error) => console.error(error));
  }, []);

  const handleAddAndUpdate = (event) => {
    event.preventDefault();
    const personDuplicatedIndex = persons.findIndex(
      (person) => person.name === newName
    );
    const newPerson = { name: newName, number: newNumber };
    if (personDuplicatedIndex !== -1) {
      const result = window.confirm(
        `${persons[personDuplicatedIndex].name} is already added to phonebook, replace the old number with a new one?`
      );
      if (result) {
        return handleUpdateNumber(persons[personDuplicatedIndex].id, newPerson);
      }
    }
    axiosHelper
      .create(newPerson)
      .then((newPerson) => {
        setPersons(persons.concat(newPerson));
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (id) => {
    const personIndex = persons.findIndex((person) => person.id === id);
    const result = window.confirm(`Delete ${persons[personIndex].name}?`);
    if (result) {
      axiosHelper
        .deletePerson(id)
        .then((response) =>
          setPersons(persons.filter((person) => person.id !== id))
        )
        .catch((error) => console.error(error));
    }
  };

  const handleUpdateNumber = (id, person) => {
    axiosHelper
      .update(id, person)
      .then((updatedPerson) => {
        const newList = persons.map((person) => {
          if (person.id === id) {
            return updatedPerson;
          }
          return person;
        });
        setPersons(newList);
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => console.error(error));
  };

  const handleName = (event) => {
    setNewName(event.target.value);
  };

  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilter={handleFilter} />
      <h3>add a new</h3>
      <PersonForm
        handleAddAndUpdate={handleAddAndUpdate}
        handleName={handleName}
        handleNumber={handleNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        newFilter={newFilter}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
