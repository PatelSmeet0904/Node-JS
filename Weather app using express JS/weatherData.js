const request = require("request");

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const SECRET_KEY = "054c895758cd70443485f9a308d47757";

const weatherData = (address, callback) => {
  const url = BASE_URL + encodeURIComponent(address) + "&appid=" + SECRET_KEY;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Can't fetch data from open weather map api ", undefined);
    } else if (!body.main || !body.main.temp || !body.name || !body.weather) {
      callback("Unable to find required data, try another location", undefined);
    } else {
      callback(undefined, {
        temperature: body.main.temp,
        description: body.weather[0].description,
        cityName: body.name,
        humidity: body.main.humidity,
        windSpeed: body.wind.speed,
      });
    }
  });
};

module.exports = weatherData;
