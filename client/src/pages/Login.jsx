import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { setUser, setToken } from "../utils/auth";

const Login = () => {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);
  const [shake,setShake] = useState(false);

  useEffect(()=>{

    document.body.classList.add("login-page");

    return ()=>{
      document.body.classList.remove("login-page");
    }

  },[]);

  useEffect(()=>{

    if(error){

      setShake(true);

      const timer=setTimeout(()=>{
        setError("");
        setShake(false);
      },4000);

      return ()=>clearTimeout(timer);

    }

  },[error]);

  const handleLogin=async(e)=>{

    e.preventDefault();

    setError("");

    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!email || !password){
      setError("Please enter email and password");
      return;
    }

    if(!emailRegex.test(email)){
      setError("Please enter a valid email address");
      return;
    }

    try{

      setLoading(true);

      const res=await API.post("/auth/login",{
        email,
        password
      });

      setUser(res.data.user);
      setToken(res.data.token);

      navigate("/dashboard");

    }catch(err){

      if(err.response && err.response.data.message){
        setError(err.response.data.message);
      }
      else{
        setError("Invalid email or password");
      }

      setPassword("");
    }
    finally{
      setLoading(false);
    }

  };

  return(

    <div className={`login-container ${shake ? "shake" : ""}`}>

      <h1>Login</h1>

      <form onSubmit={handleLogin} autoComplete="off">

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          autoComplete="off"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          autoComplete="new-password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && (
          <p className="form-error">{error}</p>
        )}

      </form>

      <p className="auth-switch">
        Don't have an account?
        <span
          className="auth-link"
          onClick={()=>navigate("/register")}
        >
          Create account
        </span>
      </p>

      <button
        className="landing-btn"
        onClick={()=>navigate("/")}
      >
        ← Back to Home
      </button>

    </div>

  );

};

export default Login;