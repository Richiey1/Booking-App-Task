import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    typeof window !== "undefined" && localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="flex justify-end items-center mb-4">
      <button
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle Theme"
        className="p-2 rounded-full border shadow-md transition-colors bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        {darkMode ? (
          <Sun className="h-5 w-5 text-yellow-400 transition-transform duration-300 rotate-0" />
        ) : (
          <Moon className="h-5 w-5 text-gray-700 dark:text-white transition-transform duration-300 rotate-0" />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
