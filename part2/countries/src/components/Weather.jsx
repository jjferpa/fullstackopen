import {useState, useEffect } from 'react';
import weatherService from '../services/Weather';


export const Weather = ({country, capital}) => {

    const [weatherCountry, setWeatherCountry] = useState(null);

  useEffect(() => {
    weatherService
      .getWeather({ country, capital })
      .then(initialWeather => setWeatherCountry(initialWeather))
      .catch(error => console.error('Error fetching weather data:', error));
  }, [country, capital]);
    

  if (!weatherCountry) {
    return <p>Loading weather data...</p>;
  }


  return (
    <>
      <h2>Weather in {capital}</h2>
        <p>
        temperature {weatherCountry.main.temp} celsius
        </p>
        <p>
        <img src={`https://openweathermap.org/img/wn/${weatherCountry.weather[0].icon}@2x.png`} alt="Weather Icon" />
        </p>
        <p>
            {console.log(weatherCountry)}
        wind {weatherCountry.wind.speed} m/s
        </p>
    </>
  )
}
