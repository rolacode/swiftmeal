import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);
  }, []);

  const remove = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const updateQty = (id, qty) => {
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, qty } : item
    );
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const goToCheckout = () => {
    navigate("/checkout");
  };

  if (cart.length === 0)
    return <p className="p-6 text-center">Your cart is empty.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>

      <div className="space-y-4">
        {cart.map((meal) => (
          <div className="flex gap-4 border p-4 rounded bg-white" key={meal.id}>
            <img
              src={meal.imageUrl}
              className="w-24 h-24 rounded object-cover"
            />

            <div className="flex-1">
              <h2 className="font-semibold text-lg">{meal.name}</h2>
              <p>${meal.price}</p>

              <select
                value={meal.qty}
                onChange={(e) => updateQty(meal.id, Number(e.target.value))}
                className="mt-2 border p-1"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>

              <button
                onClick={() => remove(meal.id)}
                className="block mt-2 text-red-500"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 border rounded">
        <p className="text-lg font-semibold">Subtotal: ${subtotal.toFixed(2)}</p>

        <button
          onClick={goToCheckout}
          className="mt-3 px-4 py-2 bg-green-600 text-white rounded"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
