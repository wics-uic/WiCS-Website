import { parse } from "csv-parse/sync";

const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1H428qFH-mfz4Zwlp28o8lc9hij1syosRZCDA-i-YjkU/export?format=csv";

export async function getMerchFP() {
    const res = await fetch(SHEET_CSV_URL);
    if(!res.ok) {
        throw new Error("Failed to fetch product name, price, and image");
    }

    const rows = parse(await res.text(), {
        skip_empty_lines: true,
        trim: true,
        bom: true,
    });

    if(rows.length === 0) {
        return [];
    }

    const nameColumn = rows[0].findIndex(
        (header) => header.trim().toLowerCase() === "merch_name"
    )
    const pictureColumn = rows[0].findIndex(
        (header) => header.trim().toLowerCase() === "merch_picture"
    )
    const priceColumn = rows[0].findIndex(
        (header) => header.trim().toLowerCase() === "merch_price"
    )
    const idColumn = rows[0].findIndex(
        (header) => header.trim().toLowerCase() === "id"
    )

    // if(nameColumn === -1 || pictureColumn === -1 || priceColumn === -1 || idColumn === -1) {
    //     throw new Error(`The published CSV needs a missing column: ${}`)
    // }
    if(nameColumn === -1 ) {
        throw new Error(`The published CSV needs a missing column: merch_name`);
    } else if (pictureColumn === -1) {
        throw new Error(`The published CSV needs a missing column: merch_picture`);
    } else if (priceColumn === -1 ) {
        throw new Error(`The published CSV needs a missing column: merch_price`);
    } else if (idColumn === -1){
        throw new Error(`The published CSV needs a missing column: id`);
    }
    const products = rows.slice(1).map((row) => ({
        id: String(row[idColumn] ?? "").trim(),
        name: String(row[nameColumn] ?? "").trim(),
        image: String(row[pictureColumn] ?? "").trim(),
        price: String(row[priceColumn] ?? "").trim()

    })); 

    const seenIDs = new Set();
    for (const product of products) {
        if(!product.id) {
            throw new Error(`Missing ID for product: ${product.name}`);
        }
        if(seenIDs.has(product.id)) {
            throw new Error(`Duplicate product ID spotted: ${product.id}`);
        }

        seenIDs.add(product.id);
    }

    return products;
}

