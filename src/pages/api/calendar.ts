import type { APIRoute } from "astro";
const GOOGLE_API_KEY = import.meta.env.GOOGLE_API_KEY;
const GOOGLE_CALENDAR_ID = import.meta.env.GOOGLE_CALENDAR_ID;

export const prerender = false; // Disables prerendering, making the API dynamic

console.log("GOOGLE_API_KEY:", GOOGLE_API_KEY);
console.log("GOOGLE_CALENDAR_ID:", GOOGLE_CALENDAR_ID);
export const GET: APIRoute = async () => {
  try {
    const params = new URLSearchParams({
      key: GOOGLE_API_KEY,
      timeMin: new Date().toISOString(),
      maxResults: "10",
      singleEvents: "true",
      orderBy: "startTime",
    });

    const response = await fetch(
      https://www.googleapis.com/calendar/v3/calendars/${GOOGLE_CALENDAR_ID}/events?${params.toString()}
    );

    if (!response.ok) {
      throw new Error(Failed to fetch events: ${response.statusText});
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};