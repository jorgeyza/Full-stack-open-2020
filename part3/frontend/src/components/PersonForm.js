import React from "react";

const PersonForm = ({
  handleAddAndUpdate,
  handleName,
  handleNumber,
  newName,
  newNumber,
}) => {
  return (
    <form onSubmit={handleAddAndUpdate}>
      <div>
        name: <input name="name" onChange={handleName} value={newName} />
      </div>
      <div>
        number:
        <input name="number" onChange={handleNumber} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
