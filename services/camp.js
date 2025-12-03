const CAMP_API = "https://api.camp.network/payments";
const CAMP_SECRET = import.meta.env.VITE_CAMP_SECRET; // store in .env

export async function createCampPayment({ orderId, amount, buyerId }) {
  const res = await fetch(CAMP_API + "/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CAMP_SECRET}`,
    },
    body: JSON.stringify({
      orderId,
      amount,
      metadata: { buyerId },
      currency: "CAMP",
    }),
  });

  return await res.json();
}
