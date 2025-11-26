// src/components/ThemeToggle.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/themeSlice";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const mode = useSelector((s) => s.theme.mode);
  console.log(mode);

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.03 }}
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle theme"
      className="p-2 rounded-full border bg-white/50 dark:bg-slate-800/60 border-gray-200 dark:border-slate-700 shadow-sm"
    >
      {mode === "dark" ? (
        // Sun icon for switching to light (shows current is dark)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-yellow-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.36-6.36l-1.41 1.41M7.05 17.95l-1.41 1.41M18.36 18.36l-1.41-1.41M7.05 6.05L5.64 7.46M12 8a4 4 0 100 8 4 4 0 000-8z"
          />
        </svg>
      ) : (
        // Moon icon for switching to dark
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-slate-700"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
          />
        </svg>
      )}
    </motion.button>
  );
}
