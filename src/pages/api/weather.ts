import type { APIRoute } from "astro";
const API_KEY = import.meta.env.WEATHER_API_KEY;
const API_URL = import.meta.env.WEATHER_API_URL;

async function checkWeather(city) {
    const response = await fetch(`${API_URL}&units=metric&appid=${API_KEY}&q=${city}`);

    if (response.status == 404) {
        // display Chicago 
    }
    else {
        var data = await response.json();
    }
    console.log(data);

    // data from json file 
    document.querySelector(".location")?.innerHTML = data.name;
    document.querySelector(".date")?.innerHTML = data.;
    document.querySelector(".temp")?.innerHTML = Math.round(data.main.temp) + "°C";
    
}

