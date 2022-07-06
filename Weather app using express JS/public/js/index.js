var fetchWeather = "/weather";

const dateElement = document.querySelector(".date");
const timeElement = document.querySelector(".time");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const weatherIcon = document.querySelector(".weatherIcon i");

const locationElement = document.querySelector(".place");
const tempElement = document.querySelector(".temperature");
const weatherCondition = document.querySelector(".weatherCondition");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".windSpeed");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Sarturday",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";

  timeElement.textContent =
    (hoursIn12HrFormat < 10 ? "0" + hoursIn12HrFormat : hoursIn12HrFormat) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    " " +
    ampm;
  dateElement.textContent = days[day] + ", " + date + ", " + monthNames[month];
  console.log();
}, 1000);

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  locationElement.textContent = "Loading...";
  tempElement.textContent = "";
  weatherCondition.textContent = "";
  const locationApi = fetchWeather + "?address=" + search.value;
  console.log(locationApi);
  fetch(locationApi).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        locationElement.textContent = data.error;
        tempElement.textContent = "";
        weatherCondition.textContent = "";
      } else {
        console.log(data);
        if (data.description === "rain" || data.description === "fog") {
          weatherIcon.className = "wi wi-day-" + data.description;
        } else {
          weatherIcon.className = "wi wi-day-cloudy";
        }
        locationElement.textContent = "Location: " + data.cityName;
        tempElement.textContent =
          "Temperature: " +
          (data.temperature - 273.5).toFixed(2) +
          String.fromCharCode(176);
        weatherCondition.textContent =
          "Weather Condition: " + data.description.toUpperCase();
        humidity.textContent = "Humidity: " + data.humidity + "%";
        windSpeed.textContent = "Wind Speed: " + data.windSpeed;
      }
    });
  });
});
