let now = new Date();
console.log(now);

let timeMin = now.getMinutes();
console.log(timeMin);

if (timeMin < 10) {
  timeMin = `0${timeMin}`;
}

let time = now.getHours();
console.log(time);

if (time < 10) {
  time = `0${time}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];
console.log(day);

let small = document.querySelector("small");
small.innerHTML = ` ${day} ${time}:${timeMin}`;

function showCity(response) {
  console.log(response);
  let newCity = response.data.name;
  let newTemp = response.data.main.temp;
  newTemp = Math.round(newTemp);
  let newDecsription = response.data.weather[0].description.toUpperCase();
  let newHumidity = response.data.main.humidity;
  let newWind = response.data.wind.speed;
  newWind = Math.round(newWind);

  let currentCity = document.querySelector("#showcity");
  currentCity.innerHTML = `${newCity}`;

  let currentTemp = document.querySelector("#temp");
  currentTemp.innerHTML = `${newTemp}`;

  let currentDesc = document.querySelector("#desc");
  currentDesc.innerHTML = `${newDecsription}`;

  let currentHumi = document.querySelector("#humi");
  currentHumi.innerHTML = `${newHumidity}`;

  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `${newWind}`;
}

function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "7e2372e9a65000ecaa60117af4dfce64";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showCity);
}

function searchLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

function defaultSearch(enterCity) {
  let apiKey = "7e2372e9a65000ecaa60117af4dfce64";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${enterCity}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showCity);
}

function changeCity(event) {
  event.preventDefault();
  let enterCity = document.querySelector("#enter-city").value;

  defaultSearch(enterCity);
}

let enterNewCity = document.querySelector("#city-form");
enterNewCity.addEventListener("submit", changeCity);

defaultSearch("New York");

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", searchLocation);
