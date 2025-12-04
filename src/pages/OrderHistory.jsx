// src/pages/OrderHistory.jsx
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db, auth } from "../firebase";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(
          collection(db, "orders"),
          where("buyerId", "==", auth.currentUser.uid),
          orderBy("createdAt", "desc")
        );
        const snap = await getDocs(q);
        setOrders(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error(err);
        alert("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="p-6">Loading orders...</div>;

  if (!orders.length)
    return <div className="p-6">You have not placed any orders yet.</div>;

  return (
    <div className="p-6 space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
          <div>
            <h3 className="font-semibold">Order: {order.id}</h3>
            <p className="text-gray-500">Amount: ₦{order.amountUSD}</p>
            <p className="text-gray-500">Status: {order.cryptoStatus || order.status || "pending"}</p>
          </div>
          <button className="bg-orange-600 text-white px-3 py-1 rounded" onClick={() => alert("Reorder functionality coming soon!")}>
            Reorder
          </button>
        </div>
      ))}
    </div>
  );
}
