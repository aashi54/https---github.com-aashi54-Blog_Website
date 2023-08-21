import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../../../context/Context";
import Post from "../../Post/Post";
import Header from "../../Header/Header";
import Sidebar from "../../Sidebar/Sidebar";
import "./MyPosts.css"


const MyPosts = () => {
  const { user } = useContext(Context);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await axios.get(`/api/posts/user/${user.username}`);
        setUserPosts(res.data);
      } catch (err) {
        console.error("Error fetching user's posts:", err);
      }
    };
    if (user) {
      fetchUserPosts();
    }
  }, [user]);

  return (
      <>
      <Header/>
      <h1 className="userpost-heading"> Your Posts</h1>
      <div className="home">
       
     
      {userPosts.map((post) => (
        <Post key={post._id} post={post} /> 
      ))}

      </div>
    
    </>
    
  );
};

export default MyPosts;
