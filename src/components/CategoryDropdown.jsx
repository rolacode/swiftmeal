import React from "react";

export default function CategoryDropdown({ onLeave }) {
  return (
    <div
      onMouseLeave={onLeave}
      className="absolute mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-md p-3 w-48 text-gray-700 dark:text-gray-300"
    >
      <ul className="space-y-2 text-sm font-semibold">
        <li className="hover:text-orange-500 cursor-pointer">Fresh Foods</li>
        <li className="hover:text-orange-500 cursor-pointer">Cooked Foods</li>
        <li className="hover:text-orange-500 cursor-pointer">Fruits</li>
        <li className="hover:text-orange-500 cursor-pointer">Snacks</li>
        <li className="hover:text-orange-500 cursor-pointer">Beverages</li>
        <li className="hover:text-orange-500 cursor-pointer">Vegetables</li>
        <li className="hover:text-orange-500 cursor-pointer">Meat & Seafood</li>
      </ul>
    </div>
  );
}
