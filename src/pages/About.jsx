import React from "react";
import { motion } from "framer-motion";
import p from "../assets/boy.jpg";

const About = () => {
  const glow = [
    "-top-16 -left-20 w-[360px] h-[360px] opacity-20 blur-[120px]",
    "-bottom-10 -right-10 w-[380px] h-[380px] opacity-15 blur-[140px] delay-300",
    "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] opacity-10 blur-[100px]",
  ];

  return (
    <section
      id="about"
      className="min-h-screen w-full flex items-center justify-center relative bg-black text-white overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        {glow.map((c, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] animate-pulse ${c}`}
          ></div>
        ))}

        <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-12 py-20 flex flex-col gap-12">
          <motion.div
            className="flex flex-col md:flex-row items-center md:items-stretch gap-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.div className="relative w-[160px] h-[160px] md:w-[200px] md:h-[200px] rounded-full overflow-hidden shadow-2xl bg-gradient-to-r from-[#1cd8d2]/20 to-[#302b63]/20 border border-[#1cd8d2]/25">
              <img src={p} alt="profile" className="absolute inset-0" />
            </motion.div>

            <motion.div>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Pravit Naik
              </h2>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
