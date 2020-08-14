import React from "react";
import Country from "./Country";

const Countries = ({ countries, handleShow, showCountry }) => {
  const countriesList = countries.map((country) => (
    <li key={country.name}>
      {country.name}
      <button onClick={() => handleShow(country.name)}>show</button>
    </li>
  ));

  let selectedCountry = [];

  if (showCountry) {
    selectedCountry = countries.filter(
      (country) => country.name === showCountry
    );
  }

  return (
    <div>
      {countries.length === 1 ? (
        <Country country={countries} />
      ) : selectedCountry.length !== 0 ? (
        <Country country={selectedCountry} />
      ) : countries.length <= 10 ? (
        <ul>{countriesList}</ul>
      ) : (
        <p>Too many matches, specify another filter</p>
      )}
    </div>
  );
};

export default Countries;
