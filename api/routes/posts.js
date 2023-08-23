const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

// Create new Post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update post

router.put("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.username === req.body.username) {
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedPost);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

//delete post

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (post.username) {
      try {
        await Post.deleteOne(post);
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {

      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get post
router.get("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// get user posts who logged in 

router.get("/user/:username", async (req, res) => {
  try {
    const posts = await Post.find({ username: req.params.username });
    res.status(200).json(posts);
  } catch (err) {
    console.error("Error fetching user's posts:", err);
    res.status(500).json(err);
  }
});




//Get all posts

router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
      let posts;
      if (username) {
        posts = await Post.find({ username });
      } else if (catName) {
        posts = await Post.find({
          categories: {
            $in: [catName],
          },
        });
      } else {
        posts = await Post.find();
      }
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Like dislike functionality

// Update the thumbs-up
router.put("/:id/thumbsUp", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);


    if (post.thumbsDown.includes(req.body.username)) {
      await post.updateOne({ $pull: { thumbsDown: req.body.username } });
    }

    if (!post.thumbsUp.includes(req.body.username)) {
  
      await post.updateOne({ $push: { thumbsUp: req.body.username } });

  
      const updatedPost = await Post.findById(req.params.id);
      const thumbsUpCount = updatedPost.thumbsUp.length;
      const thumbsDownCount = updatedPost.thumbsDown.length;

      res.status(200).json({ thumbsUpCount, thumbsDownCount });
    } else {
      
      await post.updateOne({ $pull: { thumbsUp: req.body.username } });

      
      const updatedPost = await Post.findById(req.params.id);
      const thumbsUpCount = updatedPost.thumbsUp.length;
      const thumbsDownCount = updatedPost.thumbsDown.length;

      res.status(200).json({ thumbsUpCount, thumbsDownCount });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update the thumbs-down
router.put("/:id/thumbsDown", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const username = req.body.username;

    
    if (post.thumbsUp.includes(req.body.username)) {
      await post.updateOne({ $pull: { thumbsUp: req.body.username } });
    }

    if (!post.thumbsDown.includes(username)) {
     
      await post.updateOne({ $push: { thumbsDown: username } });

    
      const updatedPost = await Post.findById(req.params.id);
      const thumbsUpCount = updatedPost.thumbsUp.length;
      const thumbsDownCount = updatedPost.thumbsDown.length;

      res.status(200).json({ thumbsUpCount, thumbsDownCount });
    } else {
      
      await post.updateOne({ $pull: { thumbsDown: username } });

    
      const updatedPost = await Post.findById(req.params.id);
      const thumbsUpCount = updatedPost.thumbsUp.length;
      const thumbsDownCount = updatedPost.thumbsDown.length;

      res.status(200).json({ thumbsUpCount, thumbsDownCount });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

  
  module.exports = router;
