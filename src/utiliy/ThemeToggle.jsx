import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("darkMode") === "true";
    } catch { return false; }
  });

  useEffect(() => {
    const html = document.documentElement;
    if (dark) html.classList.add("dark"); else html.classList.remove("dark");
    localStorage.setItem("darkMode", dark);
  }, [dark]);

  return (
    <button onClick={() => setDark(d => !d)} className="p-2 rounded-md border bg-white dark:bg-gray-800">
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
