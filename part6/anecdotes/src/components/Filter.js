import React from 'react';
import { useDispatch } from 'react-redux';
import { filterAnecdotes } from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    event.preventDefault();
    const filterText = event.target.value;
    dispatch(filterAnecdotes(filterText));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input name="filterInput" onChange={handleChange} />
    </div>
  );
};

export default Filter;
