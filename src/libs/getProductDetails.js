import { parse } from "csv-parse/sync";

const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1H428qFH-mfz4Zwlp28o8lc9hij1syosRZCDA-i-YjkU/export?format=csv";
export async function getProductDetails(productId) {
    const res = await fetch(SHEET_CSV_URL);

    if (!res.ok) {
        throw new Error(`Failed to fetch sheet: ${res.status}`);
    }

    const csvText = await res.text();

    const rows = parse(csvText, {
        columns: true,
        skip_empty_lines: true,
        trim: true
    });

    const product = rows.find((r) => r.id === String(productId));

    if (!product) {
        return null;
    }

    return {
        price: product.merch_price,
        description: product.merch_description,
        inStock: product.is_available
    };
}