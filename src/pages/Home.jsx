import React, { useEffect, useMemo, useState } from "react";
import ParticleBackground from "../components/ParticleBackground";
import { motion } from "framer-motion";

const Home = () => {
  const roles = useMemo(
    () => [
      "Web Developer",
      "MERN Stack Developer",
      "Frontend Developer",
      "Software Engineer",
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];
    const timeout = setTimeout(
      () => {
        if (!deleting && subIndex < current.length) setSubIndex((v) => v + 1);
        else if (!deleting && subIndex === current.length)
          setTimeout(() => {
            setDeleting(true);
          }, 1200);
        else if (deleting && subIndex > 0) setSubIndex((v) => v - 1);
        else if (deleting && subIndex === 0) {
          setDeleting(false);
          setIndex((p) => (p + 1) % roles.length);
        }
      },
      deleting ? 40 : 60
    );

    return () => {
      clearTimeout(timeout);
    };
  }, [subIndex, index, deleting, roles]);

  return (
    <section id="#home" className="w-full h-screen bg-black overflow-hidden">
      <ParticleBackground />
      <div className="absolute inset-0">
        <div
          className="  absolute -top-32 -left-32
        w-[70vw] sm:w-[50vw] md:w-[40vw]
        h-[70vw] sm:h-[50vw] md:h-[40vw]
        max-w-[500px] max-h-[500px]
        rounded-full
        bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
        opacity-30 sm:opacity-20 md:opacity-10
        blur-[100px] sm:blur-[130px] md:blur-[150px]
        animate-pulse"
        ></div>

        <div
          className="absolute top-80 right-0
        w-[70vw] sm:w-[50vw] md:w-[40vw]
        h-[70vw] sm:h-[50vw] md:h-[40vw]
        max-w-[500px] max-h-[500px]
        rounded-full
        bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
        opacity-30 sm:opacity-20 md:opacity-10
        blur-[100px] sm:blur-[130px] md:blur-[150px]
        animate-pulse delay-500"
        ></div>
      </div>

      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2">
        {/* left side */}
        <div className="flex flex-col justify-center text-center h-full lg:text-left relative">
          <div className="w-full lg:pr-24 mx-auto max-w-[48rem]">
            <motion.div
              className="mb-1 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-wide min-h-[1.6em]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span>{roles[index].substring(0, subIndex)}</span>
              <span
                className="inline-block w-[2px ml-1 bg-white animate-pulse align-middle]"
                style={{ height: "1em" }}
              ></span>
            </motion.div>

            <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r">
              Hello, I'am <br />
              <span className="text-white font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl lg:whitespace-nowrap">
                Pravit Naik
              </span>
            </motion.h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
// Intro Animation : “Hello”
// —------------------------------------------------

// "Hello", "नमस्ते", "Hola", "Bonjour",
//       "Ciao", "Olá", "Здравствуйте",
//       "Merhaba", "Γειά", "Hej", "Hallo", "Salam"
