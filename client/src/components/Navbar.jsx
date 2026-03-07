import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  return (

    <nav className="navbar">

      <div className="logo"
        onClick={() => navigate("/")}>
        📚 Study Planner
      </div>

      <div className="nav-links">

        <button onClick={() => navigate("/")}>
          Home
        </button>

        <button onClick={() => {
          document
          .getElementById("features")
          ?.scrollIntoView({behavior:"smooth"})
        }}>
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

      </div>

    </nav>

  );

};

export default Navbar;