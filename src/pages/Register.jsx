import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [accountType, setAccountType] = useState("buyer");

  const handleSocialLogin = (provider) => {
    alert(`Fake ${provider} signup for ${accountType}`);
  };

  const toggleAccountType = () => {
    setAccountType(prev => (prev === "buyer" ? "seller" : "buyer"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
          Register as {accountType.charAt(0).toUpperCase() + accountType.slice(1)}
        </h2>

        <button
          onClick={toggleAccountType}
          className="mb-4 w-full bg-gray-300 dark:bg-gray-700 py-2 rounded text-center font-semibold hover:bg-gray-400 dark:hover:bg-gray-600"
        >
          Switch to {accountType === "buyer" ? "Seller" : "Buyer"}
        </button>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Register
          </button>
        </form>

        <div className="mt-6 space-y-2">
          <button
            onClick={() => handleSocialLogin("Facebook")}
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Register with Facebook
          </button>
          <button
            onClick={() => handleSocialLogin("Google")}
            className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Register with Google
          </button>
        </div>

        <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
