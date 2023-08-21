import "./Post.css";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";


const Post = ({ post }) => {
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [liked, setLiked] = useState(post.likes.includes(user.username));
  const [likes, setLikes] = useState(post.likes.length);


  const handleLike = async () => {
    try {
      const res = await axios.put(`/api/posts/${post._id}/like`, {
        username: user.username,
      });
      setLikes(res.data.likes.length);
      setLiked(!liked);
    } catch (err) {
      console.error("Error liking post:", err);
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
      <div className="like-button" onClick={handleLike}>
        <FontAwesomeIcon
          icon={faHeart}
          className={`heart-icon ${liked ? "liked" : ""}`}
        />
        <span className="like-count">{likes}</span>
      </div>
    </div>
  );
};

export default Post;