import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useApp } from "../context/AppContext";
import CategoryDropdown from "./CategoryDropdown";
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  const [catOpen, setCatOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const { cart, openCart } = useApp();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* -------------------- TOP NAV -------------------- */}
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link
            to="/"
            className="font-bold text-xl text-orange-500 flex-shrink-0"
          >
            SWI<span className="text-black dark:text-white">F</span>T MEAL
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">

            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "text-gray-700 dark:text-gray-300 hover:text-orange-500"
              }
              end
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "text-gray-700 dark:text-gray-300 hover:text-orange-500"
              }
            >
              About Us
            </NavLink>

            <NavLink
              to="/order-tracking"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "text-gray-700 dark:text-gray-300 hover:text-orange-500"
              }
            >
              Order Tracking
            </NavLink>

            <NavLink
              to="/services"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "text-gray-700 dark:text-gray-300 hover:text-orange-500"
              }
            >
              Services
            </NavLink>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center space-x-4">
            <DarkModeToggle />

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative text-gray-700 dark:text-gray-300 hover:text-orange-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
              </svg>

              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>

            {/* Login Buttons */}
            <Link to="/login" className="px-4 py-1 bg-black text-white rounded">
              Login
            </Link>

            <Link
              to="/register"
              className="px-4 py-1 border border-black dark:border-white rounded text-black dark:text-white"
            >
              Sign Up
            </Link>
          </div>

          {/* ---------- MOBILE MENU BUTTON ---------- */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-300"
            onClick={() => setMobileMenu((prev) => !prev)}
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {mobileMenu ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* -------------------- MOBILE DROPDOWN MENU -------------------- */}
        {mobileMenu && (
          <div className="md:hidden mt-2 space-y-4 space-x-4 pb-4">

            <NavLink to="/" className="block text-gray-700 dark:text-gray-300">
              Home
            </NavLink>

            <NavLink to="/about" className="block text-gray-700 dark:text-gray-300">
              About Us
            </NavLink>

            <NavLink to="/order-tracking" className="block text-gray-700 dark:text-gray-300">
              Order Tracking
            </NavLink>

            <NavLink to="/services" className="block text-gray-700 dark:text-gray-300">
              Services
            </NavLink>

            {/* Categories mobile version */}
            <div>
              <p
                className="font-semibold text-gray-500 dark:text-gray-300 cursor-pointer"
                onClick={() => setCatOpen((prev) => !prev)}
              >
                Categories ▼
              </p>

              {catOpen && <CategoryDropdown />}
            </div>

            {/* Login + cart */}
            <div className="flex items-center space-x-4 pt-3">
              <DarkModeToggle />

              <button onClick={openCart} className="relative text-gray-700 dark:text-gray-300">
                🛒
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>

              <Link
                to="/login"
                className="px-4 py-1 bg-black text-white rounded"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-1 border border-black dark:border-white rounded text-black dark:text-white"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}

        {/* -------------------- CATEGORY BAR DESKTOP -------------------- */}
        <div
          className="hidden md:block border-t border-gray-200 dark:border-gray-700 py-2 px-2 relative"
          onMouseLeave={() => setCatOpen(false)}
        >
          <span
            className="text-sm font-semibold text-gray-500 dark:text-gray-400 cursor-pointer"
            onMouseEnter={() => setCatOpen(true)}
          >
            Categories
          </span>

          {catOpen && (
            <CategoryDropdown onLeave={() => setCatOpen(false)} />
          )}
        </div>
      </div>
    </nav>
  );
}
