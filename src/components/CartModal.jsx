import React from "react";
import { useApp } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

export default function CartModal() {
  const { cartOpen, closeCart, cart, removeFromCart } = useApp();

  return (
    <AnimatePresence>
      {cartOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 w-80 h-full bg-white dark:bg-gray-900 shadow-lg z-50 flex flex-col"
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Cart</h2>
            <button
              onClick={closeCart}
              aria-label="Close cart"
              className="text-gray-700 dark:text-gray-300 hover:text-red-500"
            >
              &times;
            </button>
          </div>
          <div className="flex-grow overflow-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">Cart is empty.</p>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">${item.price.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="text-red-600 hover:text-red-800 font-bold"
                  >
                    &times;
                  </button>
                </div>
              ))
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
