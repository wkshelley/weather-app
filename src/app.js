function showTemperature(response) {
  let description = response.data.weather[0].description;
  let humidity = Math.round(response.data.main.humidity);
  let temperature = Math.round(response.data.main.temp);
  farenheitTemp = Math.round(response.data.main.temp);
  let wind = Math.round(response.data.wind.speed);
  let city = response.data.name;
  let currentDescription = document.querySelector("#description");
  let currentHumidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  let h1 = document.querySelector("h1");
  let h2 = document.querySelector("h2");
  let iconElement = document.querySelector("#icon");

  h1.innerHTML = `${city}`;
  h2.innerHTML = `${temperature}`;
  currentHumidity.innerHTML = `Humidity ${humidity}%`;
  currentDescription.innerHTML = `${description}`;
  windSpeed.innerHTML = `Wind ${wind} mph`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "969aa20a54046a1f43968e313b89d478";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

function showPosition(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let units = "imperial";
  let apiKey = "13a6d4a4105994c1749023b8a081be47";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("button");
button.addEventListener("click", getPosition);

let now = new Date();
let currentDay = document.querySelector("#current-day");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let currentDate = now.getDate();
let currentTime = document.querySelector("#current-time");

let time = new Date();
currentTime.innerHTML = `Last updated at ${time.toLocaleString("en-US", {
  hour: "numeric",
  hour12: true,
})} <br> coded by Shelley White `;
currentDay.innerHTML = ` ${day} ${currentDate}`;

function farenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#city");
  temperatureElement.innerHTML = Math.round(farenheitTemp);
}

function celsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#city");
  let celsiusTemperature = (farenheitTemp - 32) * (5 / 9);
  let cTemp = Math.round(celsiusTemperature);

  temperatureElement.innerHTML = `${cTemp}`;
}

let farenheitTemp = null;
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

let celsiusLink = document.querySelector("#c-temp");
celsiusLink.addEventListener("click", celsiusTemperature);
let farenheitLink = document.querySelector("#f-temp");
farenheitLink.addEventListener("click", farenheitTemperature);
search("New York");
