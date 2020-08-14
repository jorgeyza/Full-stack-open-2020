import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  const [showCountry, setShowCountry] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    setFilteredCountries(
      countries.filter((country) => {
        return country.name.toLowerCase().includes(newFilter.toLowerCase());
      })
    );
  }, [newFilter, countries]);

  const handleFilter = (event) => {
    setNewFilter(event.target.value);
    setShowCountry("");
  };

  const handleShow = (name) => {
    setShowCountry(name);
  };

  return (
    <div>
      <Filter handleFilter={handleFilter} newFilter={newFilter} />
      <Countries
        countries={filteredCountries}
        handleShow={handleShow}
        showCountry={showCountry}
      />
    </div>
  );
};

export default App;
