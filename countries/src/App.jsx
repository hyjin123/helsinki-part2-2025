import { useState, useEffect } from 'react';
import countryService from "./services/countries";
import Countries from './components/Countries';

function App() {
  const [search, setSearch] = useState("");
  const [countriesList, setCountriesList] = useState([]);

  useEffect(() => {
    //make an API call to fetch data just once and deal with filter inside component
    countryService
      .getCountries()
      .then((response) => {
        console.log(response);
        setCountriesList(response);
      });
  }, []);

  const handleSearch = (event) => {
    const searchedCountry = event.target.value;
    setSearch(searchedCountry);
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
