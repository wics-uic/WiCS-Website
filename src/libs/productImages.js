import { parse } from "csv-parse/sync";

const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRXDjy_7F_EIXKaUX42jDb3_SbY5vlvi-cmDYEc_2p2aMfv9DX7VyQYPdpIEubE_oSJM5EcekznflmX/pub?output=csv";

const images = import.meta.glob("/src/assets/merch/**/*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});

function resolveImage(imageName){
    if (!imageName) return null;
    const key = '/src/assets/${imageName}';
    return images[key] ?? null;
}

// Get API for product images & sizing options (if applicable)
export async function getProductImages(id){
    const res = await fetch (SHEET_CSV_URL);

    if (!res.ok){
       throw new Error('Fail to fetch sheet: ${res.status}'); 
    }

    const csvText = await res.text();
    const rows = parse(csvText, {columns: true, skip_empty_lines: true, trim: true});

    const productInfo = rows.filter((r) => string(r.id))
    
    if (productInfo == 0){
        return null
    }

    return{
        id: productInfo.id,
        images: resolveImage(productInfo.picture),
        sizeOptions: productInfo.size_options ?? ""
    };
}