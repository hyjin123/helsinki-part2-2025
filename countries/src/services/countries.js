import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getCountries = (search) => {
  const request = axios.get(`${baseUrl}/all`);
  return request.then((response) => {
    const countries = response.data;
    const result = countries.filter((country) => {
      return country.name.common.toLowerCase().includes(search.toLowerCase());
    });
    return result;
  });
};

export default { getCountries };
