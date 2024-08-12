import axios from 'axios';

const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = import.meta.env.VITE_WEATHER_KEY;

const getWeather = ({capital, country}) =>{
    const request = axios.get(`${baseURL}${capital},${country}&APPID=${apiKey}&units=metric`);
    return request.then(response => response.data);    
}
export default {
    getWeather
}