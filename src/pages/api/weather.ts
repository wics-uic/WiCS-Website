import type { APIRoute } from "astro";
// const API_KEY = import.meta.env.WEATHER_API_KEY;
// const API_URL = import.meta.env.WEATHER_API_URL;
const API_KEY = "315162c22a7656116cbad3b7a28fcf25";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric";

    
async function checkWeather(city) {
    const response = await fetch(`${API_URL}&appid=${API_KEY}&q=${city}`);

    if (!response.ok) {
        // display Chicago 
        console.error("City not found or an API error occurred.");
        return;
    }
    var data = await response.json();
    console.log(data);
    

    // update weather location 
    document.querySelector(".location").innerHTML = `${data.name}, ${data.sys.country}`;
    document.querySelector(".date").innerHTML = new Date().toLocaleDateString('en-US', {weekday: 'long'}); // grab current date
    
    // celsius temperature
    const tempCelsius = Math.round(data.main.temp);
    document.querySelector(".degree-cel").innerHTML = `${tempCelsius}°C`;

    // convert to fahrenheit
    const tempF = Math.round((tempCelsius * (9/5)) + 32);
    document.querySelector(".degree-fahre").innerHTML = `${tempF} F`;

    // update weather description and icon
    document.querySelector(".description").innerHTML = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
    const weatherIcon = document.querySelector(".weather-img");
    
    // set icon 
    const weatherCondition = data.weather[0].main.toLowerCase();

    // change weather icon
    if(weatherCondition.includes("clouds")) {
        weatherIcon.src = "src/assets/weather-images/clouds.png";
    }
    else if(weatherCondition.includes("clear")) {
        weatherIcon.src = "src/assets/weather-images/clear.png";
    }
    else if(weatherCondition.includes("rain")) {
        weatherIcon.src = "src/assets/weather-images/rain.png";
    }
    else if(weatherCondition.includes("drizzle")) {
        weatherIcon.src = "src/assets/weather-images/drizzle.png";
    }
    else if(weatherCondition.includes("mist")) {
        weatherIcon.src = "src/assets/weather-images/mist.png";
    }
    
}