import React from 'react';
import Country from './Country';

const Countries = ({ countriesList, setSearch }) => {

  if (countriesList.length > 10) {
    return <p>Too many countries, narrow your search!</p>;
  }

  if (countriesList.length === 1) {
    return <Country countriesList={countriesList} />;
  }

  return (
    <div>
      {countriesList.map((country) => {
        return (
          <div key={country.name.common}>
            {country.name.common}
            <button onClick={() => setSearch(country.name.common)}>show</button>
          </div>
        );
      })}
    </div>

  );
};

export default Countries;