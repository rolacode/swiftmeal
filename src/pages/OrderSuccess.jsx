import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function OrderSuccess() {
  const [params] = useSearchParams();
  const orderId = params.get("orderId");

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const loadOrder = async () => {
      const ref = doc(db, "orders", orderId);
      const snap = await getDoc(ref);
      if (snap.exists()) setOrder(snap.data());
    };

    loadOrder();

    // Auto-refresh every 3 seconds until confirmed
    const interval = setInterval(loadOrder, 3000);

    return () => clearInterval(interval);
  }, [orderId]);

  if (!order) return <p>Loading order…</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-3">Order Created 🎉</h1>
      <p>Order ID: <strong>{orderId}</strong></p>

      <div className="p-4 mt-4 border rounded bg-white shadow">
        <p className="text-lg font-semibold">Status:</p>
        <p className="text-xl font-bold text-blue-600">{order.status}</p>

        {order.paymentUrl && (
          <a
            href={order.paymentUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded"
          >
            Complete Payment
          </a>
        )}

        {order.txHash && (
          <p className="mt-4 text-sm text-gray-600">
            Blockchain Transaction: <br />
            <span className="break-all">{order.txHash}</span>
          </p>
        )}
      </div>
    </div>
  );
}
