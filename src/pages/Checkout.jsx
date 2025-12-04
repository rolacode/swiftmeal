// src/pages/Checkout.jsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase";
import { createCAMPCheckout } from "../lib/camp";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { meal } = location.state || {}; // get meal from router state
  const [loading, setLoading] = useState(false);

  if (!meal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No meal selected. Go back to <span className="text-orange-600 cursor-pointer" onClick={() => navigate("/buyer/dashboard")}>dashboard</span>.</p>
      </div>
    );
  }

  // -----------------------------------------
  //   HANDLE CAMP CRYPTO PAYMENT
  // -----------------------------------------
  const handleCryptoPay = async () => {
    try {
      setLoading(true);

      // 1. Save order in Firestore
      const orderRef = await addDoc(collection(db, "orders"), {
        buyerId: auth.currentUser.uid,
        sellerId: meal.sellerId,
        mealId: meal.id,
        amountUSD: meal.price,
        cryptoStatus: "pending",
        createdAt: Date.now(),
      });

      // 2. Create Camp checkout session
      const session = await createCAMPCheckout({
        amount: meal.price,
        reference: orderRef.id,
        successUrl: `http://localhost:5173/order-success?id=${orderRef.id}`,
        webhookUrl: "https://us-central1-swift-meals-aa4f1.cloudfunctions.net/campWebhook"
      });


      // 3. Redirect to CAMP hosted page
      window.location.href = session.paymentUrl;
    } catch (err) {
      console.error("CAMP payment failed:", err);
      alert("Crypto payment failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const createOrderLocal = (type) => {
    alert(`Order created locally using: ${type}`);
  };

  // -----------------------------------------
  //   RETURN UI (REACT COMPONENT)
  // -----------------------------------------
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <div className="flex flex-col sm:flex-row gap-4">
          <img
            src={meal.image}
            alt={meal.title}
            className="h-48 w-48 object-cover rounded"
          />

          <div className="flex-1">
            <h2 className="text-2xl font-semibold">{meal.title}</h2>
            <p className="text-gray-600 mt-2">{meal.description}</p>

            <div className="mt-4 flex items-center gap-4">
              <span className="text-2xl font-bold">₦{meal.price}</span>
              <span className="text-sm text-gray-500">
                Seller: {meal.sellerId}
              </span>
            </div>
          </div>
        </div>

        <hr className="my-4" />

        {/* Payment Options */}
        <div className="space-y-3">
          <h3 className="font-semibold">Payment</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              disabled={loading}
              onClick={handleCryptoPay}
              className="bg-indigo-600 text-white py-2 rounded"
            >
              {loading ? "Processing..." : "Pay with CAMP (Crypto)"}
            </button>

            <button
              disabled={loading}
              onClick={() => createOrderLocal("cash")}
              className="bg-white border py-2 rounded"
            >
              Cash on delivery
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-2">
            Note: CAMP integration requires Cloud Function webhook running.
          </p>
        </div>
      </div>
    </div>
  );
}
