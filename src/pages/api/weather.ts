// const API_KEY = "315162c22a7656116cbad3b7a28fcf25";
// const API_URL =
//   "https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=315162c22a7656116cbad3b7a28fcf25";

// const searchBox = document.querySelector(".search input");
// const searchBtn = document.querySelector(".search button");
// const weatherIcon = document.querySelector(".weather-icon");

// async function checkWeather(city) {
//   const response = await fetch(API_URL + city);

//   if (response.status == 404) {
//     document.querySelector(".error").style.display = "block";
//     document.querySelector(".weather").style.display = "none";
//   } else {
//     var data = await response.json();

//     // display on console
//     console.log(data);

//     // data from json file
//     document.querySelector(".city").innerHTML = data.name;
//     document.querySelector(".temp").innerHTML =
//       Math.round(data.main.temp) + "*C";
//     document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
//     document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

//     if (data.weather[0].main == "Clouds") {
//       weatherIcon.src = "src/assets/weather-images/clouds.png";
//     } else if (data.weather[0].main == "Clear") {
//       weatherIcon.src = "src/assets/weather-images/clear.png";
//     } else if (data.weather[0].main == "Rain") {
//       weatherIcon.src = "src/assets/weather-images/rain.png";
//     } else if (data.weather[0].main == "Drizzle") {
//       weatherIcon.src = "src/assets/weather-images/drizzle.png";
//     } else if (data.weather[0].main == "Mist") {
//       weatherIcon.src = "src/assets/weather-images/mist.png";
//     }

//     document.querySelector(".weather").style.display = "block";
//     document.querySelector(".error").style.display = "none";
//   }
// }
// searchBtn.addEventListener("click", () => {
//   checkWeather(searchBox.value);
// });
