import React, { useState } from "react";

export default function OrderTracking() {
  const [trackingId, setTrackingId] = useState("");
  const [status, setStatus] = useState(null);

  const handleTrack = () => {
    if (!trackingId) return;
    // Dummy status
    setStatus("On The Way");
  };

  return (
    <div className="pt-28 pb-20 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Track Your Order
        </h1>

        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Enter Tracking ID"
            className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
          />

          <button
            onClick={handleTrack}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white p-3 rounded"
          >
            Track Order
          </button>
        </div>

        {status && (
          <div className="mt-6 p-4 bg-green-100 dark:bg-green-800 text-center rounded-md">
            <p className="text-lg font-semibold text-green-700 dark:text-green-200">
              Status: {status}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
