import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getCountries = () => {
  const request = axios.get(`${baseUrl}/all`);
  return request.then((response) => {
    const countries = response.data;
    return countries;
  });
};

export default { getCountries };
