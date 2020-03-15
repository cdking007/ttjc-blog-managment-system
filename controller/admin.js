const Post = require("../models/post");
const User = require("../models/user");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

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
  // const uid = mongoose.Types.ObjectId(req.user._id);
  const posts = await Post.find({});
  const users = await User.find({});

  res.render("admin/posts", {
    posts,
    users
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
exports.getEditPost = async (req, res) => {
  // const id = mongoose.Types.ObjectId(req.params.id);
  const post = await Post.findById(req.params.name);
  if (!post) {
    return res.status(404).redirect("/404");
  }
  res.render("admin/editpost", {
    post
  });
};

exports.postEditPost = async (req, res) => {
  const id = req.body.id;
  const post = await Post.findByIdAndUpdate(id, {
    title: req.body.title,
    imgUrl: req.body.imgUrl,
    body: req.body.body,
    keywords: req.body.keywords
  });
  await post.save();
  res.redirect("/admin/posts");
};

exports.getDeletePost = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id);
  if (!post) {
    return res.status(404).redirect("/404");
  }

  await Post.findByIdAndRemove(id);
  res.redirect("/admin/posts");
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.render("admin/users", { users });
};
exports.getEditUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).redirect("/404");
  }
  res.render("admin/edituser", { user });
};
exports.postEditUser = async (req, res) => {
  const id = req.body.id;
  const u = await User.findById(id);
  if (!u) {
    return res.status(404).redirect("/404");
  }
  const user = await User.findByIdAndUpdate(id, {
    email: req.body.email,
    role: req.body.role
  });
  await user.save();
  res.redirect("/admin/users");
};

exports.postChangePassword = async (req, res) => {
  const id = req.body.id;
  const u = await User.findById(id);
  if (!u) {
    return res.status(404).redirect("/404");
  }
  const password = await bcryptjs.hash(req.body.password, 10);
  const user = await User.findByIdAndUpdate(id, { password: password });
  await user.save();
  res.redirect("/admin/users");
};

exports.getDeleteUser = async (req, res) => {
  const id = req.params.id;
  const u = await User.findById(id);
  if (!u) {
    return res.status(404).redirect("/404");
  }

  await User.findByIdAndRemove(id);
  res.redirect("/admin/users");
};
