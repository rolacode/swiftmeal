import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white text-center py-10 mt-20">
      © {new Date().getFullYear()} Swift Meal. All rights reserved.
    </footer>
  );
}
