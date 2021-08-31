// This key is my current key...
// key: '1913a9e23b8ad5a21f2578fe7f11d994',
// base: 'http://api.openweathermap.org/data/2.5/'
// code of degree (°) from the keyboard = Alt + 0176

//Variables

const searchBox = document.querySelector(".weather .input-city");
const locationCity = document.getElementById("city-location");
const date = document.getElementById("date");
const currentTemperature = document.getElementById("cur-temperature");
const weatherDescription = document.getElementById("w-description");
const minByMaxTemperature = document.getElementById("low-high");
const weatherImage = document.getElementById("w-img");

const kelvin = 273;
const api = {
  key: "a0943bfbb8f7a953372cfc193a5244fa",
  base: "http://api.openweathermap.org/data/2.5/",
};

// functions

const setQuery = (evt) => {
  if (evt.keyCode == 13 || evt == "click") {
    //13 ->key code of the Enter button from computer keyboard
    getResults(searchBox.value);
    // console.log(searchBox.value);
  }
};

// Calling api 

const getResults = (query) => {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      searchBox.value +
      "&appid=a0943bfbb8f7a953372cfc193a5244fa"
  )
    // fetch(`${api.base}weather?q=${query}&appid=${api.key}`)
    .then((response) => response.json())
    // .then(data =>
    //     // console.log(data)
    //     displayResults(data)
    // )
    .then(function (data) {
      //Ei data holo object, ja current live weather er details
      console.log(data);
      displayResults(data);
    });
  // .catch(err => alert('Wrong City'))
};

const displayResults = (data) => {
  locationCity.innerHTML = "" + data.name + ", " + data.sys.country + "";

  currentTemperature.innerText = Math.floor(data.main.temp) - kelvin + "°c";
  weatherDescription.innerHTML = String(
    data.weather[0].description
  ).toUpperCase();
  minByMaxTemperature.innerText = `${
    Math.floor(data.main.temp_min) - kelvin
  }­°c / ${Math.floor(data.main.temp_max) - kelvin}°c`;
  weatherImage.innerHTML = `<img class="img-beauty" src="icons/${data.weather[0].icon}.png">`;
};

searchBox.addEventListener("keypress", setQuery);


// Showing current date do UI

const now = new Date();
date.innerText = dateBuilder(now);
function dateBuilder(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
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

  //d => (new Date()) current time...
  let day = days[now.getDay()]; //d.getDay() returns n-th day of the week...
  let today = now.getDate(); //d.getDate() returns n-th day of the month...
  let month = months[now.getMonth()]; //d.getMonth() returns n-th day of the year...
  let year = now.getFullYear(); //d.getFullYear() returns the current yearnow
  return `${day} ${today} ${month} ${year}`;
}

