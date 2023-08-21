import { useState } from "react";
import "./Register.css";
import axios from "axios"
import Header from '../../Header/Header';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setError(true);
   try{
 
    const res = await axios.post("/api/auth/register",{
      username,
      email,
      password,
    });
       res.data && window.location.replace("/login");
       
   }catch(err){
   setError(true);
   }


    
   
  }

  return (
    <div className="register">
      <Header/>
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          className="registerInput"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="registerButton" type="submit">Register</button>
      </form>
      {/* <button className="registerLoginButtton">Login</button> */}
     {error && <span style={{color: "red" , marginTop:"10px"}}>Something went wrong</span>} 
    </div>
  );
};

export default Register;
