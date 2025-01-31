import React from 'react';

const Countries = ({ countriesList }) => {
  if (countriesList.length > 10) {
    return <p>Too many countries, narrow your search!</p>;
  }

  if (countriesList.length === 1) {
    const country = countriesList[0];
    const languages = Object.values(country.languages);
    console.log(languages);
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
      </div>
    );
  }
  return (
    <div>
      {countriesList.map((country) => {
        return <p key={country.name.common}>{country.name.common}</p>;
      })}
    </div>

  );
};

export default Countries;