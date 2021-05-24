function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "969aa20a54046a1f43968e313b89d478";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let description = response.data.weather[0].description;
  let humidity = Math.round(response.data.main.humidity);
  let temperature = Math.round(response.data.main.temp);
  let feelsLike = Math.round(response.data.main.feels_like);
  farenheitTemp = Math.round(response.data.main.temp);
  let wind = Math.round(response.data.wind.speed);
  let city = response.data.name;
  let currentDescription = document.querySelector("#description");
  let currentHumidity = document.querySelector("#humidity");
  let currentFeelsLike = document.querySelector("#feels-like");
  let windSpeed = document.querySelector("#wind");
  let h1 = document.querySelector("h1");
  let h2 = document.querySelector("h2");
  let iconElement = document.querySelector("#icon");

  h1.innerHTML = `${city}`;
  h2.innerHTML = `${temperature}°`;
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;
  currentFeelsLike.innerHTML = `Feels Like: ${feelsLike} °`;
  currentDescription.innerHTML = `${description}`;
  windSpeed.innerHTML = `Wind: ${wind} mph`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
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

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday"];

  weekDays.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2">
                <div class="weather-forecast-day">
                  ${day}
                </div>
                 <img class="mb-2" src=" " alt="clear"  id="icon" width="42">
                 <div class="weather-forecast-temp">
                   <span> 75 °</span> |
                   <span> 55 °</span>
                 </div>
                </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function farenheitTemperature(event) {
  event.preventDefault();
  farenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let temperatureElement = document.querySelector("#city");
  let feelsLikeElement = document.querySelector("#feels-like");
  let fTemp = Math.round(farenheitTemp);
  temperatureElement.innerHTML = `${fTemp}°`;
  //feelsLikeElement.innerHTML = `Feels Like: ${fTemp}°`;
}

function celsiusTemperature(event) {
  event.preventDefault();
  farenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#city");
  let feelsLikeElement = document.querySelector("#feels-like");
  let celsiusTemperature = (farenheitTemp - 32) * (5 / 9);
  let cTemp = Math.round(celsiusTemperature);
  temperatureElement.innerHTML = `${cTemp}°`;
  //feelsLikeElement.innerHTML = `Feels Like: ${feelsLike}°`;
}

let farenheitTemp = null;
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

let celsiusLink = document.querySelector("#c-temp");
celsiusLink.addEventListener("click", celsiusTemperature);
let farenheitLink = document.querySelector("#f-temp");
farenheitLink.addEventListener("click", farenheitTemperature);
search("New York");

let now = new Date();
//let currentDay = document.querySelector("#current-day");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let time = new Date();
let day = days[now.getDay()];
let currentDate = now.getDate();
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `Last updated: ${day} ${time.toLocaleString("en-US", {
  hour: "numeric",
  hour12: true,
})}`;
