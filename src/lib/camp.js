const BASE_URL = "https://api.campnetwork.xyz";

export async function createCAMPCheckout({ amount, reference, successUrl, webhookUrl }) {
  const res = await fetch(`${BASE_URL}/payments/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": import.meta.env.VITE_CAMP_API_KEY
    },
    body: JSON.stringify({
      amount,
      currency: "USD",
      token: "USDC",
      reference,
      successUrl,
      webhookUrl
    })
  });

  if (!res.ok) {
    throw new Error("Failed to create CAMP checkout");
  }

  return res.json();
}
