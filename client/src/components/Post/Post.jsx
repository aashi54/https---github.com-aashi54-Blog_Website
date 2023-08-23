import "./Post.css";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";



const Post = ({ post }) => {
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [thumbsUp, setThumbsUp] = useState(
    user ? post.thumbsUp.includes(user.username) : false
  );
  const [thumbsDown, setThumbsDown] = useState(
    user ? post.thumbsDown.includes(user.username) : false
  );
  const [thumbsUpCount, setThumbsUpCount] = useState(post.thumbsUp.length);
  const [thumbsDownCount, setThumbsDownCount] = useState(post.thumbsDown.length);
  
  const handleThumbsUp = async () => {
    try {
      const res = await axios.put(`/api/posts/${post._id}/thumbsUp`, {
        username: user.username,
      });

      // If thumbs-down was clicked, decrement thumbs-down count
      if (thumbsDown) {
        setThumbsDownCount(thumbsDownCount - 1);
      }

      // Update thumbs-up state and count
      setThumbsUp(!thumbsUp);
      setThumbsDown(false);
      setThumbsUpCount(res.data.thumbsUpCount);
      setThumbsDownCount(res.data.thumbsDownCount);
    } catch (err) {
      console.error("Error updating thumbs-up:", err);
    }
  };

  const handleThumbsDown = async () => {
    try {
      const res = await axios.put(`/api/posts/${post._id}/thumbsDown`, {
        username: user.username,
      });

      // If thumbs-up was clicked, decrement thumbs-up count
      if (thumbsUp) {
        setThumbsUpCount(thumbsUpCount - 1);
      }

      // Update thumbs-down state and count
      setThumbsDown(!thumbsDown);
      setThumbsUp(false);
      setThumbsUpCount(res.data.thumbsUpCount);
      setThumbsDownCount(res.data.thumbsDownCount);
    } catch (err) {
      console.error("Error updating thumbs-down:", err);
    }
  };



  return (
    <div className="post">
      {post.photo && <img className="postImg" src={PF+ post.photo} alt="" />}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => (
            <span className="postCat">{c.name}</span>
          ))}
        </div>
        <Link to={`/posts/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
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
    </div>
  );
};

export default Post;