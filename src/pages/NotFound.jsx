import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="pt-40 pb-20 text-center bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-6xl font-bold text-orange-500">404</h1>
      <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
        Oops! The page you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded"
      >
        Back to Home
      </Link>
    </div>
  );
}
