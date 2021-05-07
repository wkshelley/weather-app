function showTemperature(response) {
  console.log(response);

  let description = response.data.weather[0].description;
  let humidity = Math.round(response.data.main.humidity);
  let temperature = Math.round(response.data.main.temp);
  let wind = Math.round(response.data.wind.speed);
  let city = response.data.name;
  let currentDescription = document.querySelector("#description");
  let currentHumidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city} </br>${temperature}F˚`;
  currentHumidity.innerHTML = `Humidity ${humidity}%`;
  currentDescription.innerHTML = `${description}`;
  currentwindSpeed.innerHTML = `Wind Speed ${wind} mph`;
}

function search(city) {
  let apiKey = "969aa20a54046a1f43968e313b89d478";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
function searchCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
  search(cityInput.value);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

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
//let currentHour = now.getHours();
//let currentMinutes = now.getMinutes();
//let currentSeconds = now.getSeconds();
let time = new Date();

currentTime.innerHTML = `Last updated at ${time.toLocaleString("en-US", {
  hour: "numeric",
  hour12: true,
})} <br> coded by Shelley White`;
currentDay.innerHTML = ` ${day} ${currentDate}`;

function fTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let farenheit = document.querySelector("#f-temp");
farenheit.addEventListener("click", fTemp);

//function cTemp(event) {
//event.preventDefault();
//let cLink = document.querySelector("h1");
//cLink.innerHTML = 19;
//}
//let celsius = document.querySelector("#c-temp");
//celsius.addEventListener("click", cTemp);
