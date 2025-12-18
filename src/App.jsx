import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Footer from "./pages/Footer";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";
import Testimonial from "./pages/testimonial";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import IntroAnimation from "./components/IntroAnimation";

const App = () => {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && <IntroAnimation onFinish={() => setIntroDone(true)} />}

      {introDone && (
        <div className="relative bg-gradient text-white min-h-screen">
          {/* <Router> */}
          <CustomCursor />
          <Navbar />
          <Home />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Testimonial />
          <Contact />
          <Footer />
          {/* <Routes>
              <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            </Routes> */}
          {/* </Router> */}
        </div>
      )}
    </>
  );
};

export default App;
