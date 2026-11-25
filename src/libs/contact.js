// business logic tier
export async function contactInfo({ name, uicEmail, email, pickupDate }) {
  const scriptURL = import.meta.env.CONTACT_SCRIPT_URL;
  const scriptSecret = import.meta.env.CONTACT_SCRIPT_SECRET;

  if (!scriptURL || !scriptSecret) {
    throw new Error("Missing CONTACT_SCRIPT_URL or CONTACT_SCRIPT_SECRET");
  }

  const res = await fetch(scriptURL, {
    method: "POST",
    redirect: "follow",
    headers: { "Content-Type": "text/plain;charset=utf-8" }, // text/plain avoids a CORS preflight
    body: JSON.stringify({ 
      secret: scriptSecret,
      name,
      uicEmail,
      email,
      pickupDate,
    }),
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
}
