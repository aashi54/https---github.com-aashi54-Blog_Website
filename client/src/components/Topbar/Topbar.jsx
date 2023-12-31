import { Link } from "react-router-dom";
import "./topbar.css";
import { useContext } from "react";
import { Context } from "../../context/Context";
import Payment from "./Payment";

export default function Topbar() {
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">  <Link className="link" to="/about">
              ABOUT
            </Link></li>
          <li className="topListItem">  <Link className="link" to="/contact">
              CONTACT
            </Link></li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/mypost">
              MY POST
            </Link>
          </li>

          {user && (
            <li className="topListItem" onClick={handleLogout}>
              LOGOUT
            </li>
          )}
        
        </ul>
      </div>
      <div className="topRight">
        
        {user ? (
          <Link className="link" to="/settings">
            <img className="topImg" src={user.profilePic} alt="" />
      
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <Payment/>
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
