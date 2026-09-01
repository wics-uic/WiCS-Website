import { parse } from "csv-parse/sync";

const RESOURCES_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5qJ7NAJXhuqx82Dvt2B-5vKFDkULGpfWx5UTzvD9sZPUcBKBXgCEWTe4DkAGTe0hyItpGYr5nUl5x/pub?gid=2000020820&single=true&output=csv";

export async function getResourceGroups() {
  const res = await fetch(RESOURCES_CSV_URL);
  if (!res.ok) throw new Error(`Failed to fetch resources sheet: ${res.status}`);
  const csvText = await res.text();

  const rows = parse(csvText, { columns: true, skip_empty_lines: true, trim: true });

  // Group rows by the "group" column, preserving sheet order
  const groupsMap = new Map();

  for (const row of rows) {
    if (!row.group || !row.label || !row.url) continue; // skip incomplete rows

    if (!groupsMap.has(row.group)) {
      groupsMap.set(row.group, []);
    }
    groupsMap.get(row.group).push({ label: row.label, url: row.url });
  }

  // Convert to an array of { name, items } in first-seen order
  return Array.from(groupsMap.entries()).map(([name, items]) => ({ name, items }));
}