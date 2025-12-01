import React, { useEffect, useRef, useState } from "react";
import OverlayMenu from "./OverlayMenu";
import logo from "../assets/Logo (1).png";
import { FiMenu } from "react-icons/fi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [forceVisible, setForceVisible] = useState(false);

  const lastSrcollY = useRef(0);
  const timerId = useRef(null);

  //home section visible navbar all the time
  useEffect(() => {
    const homeSection = document.querySelector("#home");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setForceVisible(true);
          setVisible(true);
        } else {
          setForceVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (homeSection) observer.observe(homeSection); //observes

    return () => {
      if (homeSection) observer.unobserve(homeSection); //whn unmount clean up
    };
  }, []);

  //when not on nav and scroll up and hold for 3 sec
  useEffect(() => {
    const handleScroll = () => {
      if (forceVisible) {
        setVisible(true);
        return;
      }
      const currentScrollY = window.scrollY; // crrnt scroll position

      if (currentScrollY > lastSrcollY.current) {
        setVisible(false);
      } else {
        setVisible(true);

        if (timerId.current) clearTimeout(timerId.current);
        timerId.current -
          setTimeout(() => {
            setVisible(false);
          }, 3000);
      }
      lastSrcollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timerId.current) clearTimeout(timerId.current);
    };
  }, [forceVisible]);

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

          <div className="block lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
            <button
              className="text-white text-3xl focus:outline-none cursor-pointer"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen(true)}
            >
              <FiMenu />
            </button>
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
