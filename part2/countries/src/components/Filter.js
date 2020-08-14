import React from "react";

const Filter = ({ handleFilter, newFilter }) => {
  return (
    <div>
      <label htmlFor="filter">
        Find countries
        <input onChange={handleFilter} name="filter" value={newFilter} />
      </label>
    </div>
  );
};

export default Filter;
