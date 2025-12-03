// src/pages/OrdersList.jsx
import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function OrdersList({ role }) {
  // role: "buyer" or "seller" — if omitted show both
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;
    const base = collection(db, "orders");
    let q;
    if (role === "seller") q = query(base, where("sellerId", "==", user.uid));
    else q = query(base, where("buyerId", "==", user.uid));

    const unsub = onSnapshot(q, (snap) => {
      setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, [user]);

  if (!user) return <div className="p-6">Login to see orders</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">{role === "seller" ? "Your Sales" : "Your Orders"}</h2>
      <div className="space-y-3">
        {orders.map(o => (
          <div key={o.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <div className="font-medium">Order: {o.orderId}</div>
              <div className="text-sm text-gray-600">Amount: ₦{o.amount} • Status: {o.status}</div>
            </div>
            <Link to={`/orders/${o.orderId}`} className="text-indigo-600">View</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
