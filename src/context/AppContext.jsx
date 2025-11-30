import React, { createContext, useContext, useState, useEffect } from "react";
import { getPlaceholderUrl } from "../utiliy/getPlaceholderUrl";


const AppContext = createContext();

export const dummyProducts = [
  { id: 1, name: "Fresh Salad", image: "/assets/products/salad.jpg", price: 12.99 },
  { id: 2, name: "Potatoes", image: "/assets/products/potatoes.jpg", price: 3.99 },
  { id: 3, name: "Red Onions", image: "/assets/products/onions.jpg", price: 2.99 },
  { id: 4, name: "Tomatoes", image: "/assets/products/tomatoes.jpg", price: 4.99 },
  { id: 5, name: "Cherry Tomatoes", image: "/assets/products/cherry-tomatoes.jpg", price: 5.99 },
  { id: 6, name: "Nuts Mix", image: "/assets/products/nuts.jpg", price: 7.99 },
  { id: 7, name: "Chicken Breast", image: "/assets/products/chicken.jpg", price: 10.99 },
  { id: 8, name: "Apple", image: "/assets/products/apple.jpg", price: 1.29 },
  { id: 9, name: "Eggs Tray", image: "/assets/products/eggs.jpg", price: 6.99 },
];

export const ORDER_PRODUCTS = [
  { title: "Mama's Choice", image: getPlaceholderUrl("Mama's+Choice", 200, 280, 'fff', 'd00000') },
  { title: 'Grain Sack', image: getPlaceholderUrl('Grain+Sack', 200, 280, '000', 'e9c46a') },
  { title: 'Flour Bag', image: getPlaceholderUrl('Flour+Bag', 200, 280, '000', 'f8f5e3') },
  { title: 'Corn Meal', image: getPlaceholderUrl('Corn+Meal', 200, 280, '000', 'ffd100') },
  { title: 'Prepared Salmon', image: getPlaceholderUrl('Salmon+Dish', 280, 280, '000', 'f4f4f4') },
  { title: 'Salad Side', image: getPlaceholderUrl('Side+Salad', 280, 280, '000', 'ff8c00') },
  { title: 'Rice & Veggies', image: getPlaceholderUrl('Rice+Dish', 280, 280, '000', 'f4f4f4') },
];

export const AppProvider = ({ children }) => {
  // Load previous stored theme
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [products] = useState(dummyProducts);

  // Apply dark mode to HTML (IMPORTANT FIX)
  useEffect(() => {
    const html = document.documentElement;

    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  const addToCart = (item) => {
    setCart(prev => {
      const exists = prev.find(p => p.id === item.id);
      if (exists) return prev;
      return [...prev, item];
    });
    openCart();
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        cart,
        cartOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        products,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);