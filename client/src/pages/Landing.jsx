import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Landing = () => {

  const navigate = useNavigate();

  return (

    <div className="landing-container">

      <Navbar />

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
            className="primary-btn"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

        </div>

      </section>


      <section id="features" className="features">

        <h2>Powerful Features</h2>

        <div className="feature-grid">

          <div className="feature-card">
            📚 Subject Based Planning
            <p>Organize tasks subject-wise.</p>
          </div>

          <div className="feature-card">
            📊 Progress Dashboard
            <p>Track completed & pending tasks.</p>
          </div>

          <div className="feature-card">
            🎯 Deadline Management
            <p>Never miss important deadlines.</p>
          </div>

          <div className="feature-card">
            🌙 Dark Mode
            <p>Comfortable night studying.</p>
          </div>

          <div className="feature-card">
            🧩 Drag & Drop Tasks
            <p>Rearrange tasks easily.</p>
          </div>

          <div className="feature-card">
            👥 Multi User Support
            <p>Switch between multiple users.</p>
          </div>

        </div>

      </section>


      <section className="cta">

        <h2>Start Planning Your Success Today</h2>

        <button
          className="primary-btn"
          onClick={() => navigate("/register")}
        >
          Create Account
        </button>

      </section>


      <Footer />

    </div>

  );

};

export default Landing;