import React from "react";

const Country = (props) => {
  const country = props.country[0];
  console.log("Country -> country", country);
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
    </div>
  );
};

export default Country;
