import React, { useState } from "react";
import OverlayMenu from "./OverlayMenu";
import logo from "../assets/Logo(1).png";

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
        <div className="">
          <img src={logo} alt="logo" className="w-8 h-8" />
        </div>
      </nav>

      <OverlayMenu />
    </>
  );
};

export default Navbar;
