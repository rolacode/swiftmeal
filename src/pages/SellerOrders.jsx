import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function SellerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) return;

    const sellerId = auth.currentUser.uid;

    const q = query(
      collection(db, "orders"),
      where("sellerId", "==", sellerId)
    );

    return onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setOrders(data);
    });
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📦 Incoming Orders</h1>

      {orders.length === 0 && <p>No orders yet.</p>}

      <div className="space-y-4">
        {orders.map((o) => (
          <div
            key={o.id}
            className="p-4 border rounded bg-white shadow"
          >
            <h2 className="text-xl font-semibold">{o.mealName}</h2>

            <p>Status: <span className="font-bold">{o.status}</span></p>
            <p>Buyer: {o.buyerId}</p>

            {o.txHash && (
              <p className="text-sm text-gray-600 break-all">
                TxHash: {o.txHash}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
