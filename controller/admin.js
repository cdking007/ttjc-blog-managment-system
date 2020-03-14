const Post = require("../models/post");
const User = require("../models/user");
exports.getDashboard = async (req, res) => {
  const totPost = await Post.find({}).count();
  const totUser = await User.find({}).count();
  res.render("admin/dashboard", {
    postCount: totPost,
    userCount: totUser,
    viewsCount: "coming soon.."
  });
};
exports.getAddPost = (req, res) => {
  res.render("admin/addpost");
};
exports.getAllPost = async (req, res) => {
  const posts = await Post.find({});
  res.render("admin/posts", {
    posts
  });
};
exports.postAddPost = async (req, res) => {
  const title = req.body.title;
  const urlTitle = title.replace(/ /g, "-");
  const imgUrl = req.body.imgUrl;
  const body = req.body.body;
  const keywords = req.body.keywords;
  // console.log(body);
  // console.log(req.body);
  try {
    const post = new Post({
      title,
      urlTitle,
      imgUrl,
      body,
      keywords,
      owner: req.user._id
    });
    await post.save();
    res.redirect("/admin");
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};
