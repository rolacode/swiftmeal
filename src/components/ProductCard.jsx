import React from "react";

export default function ProductCard({ product }) {
  // const { addToCart } = useAppContext();

  return (
    <div className="flex flex-col p-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 group">
      <div className={`aspect-square w-full ${product.color} rounded-lg mb-3 flex items-center justify-center`}>
        <span className="text-5xl sm:text-6xl">{product.emoji}</span>
      </div>
      <h3 className="text-lg font-bold text-gray-900 truncate">{product.name}</h3>
      <p className="text-sm text-red-600 font-semibold mb-2">${product.price.toFixed(2)}</p>
      <button
        onClick={() => addToCart(product.id)}
        className="mt-auto px-3 py-2 text-sm font-semibold rounded-full bg-red-600 text-white opacity-90 hover:opacity-100 transition duration-300 transform scale-95 group-hover:scale-100"
      >
        Add to Cart
      </button>
    </div>
  );
};