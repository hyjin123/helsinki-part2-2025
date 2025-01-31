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
      .getCountries(searchedCountry)
      .then((response) => {
        console.log(response);
        setCountriesList(response);
      });
  };

  return (
    <>
      <p>
        find countries:
        <input value={search} onChange={handleSearch} />
      </p>
      <Countries countriesList={countriesList} />
    </>
  );
}

export default App;
