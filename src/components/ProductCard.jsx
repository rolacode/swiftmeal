import React from "react";
import { useApp } from "../context/AppContext";

export default function ProductCard({ product }) {
  const { addToCart } = useApp();

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 flex flex-col items-center cursor-pointer hover:shadow-lg transition"
      onClick={() => addToCart(product)}
      title="Click to add to cart"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-28 object-cover rounded-md"
      />
      <h3 className="mt-2 text-center font-semibold text-gray-900 dark:text-white">
        {product.name}
      </h3>
      <p className="mt-1 text-orange-500 font-bold">${product.price.toFixed(2)}</p>
    </div>
  );
}
