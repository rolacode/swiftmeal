// src/pages/BuyerDashboard.jsx
import React from "react";

export default function BuyerDashboard() {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Buyer Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">Saved meals</div>
          <div className="bg-white p-4 rounded shadow">Orders</div>
          <div className="bg-white p-4 rounded shadow">Profile</div>
        </div>
      </div>
    </div>
  );
}
