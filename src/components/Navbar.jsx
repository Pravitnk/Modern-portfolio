import React, { useState } from "react";
import OverlayMenu from "./OverlayMenu";
import logo from "../assets/Logo (1).png";
import { FiMenu } from "react-icons/fi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 transform translate duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center space-x-2">
          <img src={logo} alt="logo" className="w-8 h-8" />
          <div className="text-2xl font-bold text-white hidden sm:block">
            Pravit
          </div>

          <div className="block lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 h-10 w-20 bg-amber-200 rounded-full cursor-pointer shadow-lg hover:opacity-90 transition-opacity duration-500 hover:w-40 focus:w-40 focus:outline-none px-4 hover:transition-all">
            {/* <button
              className="text-white text-3xl focus:outline-none"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen(true)}
            >
              <FiMenu />
            </button> */}
          </div>
        </div>
        <div className="hidden  lg:block">
          <a
            href="#contact"
            className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-5 py-2 rounded-full font-medium shadow-lg hover:opacity-90 transition-opacity duration-300"
          >
            Reach Out
          </a>
        </div>
      </nav>

      <OverlayMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Navbar;
