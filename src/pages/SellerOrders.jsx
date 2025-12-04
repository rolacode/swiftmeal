import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function SellerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "orders"),
      where("sellerId", "==", auth.currentUser.uid)
    );

    const unsub = onSnapshot(q, (snap) => {
      setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return unsub;
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Crypto Orders</h1>

      {orders.map((o) => (
        <div key={o.id} className="border p-3 rounded mb-2">
          <p>Meal: {o.mealId}</p>
          <p>Amount: ${o.amountUSD}</p>
          <p>Status: <b>{o.cryptoStatus}</b></p>
          {o.txHash && <p>Tx: {o.txHash}</p>}
        </div>
      ))}
    </div>
  );
}
