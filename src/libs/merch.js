import { parse } from "csv-parse/sync";

const ALL_MERCH_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRXDjy_7F_EIXKaUX42jDb3_SbY5vlvi-cmDYEc_2p2aMfv9DX7VyQYPdpIEubE_oSJM5EcekznflmX/pub?gid=0&single=true&output=csv";

const PER_MERCH_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRXDjy_7F_EIXKaUX42jDb3_SbY5vlvi-cmDYEc_2p2aMfv9DX7VyQYPdpIEubE_oSJM5EcekznflmX/pub?gid=1392276876&single=true&output=csv";

// Import merchandise images
const images = import.meta.glob("/src/assets/merch/**/*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});

function resolveImage(imageLocation) {
  if (!imageLocation) return null;

  const key = `/src/assets/merch/${imageLocation}`;
  const image = images[key];

  return typeof image === "string" ? image : null;
}

// Fetch and parse CSV data
async function fetchSheet(url) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch merch sheet: ${res.status}`);
  }

  const csvText = await res.text();

  return parse(csvText, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    bom: true,
  });
}

// GET all merch
export async function getMerch() {
  const [merch, variations] = await Promise.all([
    fetchSheet(ALL_MERCH_CSV_URL),
    fetchSheet(PER_MERCH_CSV_URL),
  ]);

  return merch
    .filter((r) => r.merch_name && r.id)
    .map((r) => ({
      id: Number(r.id),
      is_wearable: r.is_wearable?.toLowerCase() === "true",
      merch_name: r.merch_name,
      merch_price: r.merch_price ? Number(r.merch_price) : null,
      merch_picture: resolveImage(r.merch_picture),
      merch_description: r.merch_description ?? "",
      is_available: r.is_available?.toLowerCase() === "true",
      is_limited_edition: r.is_limited_edition?.toLowerCase() === "true",
      date_removed: r.date_removed || null,

      variations: variations
        .filter((v) => v.id === r.id)
        .map((v) => ({
          picture: resolveImage(v.picture),
          size: v["size option"] || null,
        })),
    }));
}