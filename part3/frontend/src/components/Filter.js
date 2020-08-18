import React from "react";

const Filter = ({ newFilter, handleFilter }) => {
  return (
    <div>
      filter shown with
      <input type="text" onChange={handleFilter} value={newFilter} />
    </div>
  );
};

export default Filter;
