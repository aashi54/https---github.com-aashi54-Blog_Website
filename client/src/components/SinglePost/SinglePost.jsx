import "./SinglePost.css";
import { Link, useLoaderData, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";


const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [thumbsUp, setThumbsUp] = useState(false);
  const [thumbsDown, setThumbsDown] = useState(false);
  const [thumbsUpCount, setThumbsUpCount] = useState(0);
  const [thumbsDownCount, setThumbsDownCount] = useState(0);

  useEffect(() => {
     const getPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${path}`);
        setPost(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);
        setThumbsUp(res.data.thumbsUp.includes(user?.username));
        setThumbsDown(res.data.thumbsDown.includes(user?.username));
        setThumbsUpCount(res.data.thumbsUp.length);
        setThumbsDownCount(res.data.thumbsDown.length);
      } catch (err) {
        console.error("Error fetching post:", err);
      }
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

  const handleThumbsUp = async () => {
    try {
      const res = await axios.put(`/api/posts/${post._id}/thumbsUp`, {
        username: user.username,
      });

      if (thumbsDown) {
        setThumbsDownCount(thumbsDownCount - 1);
        setThumbsDown(false);
      }

      setThumbsUp(!thumbsUp);
      setThumbsUpCount(res.data.thumbsUpCount);
    } catch (err) {
      console.error("Error updating thumbs-up:", err);
    }
  };

  const handleThumbsDown = async () => {
    try {
      const res = await axios.put(`/api/posts/${post._id}/thumbsDown`, {
        username: user.username,
      });

      if (thumbsUp) {
        setThumbsUpCount(thumbsUpCount - 1);
        setThumbsUp(false);
      }

      setThumbsDown(!thumbsDown);
      setThumbsDownCount(res.data.thumbsDownCount);
    } catch (err) {
      console.error("Error updating thumbs-down:", err);
    }
  };



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
         <div className="thumbs-button-container">
          <FontAwesomeIcon
            icon={faThumbsUp}
            className={`thumbs-icon ${thumbsUp ? "thumbs-up" : ""}`}
            onClick={handleThumbsUp}
          />
          <span className="thumbs-count">{thumbsUpCount}</span>
          <FontAwesomeIcon
            icon={faThumbsDown}
            className={`thumbs-icon ${thumbsDown ? "thumbs-down" : ""}`}
            onClick={handleThumbsDown}
          />
          <span className="thumbs-count">{thumbsDownCount}</span>
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
