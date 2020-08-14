import React from "react";
import Country from "./Country";

const Countries = ({ countries }) => {
  const countriesList = countries.map((country) => (
    <li key={country.name}>{country.name}</li>
  ));

  console.log("Countries -> countries.length", countries.length);
  return (
    <div>
      {countries.length === 1 ? (
        <Country country={countries} />
      ) : countries.length <= 10 ? (
        <ul>{countriesList}</ul>
      ) : (
        <p>Too many matches, specify another filter</p>
      )}
    </div>
  );
};

export default Countries;
