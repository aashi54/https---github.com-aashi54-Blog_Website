import { useContext , useRef} from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios"
import { Context } from "../../../context/Context";
import Header from '../../Header/Header';
import { useAuth } from "../../../context/Context";

const Login = () => {
  const { setUser } = useAuth();
  const userRef = useRef();
  const passwordRef = useRef();
  const {dispatch, isFetching}=  useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/api/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });

      setUser(res.data);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  
  return (
    <div className="login">
      <Header/>
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          ref = {userRef}
        />

        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref = {passwordRef}
        />

        <button className="loginButton" type="submit" disabled={isFetching}>
          Login 
        </button>
     
      </form>
      {/* <button className="loginRegisterButtton">Register</button> */}
    </div>
  );
};

export default Login;
