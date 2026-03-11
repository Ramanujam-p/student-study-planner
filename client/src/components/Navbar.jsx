import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {

  const navigate = useNavigate();

  const [darkMode,setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  /* APPLY THEME */

  useEffect(()=>{

    if(darkMode){

      document.body.classList.add("dark-mode");
      localStorage.setItem("theme","dark");

    }
    else{

      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme","light");

    }

  },[darkMode]);

  return (

    <nav className="navbar">

      <div 
        className="logo"
        onClick={() => navigate("/")}
      >
        📚 Study Planner
      </div>

      <div className="nav-links">

        <button 
          onClick={() => navigate("/")}
        >
          Home
        </button>

        <button
          onClick={()=>{

            const section = document.getElementById("features");

            if(section){
              section.scrollIntoView({behavior:"smooth"});
            }

          }}
        >
          Features
        </button>

        <button
          className="nav-login"
          onClick={() => navigate("/login")}
        >
          Login
        </button>

        <button
          className="nav-register"
          onClick={() => navigate("/register")}
        >
          Register
        </button>

        {/* DARK MODE TOGGLE */}

        <button
          className="nav-dark-toggle"
          onClick={()=>setDarkMode(!darkMode)}
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>

      </div>

    </nav>

  );

};

export default Navbar;