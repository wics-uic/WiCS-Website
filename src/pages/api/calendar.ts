import { google } from "googleapis";
import type { APIRoute } from "astro";
const GOOGLE_SERVICE_ACCOUNT_EMAIL = import.meta.env
  .GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = import.meta.env.GOOGLE_PRIVATE_KEY;
const GOOGLE_CALENDAR_ID = import.meta.env.GOOGLE_CALENDAR_ID;

export const prerender = false; // Disables prerendering, making the API dynamic

export const GET: APIRoute = async () => {
  // Authenticate using a Google service account
  const auth = new google.auth.JWT({
    email: GOOGLE_SERVICE_ACCOUNT_EMAIL, // Service account email
    key: GOOGLE_PRIVATE_KEY, // Private key with line breaks fixed
    scopes: ["https://www.googleapis.com/auth/calendar.readonly"], // Grants read-only access to Google Calendar events
  });

  // Initialize Google Calendar API client
  const calendar = google.calendar({ version: "v3", auth });

  // Fetch upcoming calendar events
  const { data } = await calendar.events.list({
    calendarId: GOOGLE_CALENDAR_ID, // Target calendar email
    timeMin: new Date().toISOString(), // Fetch events starting from the current time
    maxResults: 10, // Limit the number of events to 10
    singleEvents: true, // Ensures recurring events are split into single occurrences
    orderBy: "startTime", // Orders events by their start time
  });

  // Return fetched events as a JSON response
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
};
