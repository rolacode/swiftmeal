import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import CategoryDropdown from "./CategoryDropdown";
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  const [catOpen, setCatOpen] = useState(false);
  const { cart, openCart } = useApp();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top nav */}
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="font-bold text-xl text-orange-500">
            SWI<span className="text-black dark:text-white">F</span>T MEAL
          </Link>

          {/* Menu */}
          <div className="hidden md:flex space-x-6">
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
              Order Tracker
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

          {/* Right Buttons */}
          <div className="flex items-center space-x-4">
            <DarkModeToggle />
            <button
              onClick={openCart}
              aria-label="Open cart"
              className="relative text-gray-700 dark:text-gray-300 hover:text-orange-500"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>

            <Link
              to="/login"
              className="px-4 py-1 rounded text-white bg-black hover:bg-gray-800"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-1 rounded border border-black dark:border-white text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Secondary nav - Categories */}
        <div
          className="border-t border-gray-200 dark:border-gray-700 py-2 relative"
          onMouseLeave={() => setCatOpen(false)}
        >
          <span
            className="text-sm font-semibold text-gray-500 dark:text-gray-400 cursor-pointer"
            onMouseEnter={() => setCatOpen(true)}
          >
            Categories
          </span>

          {catOpen && <CategoryDropdown onLeave={() => setCatOpen(false)} />}

          <div className="absolute right-0 top-2 flex items-center">
            {/* Search icon */}
            <button
              aria-label="Search"
              className="text-gray-700 dark:text-gray-300 hover:text-orange-500 mx-3"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
