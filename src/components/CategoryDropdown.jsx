import React from "react";

export default function CategoryDropdown({ onLeave }) {
  const categories = [
    "Fresh Food",
    "Cooked Food",
    "Fruits",
    "Snacks",
    "Vegetables",
    "Meat & Seafood",
    "Beverages",
    "Grains & Tubers",
  ];

  return (
    <div
      onMouseLeave={onLeave}
      className="absolute bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 mt-2 rounded-lg p-3 z-50 w-52"
    >
      <ul className="space-y-2">
        {categories.map((cat, i) => (
          <li
            key={i}
            className="cursor-pointer px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
}
