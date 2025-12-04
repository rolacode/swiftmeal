const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.campWebhook = functions.https.onRequest(async (req, res) => {
  try {
    const body = req.body;

    console.log("🔥 CAMP Webhook Received:", JSON.stringify(body));

    if (!body.reference) {
      return res.status(400).send("Missing payment reference");
    }

    const orderId = body.reference;

    let status = "pending";
    if (body.event === "payment.success") status = "paid";
    if (body.event === "payment.failed") status = "failed";

    await db.collection("orders").doc(orderId).update({
      cryptoStatus: status,
      txHash: body.txHash || null,
      amountPaid: body.amount || null,
      token: body.token || "USDC",
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log(`✅ Order Updated → ${orderId} (${status})`);

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error("Webhook Error:", err);
    return res.status(500).send("Webhook error");
  }
});
