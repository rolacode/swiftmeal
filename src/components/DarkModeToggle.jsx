import React from "react";
import { useApp } from "../context/AppContext";

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useApp();

  return (
    <button
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
      className="text-gray-700 dark:text-gray-300 hover:text-orange-500 transition"
    >
      {darkMode ? (
        // Light Mode Icon (Sun)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M7.05 
            7.05L5.636 5.636m12.728 0l-1.414 1.414M7.05 
            16.95l-1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z"
          />
        </svg>
      ) : (
        // Dark Mode Icon (Moon)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12.79A9 9 0 0111.21 3 7 7 0 1019 14.79 
            9.05 9.05 0 0121 12.79z"
          />
        </svg>
      )}
    </button>
  );
}
