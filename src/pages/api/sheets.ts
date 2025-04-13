export const prerender = false; // *Important* astro pages by default are static. This disables it
import type { APIRoute } from "astro";
import {google} from 'googleapis';
//const GOOGLE_SHEETS_CREDENTIALS = JSON.parse(import.meta.env.GOOGLE_SHEETS_CREDENTIALS);
const googleCreds = import.meta.env.GOOGLE_SHEETS_CREDENTIALS;
const GOOGLE_SHEET_ID= import.meta.env.GOOGLE_SHEET_ID;
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

if(!googleCreds){ //empty
    throw new Error('Missing / invalid credentials!');
}
const GOOGLE_SHEETS_CREDENTIALS = JSON.parse(googleCreds);
//Authoritize the app to access Google Sheets API using the service account
async function authorize(){
   const auth = new google.auth.GoogleAuth({
       credentials: GOOGLE_SHEETS_CREDENTIALS, //Determnines if the app is allowed to use google sheets
       scopes: SCOPES,
   });
   return await auth.getClient();
}


/**
* Appends values in a Spreadsheet.
* @param {string} spreadsheetId The spreadsheet ID.
* @param {string} range The range of values to append.
* @param {object} valueInputOption Value input options.
* @param {(string[])[]} _values A 2d array of values to append.
* @return {obj} spreadsheet information
*/
async function appendValues(
   auth: any,
   spreadsheetId: string,
   range: string,
   valueInputOption: string,
   values: string[][]
){
   const service = google.sheets({ version: 'v4', auth });
   const resource = {
       values,
   };
   try {
       const result = await service.spreadsheets.values.append({
           spreadsheetId,
           range,
           valueInputOption,
           requestBody: resource,
       });


       console.log(`${result.data.updates?.updatedCells || 0} cells appended.`);
       return result;
   } catch (err) {
       console.error('Append Error:', err);
       throw err;
   }
}


//Astro API
export const POST: APIRoute = async ({request}) => {
   try{
       const body = await request.json();
       const values = [
           [
               body.firstName,
               body.lastName,
               body.email,
               body.feedback
           ]
       ];


       //Appends the data in the Google Sheets
       const auth = await authorize(); //Get permission to use Google Sheets API
       const result = await appendValues(
           auth,
           GOOGLE_SHEET_ID,
           'Sheet1!A:D',
           'USER_ENTERED',
           values
       );


       return new Response(JSON.stringify({
           message: 'Form Appended Success!',
       }), {
           status: 200,
           headers: { 'Content-Type': 'application/json' }
       });
   } catch (error) {
       console.error('Submission error:', error);
       return new Response(JSON.stringify({
           error: 'Form Submission Failed',
       }), {
           status: 500,
           headers: { 'Content-Type': 'application/json' }
       });
   }
}
