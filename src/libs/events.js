import { parse } from "csv-parse/sync";

const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5qJ7NAJXhuqx82Dvt2B-5vKFDkULGpfWx5UTzvD9sZPUcBKBXgCEWTe4DkAGTe0hyItpGYr5nUl5x/pub?gid=0&single=true&output=csv";

// Matches your existing `?url` import pattern — returns plain URL strings, not Image objects
const images = import.meta.glob("/src/assets/events/**/*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});

function resolveImage(imageLocation) {
  if (!imageLocation) return null;
  const key = `/src/assets/events/post-update/${imageLocation}`;
  return images[key] ?? null;
}

// Parses "DD/MM/YYYY" into a real Date object for comparison/sorting
function parseDate(dateStr) {
    const [month, day, year] = dateStr.split("/").map(Number); // M/D/YYYY
    return new Date(year, month - 1, day);
  }

export async function getEvents() {
  const res = await fetch(SHEET_CSV_URL);
  if (!res.ok) throw new Error(`Failed to fetch events sheet: ${res.status}`);
  const csvText = await res.text();

  const rows = parse(csvText, { columns: true, skip_empty_lines: true, trim: true });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const withParsedDates = rows
    .filter((r) => r.name && r.date)
    .map((r) => ({
      ...r,
      image: resolveImage(r.imageLocation),
      _parsedDate: parseDate(r.date),
    }));

  return {
    upcoming: withParsedDates
      .filter((r) => r._parsedDate >= today)
      .sort((a, b) => a._parsedDate - b._parsedDate),
    past: withParsedDates
      .filter((r) => r._parsedDate < today)
      .sort((a, b) => b._parsedDate - a._parsedDate),
  };
}