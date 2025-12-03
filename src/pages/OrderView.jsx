// src/pages/OrderView.jsx
import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function OrderView() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      const snap = await getDoc(doc(db, "orders", orderId));
      if (!snap.exists()) return alert("Order not found");
      setOrder({ id: snap.id, ...snap.data() });
    })();
  }, [orderId]);

  const updateStatus = async (newStatus) => {
    if (!order) return;
    await updateDoc(doc(db, "orders", order.id), { status: newStatus, updatedAt: Date.now() });
    setOrder(prev => ({ ...prev, status: newStatus }));
  };

  if (!order) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-semibold">Order {order.orderId}</h2>
      <p className="text-sm text-gray-600 mt-2">Status: <strong>{order.status}</strong></p>
      <div className="mt-4 space-y-2">
        <div>Meal: {order.mealId}</div>
        <div>Amount: ₦{order.amount}</div>
        <div>Buyer: {order.buyerId}</div>
        <div>Seller: {order.sellerId}</div>
      </div>

      {user?.uid === order.sellerId && (
        <div className="mt-4 flex gap-2">
          <button onClick={()=>updateStatus("preparing")} className="px-3 py-2 bg-yellow-400 rounded">Mark preparing</button>
          <button onClick={()=>updateStatus("on_the_way")} className="px-3 py-2 bg-indigo-600 text-white rounded">Mark on the way</button>
          <button onClick={()=>updateStatus("completed")} className="px-3 py-2 bg-green-600 text-white rounded">Complete</button>
        </div>
      )}
    </div>
  );
}
