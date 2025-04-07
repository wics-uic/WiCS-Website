import type { APIRoute } from "astro";
const GOOGLE_API_KEY = import.meta.env.GOOGLE_API_KEY;
const GOOGLE_SHEET_ID = import.meta.env.GOOGLE_SHEET_ID;
const sheetName = 'Sheet1';
export const prerender = false; // Disables prerendering, making the API dynamic

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
      `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${sheetName}?key=${GOOGLE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Sheet data:', data);
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