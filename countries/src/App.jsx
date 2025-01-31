import { useState } from 'react';
import countryService from "./services/countries";
import Countries from './components/Countries';

function App() {
  const [search, setSearch] = useState("");
  const [countriesList, setCountriesList] = useState([]);

  const handleSearch = (event) => {
    const searchedCountry = event.target.value;
    setSearch(searchedCountry);
    //any time a new search is queried, make a new get request to the API
    countryService
      .getCountries()
      .then((response) => {
        console.log(response);
        setCountriesList(response);
      });
  };

  const filteredCountriesList = countriesList.filter((country) => {
    return country.name.common.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <p>
        find countries:
        <input value={search} onChange={handleSearch} />
      </p>
      <Countries setSearch={setSearch} countriesList={filteredCountriesList} />
    </>
  );
}

export default App;
