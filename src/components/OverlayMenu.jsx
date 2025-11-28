import { AnimatePresence } from "framer-motion";
import { FiXCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import React from "react";

const OverlayMenu = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white text-3xl"
          >
            <FiXCircle />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OverlayMenu;
