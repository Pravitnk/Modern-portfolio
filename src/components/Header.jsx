// src/components/Header.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Docs", to: "/docs" },
];

export default function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    // sticky, glassy header
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-[0_2px_10px_rgba(255,255,255,0.1)]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          {/* Logo / Brand */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => {
              setOpen(false);
              navigate("/");
            }}
            role="button"
            aria-label="Go to homepage"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate("/")}
          >
            <motion.div
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.98 }}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-pink-500 flex items-center justify-center text-white font-semibold"
            >
              PN
            </motion.div>

            <div>
              <div className="text-sm font-semibold text-slate-900">
                Pravit Naik
              </div>
              <div className="text-xs text-slate-500">Full-stack Developer</div>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-6">
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      `text-sm font-medium px-2 py-1 rounded transition-all ${
                        isActive
                          ? "text-indigo-600 underline decoration-indigo-200 underline-offset-4"
                          : "text-slate-700 hover:text-indigo-600"
                      }`
                    }
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Primary CTA */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/contact")}
              className="ml-3 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium shadow-sm hover:shadow-md"
            >
              Contact
            </motion.button>
          </nav>

          {/* Mobile controls */}
          <div className="flex items-center md:hidden">
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="p-2 rounded-md inline-flex items-center justify-center text-slate-700 hover:bg-gray-100"
            >
              {/* simple hamburger icon */}
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                {open ? (
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ) : (
                  <path
                    d="M3 6h18M3 12h18M3 18h18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - animated */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="md:hidden"
          >
            <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 pb-4">
              <ul className="flex flex-col gap-2 bg-white/80 backdrop-blur py-4 rounded-b-lg border-b border-gray-200 shadow-sm">
                {links.map((l) => (
                  <li key={l.to} className="px-3">
                    <NavLink
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `block w-full text-left py-2 rounded px-2 text-sm font-medium ${
                          isActive
                            ? "text-indigo-600"
                            : "text-slate-700 hover:text-indigo-600"
                        }`
                      }
                    >
                      {l.label}
                    </NavLink>
                  </li>
                ))}

                <li className="px-3 pt-2">
                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate("/contact");
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
