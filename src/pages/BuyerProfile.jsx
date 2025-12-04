// src/pages/BuyerProfile.jsx
import React, { useState } from "react";
import { auth } from "../firebase";

export default function BuyerProfile() {
  const [displayName, setDisplayName] = useState(auth.currentUser.displayName || "");
  const [email] = useState(auth.currentUser.email);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await auth.currentUser.updateProfile({ displayName });
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
      <label className="block mb-2">
        Name
        <input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full border rounded px-3 py-2 mt-1"
        />
      </label>
      <label className="block mb-4">
        Email
        <input value={email} disabled className="w-full border rounded px-3 py-2 mt-1 bg-gray-100" />
      </label>
      <button
        onClick={handleSave}
        disabled={loading}
        className="bg-orange-600 text-white py-2 px-4 rounded"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
