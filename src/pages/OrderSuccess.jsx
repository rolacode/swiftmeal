import { useSearchParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function OrderSuccess() {
  const [params] = useSearchParams();
  const id = params.get("id");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    async function load() {
      const snap = await getDoc(doc(db, "orders", id));
      if (snap.exists()) setOrder(snap.data());
    }
    load();
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Payment Success</h1>

      <p>Order ID: {id}</p>
      <p>Status: {order.cryptoStatus}</p>
      <p>Amount Paid: ${order.amountPaid}</p>
      <p>Token: {order.token}</p>

      <a
        href={`https://camp.cloud.blockscout.com/tx/${order.txHash}`}
        className="text-blue-600 underline"
        target="_blank"
      >
        View on Explorer
      </a>
    </div>
  );
}
