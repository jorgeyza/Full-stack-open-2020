import React, { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./Weather";

const Country = (props) => {
  const [weather, setWeather] = useState({});
  const country = props.country[0];

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${
          process.env.REACT_APP_WEATHER_API_KEY
        }&query=${encodeURIComponent(country.capital)}`
      )
      .then((response) => {
        setWeather(response.data.current);
      })
      .catch((error) => {
        console.error(error);
        throw new Error("Could not fetch weather data.");
      });
  }, [country.capital]);

  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img
        style={{ width: 150, height: 100 }}
        src={country.flag}
        alt={`${country.name} flag`}
      />
      <Weather country={country} weather={weather} />
    </div>
  );
};

export default Country;
