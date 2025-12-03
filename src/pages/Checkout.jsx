// src/pages/Checkout.jsx
import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function Checkout() {
  const [params] = useSearchParams();
  const mealId = params.get("mealId");
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!mealId) return;
    (async () => {
      const snap = await getDoc(doc(db, "meals", mealId));
      if (!snap.exists()) return alert("Meal not found");
      setMeal({ id: snap.id, ...snap.data() });
    })();
  }, [mealId]);

  if (!meal) return <div className="p-6">Loading...</div>;

  const createOrderLocal = async (paymentMethod) => {
    if (!user) return navigate("/login");
    setLoading(true);
    try {
      const orderId = `order_${Date.now()}`;
      // Create order doc with pending status
      await setDoc(doc(db, "orders", orderId), {
        orderId,
        mealId: meal.id,
        sellerId: meal.sellerId,
        buyerId: user.uid,
        amount: meal.price,
        status: paymentMethod === "camp" ? "pending_payment" : "pending",
        paymentMethod,
        createdAt: Date.now()
      });

      if (paymentMethod === "camp") {
        // call function to create CAMP payment
        const resp = await fetch("/__/cloud-functions/createCampPayment", { // adapt URL - use your function endpoint
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId, amount: meal.price, buyerId: user.uid })
        });
        const data = await resp.json();

        if (data.paymentUrl) {
          // redirect buyer to payment UI (CAMP hosted page)
          window.location.href = data.paymentUrl;
        } else {
          alert("Failed to initiate payment");
        }
      } else {
        // cash on delivery flow - simply go to order page
        navigate(`/orders/${orderId}`);
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <div className="flex flex-col sm:flex-row gap-4">
          <img src={meal.image} alt={meal.title} className="h-48 w-48 object-cover rounded" />
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">{meal.title}</h2>
            <p className="text-gray-600 mt-2">{meal.description}</p>
            <div className="mt-4 flex items-center gap-4">
              <span className="text-2xl font-bold">₦{meal.price}</span>
              <span className="text-sm text-gray-500">Seller: {meal.sellerId}</span>
            </div>
          </div>
        </div>

        <hr className="my-4" />

        <div className="space-y-3">
          <h3 className="font-semibold">Payment</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button disabled={loading} onClick={()=>createOrderLocal("camp")} className="bg-indigo-600 text-white py-2 rounded">Pay with CAMP (crypto)</button>
            <button disabled={loading} onClick={()=>createOrderLocal("cash")} className="bg-white border py-2 rounded">Cash on delivery</button>
          </div>

          <p className="text-xs text-gray-500 mt-2">Note: CAMP integration requires server function and webhook configured.</p>
        </div>
      </div>
    </div>
  );
}
