import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

import { saveTheme, getTheme } from "../utils/localStorage";
import { getUser } from "../utils/auth";

const Landing = () => {

  const navigate = useNavigate();

  const user = getUser();
  const username = user?.name || "guest";

  const [darkMode,setDarkMode] = useState(
    () => getTheme(username) === "dark"
  );

  const [showTop,setShowTop] = useState(false);

  /* APPLY THEME */

  useEffect(()=>{

    const theme = darkMode ? "dark" : "light";

    saveTheme(username,theme);

    if(darkMode){
      document.body.classList.add("dark-mode");
    }else{
      document.body.classList.remove("dark-mode");
    }

  },[darkMode,username]);

  /* SHOW BACK TO TOP BUTTON */

  useEffect(()=>{

    const handleScroll = () => {

      if(window.scrollY > 300){
        setShowTop(true);
      }else{
        setShowTop(false);
      }

    };

    window.addEventListener("scroll",handleScroll);

    return () => window.removeEventListener("scroll",handleScroll);

  },[]);

  /* SCROLL TO TOP */

  const scrollToTop = () => {

    window.scrollTo({
      top:0,
      behavior:"smooth"
    });

  };

  return (

    <div className="landing-container">

      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* HERO SECTION */}

      <section className="hero">

        <h1>
          Organize Your Studies <br />
          Like a Pro
        </h1>

        <p>
          Track tasks, manage subjects,
          monitor progress and never miss deadlines.
        </p>

        <div className="hero-buttons">

          <button
            className="hero-get-started"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>

          <button
            className="hero-login"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

        </div>

      </section>

      {/* FEATURES SECTION */}

      <motion.section
        id="features"
        className="features"
        initial={{ opacity:0, y:40 }}
        whileInView={{ opacity:1, y:0 }}
        transition={{ duration:0.6 }}
        viewport={{ once:true }}
      >

        <h2>Powerful Features</h2>

        <div className="feature-grid">

          <motion.div
            className="feature-card"
            whileHover={{ scale:1.05 }}
          >
            📚 Subject Based Planning
            <p>Organize your study tasks subject-wise.</p>
          </motion.div>

          <motion.div
            className="feature-card"
            whileHover={{ scale:1.05 }}
          >
            📊 Progress Dashboard
            <p>Track completed and pending tasks visually.</p>
          </motion.div>

          <motion.div
            className="feature-card"
            whileHover={{ scale:1.05 }}
          >
            🎯 Deadline Tracking
            <p>Never miss important study deadlines.</p>
          </motion.div>

          <motion.div
            className="feature-card"
            whileHover={{ scale:1.05 }}
          >
            🌙 Dark Mode
            <p>Switch between light and dark themes.</p>
          </motion.div>

          <motion.div
            className="feature-card"
            whileHover={{ scale:1.05 }}
          >
            🧩 Drag & Drop Tasks
            <p>Easily rearrange tasks with drag and drop.</p>
          </motion.div>

          <motion.div
            className="feature-card"
            whileHover={{ scale:1.05 }}
          >
            ⚡ Simple Productivity Tool
            <p>A clean and distraction-free planner for students.</p>
          </motion.div>

        </div>

      </motion.section>

      {/* CTA SECTION */}

      <section className="cta">

        <h2>
          Start Planning Your Success Today
        </h2>

        <button
          className="hero-get-started"
          onClick={() => navigate("/register")}
        >
          Create Account
        </button>

      </section>

      <Footer />

      {/* BACK TO TOP BUTTON */}

      {showTop && (
        <button
          className="back-to-top"
          onClick={scrollToTop}
        >
          ↑
        </button>
      )}

    </div>

  );

};

export default Landing;