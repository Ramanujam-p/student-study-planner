import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Register = () => {

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const [error,setError] = useState("");
  const [passwordStrength,setPasswordStrength] = useState("");
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

  const handleNameChange=(e)=>{

    const value=e.target.value;

    setName(value);

    if(/[0-9]/.test(value)){
      setError("Name should not contain numbers");
    }
    else{
      setError("");
    }

  };

  const handleEmailChange=(e)=>{

    const value=e.target.value;

    setEmail(value);

    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(value && !emailRegex.test(value)){
      setError("Please enter a valid email address");
    }
    else{
      setError("");
    }

  };

  const handlePasswordChange=(e)=>{

    const value=e.target.value;

    setPassword(value);

    if(value.length<6){
      setPasswordStrength("Weak");
      setError("Password must be at least 6 characters");
      return;
    }

    if(!/[A-Z]/.test(value)){
      setPasswordStrength("Weak");
      setError("Password must contain at least one uppercase letter");
      return;
    }

    if(!/[0-9]/.test(value)){
      setPasswordStrength("Medium");
      setError("Password must contain at least one number");
      return;
    }

    setPasswordStrength("Strong");
    setError("");

  };

  const handleRegister=async(e)=>{

    e.preventDefault();

    if(!name || !email || !password){
      setError("Please fill in all fields");
      return;
    }

    if(/[0-9]/.test(name)){
      setError("Name should not contain numbers");
      return;
    }

    try{

      setLoading(true);

      await API.post("/auth/register",{
        name,
        email,
        password
      });

      navigate("/login");

    }
    catch(err){

      if(err.response && err.response.data.message){
        setError(err.response.data.message);
      }
      else{
        setError("Email already registered");
      }

    }
    finally{
      setLoading(false);
    }

  };

  return(

    <div className={`login-container ${shake ? "shake" : ""}`}>

      <h1>Register</h1>

      <form onSubmit={handleRegister} autoComplete="off">

        <input
          type="text"
          placeholder="Enter name"
          value={name}
          autoComplete="off"
          onChange={handleNameChange}
        />

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          autoComplete="off"
          onChange={handleEmailChange}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          autoComplete="new-password"
          onChange={handlePasswordChange}
        />

        {password && (
          <p className={`password-strength ${passwordStrength.toLowerCase()}`}>
            Password Strength: {passwordStrength}
          </p>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </button>

        {error && (
          <p className="form-error">{error}</p>
        )}

      </form>

      <p className="auth-switch">
        Already have an account?
        <span
          className="auth-link"
          onClick={()=>navigate("/login")}
        >
          Sign in
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

export default Register;