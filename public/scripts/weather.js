async function checkWeather(city) {
    try {
        const res = await fetch(`/api/weather?city=${city}`);
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();

        document.querySelector(".location").textContent = `${data.name}, ${data.sys.country}`;
        document.querySelector(".date").textContent = new Date().toLocaleDateString('en-US', { weekday: 'long' });

        const tempCelsius = Math.round(data.main.temp);
        document.querySelector(".degree-cel").textContent = `${tempCelsius}°C`;

        const tempF = Math.round((tempCelsius * 9/5) + 32);
        document.querySelector(".degree-fahre").textContent = `${tempF} F`;

        document.querySelector(".description").textContent =
        data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);

        const weatherIcon = document.querySelector(".weather-img");
        const weatherCondition = data.weather[0].main.toLowerCase();

        const iconMap = {
        clouds: "clouds.png",
        clear: "clear.png",
        rain: "rain.png",
        drizzle: "drizzle.png",
        mist: "mist.png",
        };

        for (const condition in iconMap) {
        if (weatherCondition.includes(condition)) {
            weatherIcon.src = `/src/assets/weather-images/${iconMap[condition]}`;
            break;
        }
        }
    } catch (err) {
        console.error("Weather fetch error:", err.message);
    }    
}

window.addEventListener("DOMContentLoaded", () => {
    checkWeather("Chicago");
});