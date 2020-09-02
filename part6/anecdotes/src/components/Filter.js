import React from 'react';
import { connect } from 'react-redux';
import { filterAnecdotes } from '../reducers/filterReducer';

const Filter = (props) => {
  const handleChange = (event) => {
    event.preventDefault();
    const filterText = event.target.value;
    props.filterAnecdotes(filterText);
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

const mapDispatchToProps = {
  filterAnecdotes,
};

export default connect(null, mapDispatchToProps)(Filter);
