import React from "react";
import { useState } from "react";

export default function OrderTracking() {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState(null);

  const fakeOrderStatus = {
    "12345": "Order confirmed, preparing your food.",
    "67890": "Out for delivery, expected to arrive soon.",
    "11111": "Delivered. Thank you for your purchase!",
  };

  const handleTrack = (e) => {
    e.preventDefault();
    const trackStatus = fakeOrderStatus[orderId];
    setStatus(trackStatus || "Order ID not found. Please check and try again.");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-start py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Order Tracking</h1>
      <form
        onSubmit={handleTrack}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
      >
        <label htmlFor="orderId" className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold">
          Enter your Order ID:
        </label>
        <input
          id="orderId"
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
          required
          placeholder="e.g. 12345"
        />
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-semibold"
        >
          Track Order
        </button>
      </form>
      {status && (
        <div className="mt-6 max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 text-center text-gray-900 dark:text-white font-medium">
          {status}
        </div>
      )}
    </div>
  );
}

