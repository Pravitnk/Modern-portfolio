import React, { useEffect, useRef, useState } from "react";
import OverlayMenu from "./OverlayMenu";
import logo from "../assets/Logo1.png";
import { FiMenu } from "react-icons/fi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [forceVisible, setForceVisible] = useState(false);

  const lastScrollY = useRef(
    typeof window !== "undefined" ? window.scrollY : 0
  );
  const timerId = useRef(null);

  useEffect(() => {
    const homeSection = document.querySelector("#home");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Make navbar persist while home is visible
          setForceVisible(true);
          setVisible(true);

          // Clear any pending hide timeouts when we force it visible
          if (timerId.current) {
            clearTimeout(timerId.current);
            timerId.current = null;
          }
        } else {
          setForceVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (homeSection) observer.observe(homeSection);

    return () => {
      if (homeSection) observer.unobserve(homeSection);
    };
  }, []);

  // Show navbar on scroll up, hide on scroll down; hide after 3s of idle scroll-up only when not forcing visible
  useEffect(() => {
    const handleScroll = () => {
      if (forceVisible) {
        // If home is visible, ensure navbar stays visible and no timers run
        setVisible(true);
        if (timerId.current) {
          clearTimeout(timerId.current);
          timerId.current = null;
        }
        // Update lastScrollY so future direction checks are correct
        lastScrollY.current = window.scrollY;
        return;
      }

      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        // Scrolling down -> hide immediately
        setVisible(false);
        if (timerId.current) {
          clearTimeout(timerId.current);
          timerId.current = null;
        }
      } else {
        // Scrolling up -> show, then hide after 3s if no further interaction
        setVisible(true);

        // reset existing timer
        if (timerId.current) {
          clearTimeout(timerId.current);
        }

        timerId.current = setTimeout(() => {
          setVisible(false);
          timerId.current = null;
        }, 3000);
      }

      lastScrollY.current = currentScrollY;
    };

    // initialize lastScrollY when effect mounts to avoid weird first-run behavior
    lastScrollY.current = window.scrollY;

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timerId.current) {
        clearTimeout(timerId.current);
        timerId.current = null;
      }
    };
  }, [forceVisible]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 transform transition-transform duration-300 z-50 ${
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
