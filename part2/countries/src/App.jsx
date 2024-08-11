import { useState, useEffect } from "react";
import { Countries } from "./components/Countries"
import { Search } from "./components/Search"
import countryService from './services/Countries';



const App = () => {

  const [countries, setCountries] = useState([]);
  const [newSearch, setNewSearch] = useState('');

  useEffect(() =>{
    countryService
    .getAll()
    .then(initialCountries => {
      setCountries(initialCountries);
    })
    }, []);

  

  const handleNewSearchChange = (event) =>{
    setNewSearch(event.target.value);
  }



  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(newSearch.toLowerCase()));

  return (
    <>
      <Search newSearch = {newSearch} handleNewSearchChange={handleNewSearchChange} />
      <Countries  filteredCountries={filteredCountries} newSearch={newSearch} />

    </>
  )
}

export default App;
