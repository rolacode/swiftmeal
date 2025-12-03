const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

// ----------------------------
// 1️⃣ CAMP PAYMENT WEBHOOK
// ----------------------------
exports.campWebhook = functions.https.onRequest(async (req, res) => {
  try {
    const event = req.body;

    if (!event || !event.orderId) {
      return res.status(400).send("Invalid payload");
    }

    const { orderId, status, txHash, amount } = event;

    await db.collection("orders").doc(orderId).update({
      status: status || "unknown",
      txHash: txHash || null,
      amountPaid: amount || null,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log("Updated order:", orderId, "→", status);

    return res.status(200).send("OK");
  } catch (err) {
    console.error("Webhook Error:", err);
    return res.status(500).send("Server Error");
  }
});
