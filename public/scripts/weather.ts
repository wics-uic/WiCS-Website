import type { APIRoute } from "astro";
// const API_KEY = import.meta.env.WEATHER_API_KEY;
// const API_URL = import.meta.env.WEATHER_API_URL;
const API_KEY = "315162c22a7656116cbad3b7a28fcf25";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric";

export const GET: APIRoute = async({url}) => {
    const city = url.searchParams.get("city") ?? "chicago";
    const response = await fetch(`${API_URL}&appid=${API_KEY}&q=${city}`);

    if (!response.ok) {
        return new Response(JSON.stringify({ error: "City not found" }), { status: 404});
    }

    const data = await response.json();
    return new Response(JSON.stringify(data));
}