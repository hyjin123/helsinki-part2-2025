import axios from "axios";
import { useState, useEffect } from "react";

const Country = ({ countriesList }) => {
  const [weatherData, setWeatherData] = useState(null);

  const country = countriesList[0];
  const languages = Object.values(country.languages);

  useEffect(() => {
    const lat = country.latlng[0];
    const lon = country.latlng[1];
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios
      .get(url)
      .then(response => setWeatherData(response.data));
  }, []);

  if (!weatherData) {
    return null;
  };

  console.log("this is weather data", weatherData);
  const icon = weatherData.weather[0].icon;
  const weatherIconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {languages.map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} width="200" />
      <h3>Weather in {country.capital}</h3>
      <p>Temperature {weatherData.main.temp} Celsius</p>
      <img src={weatherIconUrl} />
      <p>Wind {weatherData.wind.speed} m/s</p>
    </div>
  );
};

export default Country;