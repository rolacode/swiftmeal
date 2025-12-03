// src/pages/SellerDashboard.jsx
import React from "react";
import SellerOnboard from "./SellerOnboard";

export default function SellerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Seller Dashboard</h1>
          <p className="text-sm text-gray-600">Manage your meals and orders</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SellerOnboard />
          </div>

          <aside className="bg-white rounded p-4 shadow">
            <h3 className="font-semibold">Stats</h3>
            <div className="mt-3 space-y-2">
              <div className="flex justify-between"><span>Meals</span><strong>12</strong></div>
              <div className="flex justify-between"><span>Orders</span><strong>3</strong></div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
