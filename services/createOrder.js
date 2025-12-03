// src/services/createOrder.js
import axios from "axios";
import { db } from "../src/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc as docRef,
} from "firebase/firestore";

// --------------------
// CONFIG — replace with your CAMP details
// --------------------
const CAMP_API_KEY = "YOUR_CAMP_API_KEY"; // replace
const CAMP_CREATE_ORDER_URL = "https://api.camp.money/v1/orders"; // replace with real endpoint

// --------------------
// placeOrder: create Firestore order, call CAMP, attach payment info
// --------------------
export async function placeOrder(meal, buyer) {
  try {
    // 1) create pending order in Firestore
    const orderDocRef = await addDoc(collection(db, "orders"), {
      mealId: meal.id,
      mealName: meal.name,
      priceUSD: meal.price,
      sellerId: meal.sellerId || meal.sellerUid || meal.seller, // be flexible
      buyerId: buyer.uid,
      status: "pending",
      createdAt: serverTimestamp(),
    });

    const orderId = orderDocRef.id;

    // 2) send request to CAMP (server-side API)
    // The exact CAMP API shape depends on their docs. This is a typical example.
    const res = await axios.post(
      CAMP_CREATE_ORDER_URL,
      {
        orderId,
        amount: meal.price,
        currency: "USD", // or "CAMP" / token as required by CAMP
        description: `Payment for ${meal.name}`,
        metadata: { mealId: meal.id, sellerId: meal.sellerId || meal.sellerUid },
        // optionally return_url: `${CLIENT_URL}/order-success?orderId=${orderId}`
      },
      {
        headers: {
          Authorization: `Bearer ${CAMP_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Expectation: CAMP responds with payment info (url, ref, address etc.)
    const payment = res.data.payment || res.data; // adjust based on actual API

    // 3) update order with payment details
    await updateDoc(orderDocRef, {
      paymentUrl: payment.url || payment.payment_url || null,
      campRef: payment.ref || payment.id || null,
      paymentRaw: payment,
    });

    // 4) return orderId + payment info to client
    return { orderId, payment };
  } catch (err) {
    // surface useful error info
    const info = err.response?.data || err.message || err;
    console.error("placeOrder error:", info);
    throw err;
  }
}
