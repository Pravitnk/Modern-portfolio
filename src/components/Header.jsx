// src/components/Header.jsx
import React, { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Docs", to: "/docs" },
];

export default function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  // Motion values for cursor reactive effect (container-level)
  const containerRef = useRef(null);
  const pointerX = useMotionValue(0); // -1 .. 1
  const pointerY = useMotionValue(0); // -1 .. 1

  // Smoothed springs so movement is soft
  const springConfig = { damping: 20, stiffness: 120 };
  const springX = useSpring(pointerX, springConfig);
  const springY = useSpring(pointerY, springConfig);

  // transforms for the whole pill (small tilt)
  const pillTranslateX = useTransform(springX, (v) => `${v * 6}px`); // small horizontal shift
  const pillTranslateY = useTransform(springY, (v) => `${v * 2}px`); // very small vertical shift
  const pillRotate = useTransform(springX, (v) => `${v * 3}deg`); // tiny rotation

  // Handler to update motion values relative to container center
  function handlePointerMove(e) {
    if (reduce) return;

    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width; // 0..1
    const relY = (e.clientY - rect.top) / rect.height; // 0..1

    // Convert to -1 .. 1
    const nx = (relX - 0.5) * 2;
    const ny = (relY - 0.5) * 2;

    // Slight clamp just in case
    pointerX.set(Math.max(-1, Math.min(1, nx)));
    pointerY.set(Math.max(-1, Math.min(1, ny)));
  }

  // Reset on leave
  function handlePointerLeave() {
    if (reduce) return;
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-gray-400 border-b border-white/10 dark:border-white/6 shadow-[0_2px_12px_rgba(2,6,23,0.05)]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          {/* Logo (left) */}
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
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-pink-500 flex items-center justify-center text-white font-semibold shadow-md">
              PN
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {/* NAV PILL - container listens for pointer movement */}
            <motion.ul
              ref={containerRef}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              // apply the pill-level transforms (translate + rotate)
              style={{
                transform: reduce
                  ? undefined
                  : `translateX(${pillTranslateX.get()}) translateY(${pillTranslateY.get()}) rotate(${pillRotate.get()})`,
              }}
              className="relative flex items-center gap-6 bg-gradient-to-br from-indigo-600 to-pink-500/12 py-3 px-5 rounded-full backdrop-blur-sm"
            >
              {/* Individual link items - each has its own smaller parallax using transforms derived from spring values */}
              {links.map((l, idx) => {
                // create slight per-item transform factors to produce layered parallax
                const factor = 0.8 - idx * 0.12; // e.g., 0.8, 0.68, 0.56, ...
                // derived transforms for this item
                const itemTx = useTransform(
                  springX,
                  (v) => `${v * 8 * factor}px`
                );
                const itemTy = useTransform(
                  springY,
                  (v) => `${v * 3 * factor}px`
                );
                const itemScale = useTransform(
                  springX,
                  (v) => 1 + Math.abs(v) * 0.02 * factor
                );

                // Note: can't directly use style={{ transform: itemTx }} because itemTx is a MotionValue.
                // We'll render the Motion.li and pass style with x, y, scale which Framer Motion understands.
                return (
                  <motion.li
                    key={l.to}
                    className="list-none"
                    style={
                      reduce ? {} : { x: itemTx, y: itemTy, scale: itemScale }
                    }
                    whileHover={reduce ? {} : { y: -6, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 280, damping: 28 }}
                  >
                    <NavLink
                      to={l.to}
                      className={({ isActive }) =>
                        `text-sm font-medium px-2 py-1 rounded transition-colors ${
                          isActive
                            ? "text-orange-400 underline decoration-indigo-200 underline-offset-4"
                            : "text-slate-700 dark:text-slate-200 hover:text-orange-400 "
                        }`
                      }
                    >
                      {l.label}
                    </NavLink>
                  </motion.li>
                );
              })}
            </motion.ul>
          </nav>

          {/* Theme toggle + mobile */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
          </div>

          <div className="flex items-center md:hidden gap-2">
            <ThemeToggle />
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="p-2 rounded-md inline-flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700"
            >
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

      {/* Mobile menu - unchanged (keeps your previous markup) */}
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
              <ul className="flex flex-col gap-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur py-4 rounded-b-lg border-b border-gray-200 dark:border-slate-700 shadow-sm">
                {links.map((l) => (
                  <li key={l.to} className="px-3">
                    <NavLink
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `block w-full text-left py-2 rounded px-2 text-sm font-medium ${
                          isActive
                            ? "text-indigo-600"
                            : "text-slate-700 dark:text-slate-100 hover:text-indigo-600"
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

                <li className="px-3 pt-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-pink-500 flex items-center justify-center text-white font-semibold shadow-md">
                      PN
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Pravit Naik</div>
                      <div className="text-xs opacity-80">
                        Full-stack Developer
                      </div>
                    </div>
                  </div>

                  <ThemeToggle />
                </li>
              </ul>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
