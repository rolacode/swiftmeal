// functions/campWebhook.js
const functions = require("firebase-functions");
const admin = require("firebase-admin");

if (!admin.apps.length) admin.initializeApp();
const db = admin.firestore();

/**
 * CAMP webhook endpoint.
 * CAMP should POST JSON like: { orderId: "...", status: "confirmed", ... }
 * Update Firestore order document accordingly.
 */
exports.campWebhook = functions.https.onRequest(async (req, res) => {
  try {
    const body = req.body || {};
    const { orderId, status, paymentRef } = body;

    if (!orderId) {
      res.status(400).send("Missing orderId");
      return;
    }

    const orderRef = db.collection("orders").doc(orderId);

    if (status === "confirmed" || status === "paid") {
      await orderRef.update({
        status: "paid",
        paidAt: admin.firestore.Timestamp.now(),
        paymentRef: paymentRef || body.payment?.id || null,
        campWebhookRaw: body,
      });
      // Optionally increment seller sales, notify seller, etc.
      res.status(200).send("ok");
      return;
    }

    // handle other statuses
    await orderRef.update({
      status: status || "unknown",
      campWebhookRaw: body,
    });

    res.status(200).send("ok");
  } catch (err) {
    console.error("campWebhook error:", err);
    res.status(500).send("error");
  }
});
