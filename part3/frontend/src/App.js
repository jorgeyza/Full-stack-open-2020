import React, { useState, useEffect } from 'react';
import './App.css';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import personService from './services/personService';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [message, setMessage] = useState({ description: '', type: '' });

  useEffect(() => {
    personService
      .getAll()
      .then((people) => setPersons(people))
      .catch((error) => {
        setMessage({ description: 'Could not fetch persons', type: 'error' });
        console.error(error);
        setTimeout(() => {
          setMessage({ description: '', type: '' });
        }, 5000);
      });
  }, []);

  const handleUpdateNumber = (id, person) => {
    personService
      .update(id, person)
      .then((updatedPerson) => {
        const newList = persons.map((p) => {
          if (p.id === id) {
            return updatedPerson;
          }
          return p;
        });
        setPersons(newList);
        setNewName('');
        setNewNumber('');
        setMessage({
          description: `Updated number of ${person.name}`,
          type: 'success',
        });
        return setTimeout(() => {
          setMessage({ description: '', type: '' });
        }, 5000);
      })
      .catch((error) => {
        if (error.response.data.includes('validation')) {
          setMessage({ description: error.response.data, type: 'error' });
        } else {
          setMessage({
            description: `Could not update number of ${person.name}`,
            type: 'error',
          });
        }
        console.error(error);
        setTimeout(() => {
          setMessage({ description: '', type: '' });
        }, 5000);
      });
  };

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
    return personService
      .create(newPerson)
      .then((person) => {
        setPersons(persons.concat(person));
        setNewName('');
        setNewNumber('');
        setMessage({ description: `Added ${person.name}`, type: 'success' });
        return setTimeout(() => {
          setMessage({ description: '', type: '' });
        }, 5000);
      })
      .catch((error) => {
        if (error.response.data.includes('validation')) {
          setMessage({ description: error.response.data, type: 'error' });
        } else {
          setMessage({ description: 'Could not add person', type: 'error' });
        }
        console.error(error);
        setTimeout(() => {
          setMessage({ description: '', type: '' });
        }, 5000);
      });
  };

  const handleDelete = (id) => {
    const personIndex = persons.findIndex((person) => person.id === id);
    const result = window.confirm(`Delete ${persons[personIndex].name}?`);
    if (result) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setMessage({
            description: `Deleted ${persons[personIndex].name}`,
            type: 'success',
          });
          return setTimeout(() => {
            setMessage({ description: '', type: '' });
          }, 5000);
        })
        .catch((error) => {
          setMessage({
            description: `Information of ${persons[personIndex].name} has already been removed from server`,
            type: 'error',
          });
          console.error(error);
          setTimeout(() => {
            setMessage({ description: '', type: '' });
          }, 5000);
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
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
      <Notification message={message} />
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
