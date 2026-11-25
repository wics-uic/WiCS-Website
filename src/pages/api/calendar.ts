
import type { APIRoute } from 'astro';

const SHEET_ID = '1H428qFH-mfz4Zwlp28o8lc9hij1syosRZCDA-i-YjkU';
const SHEET_GID = '0';

// Converts CSV(willl be for short for comma separated values ;)lol ) text into rows and columns
function parseCSV(csv: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let value = '';
  let insideQuotes = false;

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    const next = csv[i + 1];

    if (char === '"' && insideQuotes && next === '"') {
      value += '"';
      i++;
    } else if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === ',' && !insideQuotes) {
      row.push(value);
      value = '';
    } else if ((char === '\n' || char === '\r') && !insideQuotes) {
      if (char === '\r' && next === '\n') i++;

      row.push(value);

      if (row.some(cell => cell.trim() !== '')) {
        rows.push(row);
      }

      row = [];
      value = '';
    } else {
      value += char;
    }
  }

  row.push(value);

  if (row.some(cell => cell.trim() !== '')) {
    rows.push(row);
  }

  return rows;
}

export const GET: APIRoute = async () => {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Google Sheets returned status ${response.status}`
      );
    }

    const csv = await response.text();

    // Check whether Google returned a sign-in page instead of CSV
    if (
      csv.trim().startsWith('<!DOCTYPE html') ||
      csv.trim().startsWith('<html')
    ) {
      throw new Error(
        'Google returned an HTML page instead of CSV. Check your spreadsheet sharing permissions.'
      );
    }

    const rows = parseCSV(csv);

    if (rows.length === 0) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const headers = rows[0].map(header => header.trim());

    if (headers.every(header => header === '')) {
      throw new Error('Your Google Sheet is missing column headers.');
    }

   const products = rows.slice(1)
  .map(row => {
    const product: Record<string, string> = {};

    headers.forEach((header, index) => {
      if (header) {
        product[header] = row[index]?.trim() ?? '';
      }
    });

    return product;
  })
  .filter(product => product.merch_name?.trim() !== '');

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Past products API error:', error);

    return new Response(
      JSON.stringify({
        error: error instanceof Error
          ? error.message
          : String(error),
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};
