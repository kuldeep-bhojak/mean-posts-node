const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const Post = require("../models/post");

router.get("", (req, res, next) => {
  Post.find()
    .then((documents) => {
      res.status(200).json({
        messae: "Posts fetched successfully.",
        posts: documents,
      });
    })
    .catch((err) => {
      console.log("Error in fetching post", err);
    });
});

router.post("/add", checkAuth, (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save();
  res.status(201).json({
    message: "Post Added.",
  });
});

module.exports = router;
