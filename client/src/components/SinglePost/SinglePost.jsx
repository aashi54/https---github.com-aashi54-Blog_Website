import "./SinglePost.css";
import { Link, useLoaderData, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`/api/posts/${path}`);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setLiked(res.data.likes.includes(user?.username));
      setLikes(res.data.likes.length);
    };
    getPost();
  }, [path, user]);

  const handleDelete = async () => {
    try {
      debugger
      await axios.delete(`/api/posts/${post._id}`, {
     username: user.username,
      });
    
      window.location.replace("/");
    } catch (err) {
      console.log(user);
      // console.log(err);
    }
  };

  const handleLike = async () => {
    try {
      const res = await axios.put(`/api/posts/${post._id}/like`, {
        username: user.username,
      });
      if(liked==false){
        setLikes(res.data.likes.length + 1);
      }
      else if(liked==true){
        setLikes(res.data.likes.length - 1);
      }
      
      setLiked(!liked);
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };



   const handleUpdate = async() =>{
           try{
            await axios.put(`/api/posts/${post._id}` , {
             username: user.username,
              title, 
              desc,
            });
            // window.location.reload()
            setUpdateMode(false)

           }catch(err){

           }
   }



  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input type="text" value={title} className="singlePostTitleInput" autoFocus onChange={(e)=>setTitle(e.target.value)}/>
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon fa-regular fa-pen-to-square"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon fa-solid fa-trash-can"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="like-button" onClick={handleLike}>
            <FontAwesomeIcon
              icon={faHeart}
              className={`heart-icon ${liked ? "liked" : ""}`}
            />
            <span className="like-count">{likes}</span>
          </div>

        <div className="singlePostInfo">
        
          <span className="singlePostAuthor">
            Autor:
            <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>{" "}
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc"> {desc}</p>
        )}

       {
        updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>Update</button>
        )
       }

       
      </div>
    </div>
  );
};

export default SinglePost;
