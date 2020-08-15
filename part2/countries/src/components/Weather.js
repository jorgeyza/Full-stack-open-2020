import React from "react";

const Weather = ({ country, weather }) => {
  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <p>
        <strong>temperature: </strong>
        {weather.temperature} Celcius
      </p>
      <img src={weather.weather_icons} alt={weather.weather_descriptions} />
      <p>
        <strong>wind: </strong>
        {weather.wind_speed} kph direction {weather.wind_dir}
      </p>
    </div>
  );
};

export default Weather;
