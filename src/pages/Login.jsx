import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/auth";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [displayText, setDisplayText] = useState("");
  const fullText = "Welcome to Study Planner";


  useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.remove("home-page");

    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 80);

    return () => clearInterval(interval);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username.trim()) return;

    const userObject = {
      id: Date.now(),
      name: username,
      email: `${username.toLowerCase()}@example.com`,
    };

    loginUser(userObject);

    navigate("/");
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h1 className="gradient-text">{displayText}</h1>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;