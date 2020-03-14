const Post = require("../models/post");

exports.getHomePage = async (req, res) => {
  const posts = await Post.find({});
  res.render("index", {
    isLogin: req.user ? true : false,
    posts
  });
};

exports.getPostPage = async (req, res) => {
  const name = req.params.name;
  const post = await Post.findOne({ urlTitle: name });
  if (!post) {
    return res.status(404).redirect("/404");
  }
  res.render("post", {
    post,
    isLogin: req.user ? true : false
  });
};
