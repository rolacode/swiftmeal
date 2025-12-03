// functions/createCampPayment.js (firebase functions - Express or https.onRequest)
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch"); // install node-fetch if needed

admin.initializeApp();
const CAMP_API = process.env.CAMP_API || "https://api.camp.network";
const CAMP_SECRET = process.env.CAMP_SECRET; // set in functions environment

exports.createCampPayment = functions.https.onRequest(async (req, res) => {
  try {
    const { orderId, amount, buyerId } = req.body;
    if (!orderId || !amount) return res.status(400).send({ error: "missing" });

    // Example payload - adapt to CAMP's real API
    const resp = await fetch(`${CAMP_API}/payments`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${CAMP_SECRET}` },
      body: JSON.stringify({
        amount,
        currency: "CAMP",
        metadata: { orderId, buyerId },
        webhookUrl: `https://us-central1-${process.env.GCLOUD_PROJECT}.cloudfunctions.net/campWebhook`
      })
    });

    const data = await resp.json();
    return res.status(200).send(data);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: err.message });
  }
});
