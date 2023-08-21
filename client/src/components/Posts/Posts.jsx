import Post from "../Post/Post"
import "./Posts.css"
// import { postData } from "../../PostData"

const Posts = ({posts}) => {
  return (
    <div className="posts">
      {posts.map((p) => (
        <Post  key={p._id} post={p} />
      ))}

    </div>
  )
}

export default Posts
