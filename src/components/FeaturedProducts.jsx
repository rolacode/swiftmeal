import React from "react";
import { useApp } from "../context/AppContext";
import { motion } from "framer-motion";

export default function FeaturedProducts() {
  const { products, addToCart } = useApp();

  return (
    <section className="max-w-7xl mx-auto px-4 mt-10 dark:text-white">
      <h2 className="text-center text-2xl font-semibold">Featured Products</h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mt-2 mb-6">
        Browse from our fresh daily produce.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
          >
            <img
              src={item.image}
              className="w-full h-32 object-cover rounded-lg"
            />

            <button
              onClick={() => addToCart(item)}
              className="mt-3 w-full bg-red-500 text-white py-1 rounded-lg"
            >
              Add to cart
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
