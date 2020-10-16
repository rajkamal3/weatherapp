import * as ELEMENTS from 'elements.js';
import { Http } from 'http.js';
import { WeatherData, WEATHER_PROXY_HANDLER } from './weather-data.js';

ELEMENTS.ELEMENT_SEARCH_BUTTON.addEventListener('click', searchWeather);

function searchWeather() {
    const CITY_NAME = ELEMENTS.ELEMENT_SEARCHED_CITY.value.trim();
    if (!CITY_NAME) {
        return alert('Please enter a city name.');
    }
    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=cf22b61f1fee26d122ec6957e577dc5d`;

    Http.fetchUrl(URL)
        .then((res) => {
            const weatherData = new WeatherData(
                CITY_NAME,
                res.weather[0].description.toUpperCase()
            );
            const WEATHER_PROXY = new Proxy(weatherData, WEATHER_PROXY_HANDLER);
            WEATHER_PROXY.temperature = res.main.temp;
            updateWeather(WEATHER_PROXY);
        })
        .catch((err) => {
            console.log(err);
        });
}

function updateWeather(weatherData) {
    ELEMENTS.ELEMENT_WEATHER_CITY.textContent = weatherData.cityName;
    ELEMENTS.ELEMENT_WEATHER_DESCRIPTION.textContent = weatherData.description;
    ELEMENTS.ELEMENT_WEATHER_TEMPERATURE.textContent = weatherData.temperature;

    ELEMENTS.ELEMENT_WEATHER_BOX.style.display = 'block';
}
