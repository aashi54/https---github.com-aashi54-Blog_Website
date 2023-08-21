import { useState, useEffect } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import axios from "axios";


const Sidebar = () => {
  const [cats,setCats] = useState([]);

  useEffect(()=>{
       const getCats = async()=>{
        const res = await axios.get("/api/categories")
        setCats(res.data)
       }
       getCats();
  },[])
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img src="https://i.postimg.cc/rwF7HmFD/7386b23930c14c8395be91902e64712f.png" alt="Img"/>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate
          explicabo nemo quos officia officiis vero exercitationem adipisci
          laborum soluta. At omnis eius, quaerat inventore sed officiis laborum
          dicta, qui iste esse rem aspernatur necessitatibus delectus temporibus
          eum vero veritatis minima.
        </p>
      </div>
      <div className="sidebarItem">
      <span className="sidebarTitle">CATEGORIES</span>
      <ul className="sidebarList">
        {cats.map(c=>(
          <Link to={`/?cat=${c.name}`} className="link" key={c._id}>
            <li className="sidebarListItem">{c.name}</li>
            </Link>
        ))}
       

      </ul>
      </div>
      <div className="sidebarItem">
      <span className="sidebarTitle">FOLLOW US</span>
      <div className="sidebarSocial">
        <i className="sidebarIcon  fa-brands fa-square-facebook"></i>
        <i className="sidebarIcon fa-brands fa-square-twitter"></i>
        <i className="sidebarIcon fa-brands fa-pinterest-p"></i>
        <i className="sidebarIcon fa-brands fa-square-instagram"></i>
      </div>
      </div>
    </div>
  );
};

export default Sidebar;
