import { useState } from 'react';
import { Country } from './Country';



export const Countries = ({filteredCountries, newSearch}) => {

    const [selectedCountry, setSelectedCountry] = useState(null);
  
    if (filteredCountries.length === 0) {
        return null;
   
    } else if (filteredCountries.length === 1) {
        return (

          <Country key={filteredCountries[0].name.common} country={filteredCountries[0]} />
        )

    } else if (filteredCountries.length > 10 && newSearch !== '') {
        return (
          <p>Too many matches, specify another filter</p>
        )

    } else if (filteredCountries.length > 1 && filteredCountries.length < 11) {
        return (
          <>
            {filteredCountries.map((country) =>
              <div key={country.name.common}>
                {country.name.common} 
                <button onClick={() => setSelectedCountry(country)}>show</button>
              </div>
            )}
            {selectedCountry && <Country key={selectedCountry.name.common} country={selectedCountry} />}
          </>
        );
      }
}
