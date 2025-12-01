import { AnimatePresence } from "framer-motion";
import { FiXCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import React from "react";

const OverlayMenu = ({ isOpen, onClose }) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const origin = isMobile ? "95% 8%" : "50% 8%";
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50"
          initial={{ clipPath: `circle(0% at ${origin})` }}
          animate={{ clipPath: `circle(150% at ${origin})` }}
          exit={{ clipPath: `circle(0% at ${origin})` }}
          transition={{ duration: 0.7, ease: (0.4, 0.2, 1) }}
          style={{ backgroundColor: "rgba(0,0,0,0.95)" }}
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white text-3xl"
          >
            <FiXCircle />
          </button>

          <ul className="space-y-6 text-center">
            {[
              "Home",
              "About",
              "Skills",
              "Projects",
              "Experience",
              "Testimonial",
              "Contact",
              "Footer",
            ].map((item, ind) => (
              <motion.li
                key={ind}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + ind * 0.1 }}
                className="cursor-pointer"
              >
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={onClose}
                  className="text-3xl text-white font-semibold hover:text-pink-400 transition-colors duration-300"
                >
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OverlayMenu;
