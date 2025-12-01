import React from "react";
// import Header from "./components/Header";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Layout from "./components/Layout";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Footer from "./pages/Footer";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";
import Testimonial from "./pages/testimonial";
import Navbar from "./components/Navbar";
// import ParticleBackground from "./components/ParticleBackground";
import CustomCursor from "./components/CustomCursor";

const App = () => {
  return (
    <div className="relative bg-gradient text-white min-h-screen">
      <Router>
        {/* <Header /> */}
        <CustomCursor />
        {/* <ParticleBackground /> */}
        <Navbar />
        <Home />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Testimonial />
        <Contact />
        <Footer />
        <Routes>
          {/* <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
