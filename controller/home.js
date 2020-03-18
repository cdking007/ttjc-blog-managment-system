const Post = require("../models/post");

exports.getHomePage = async (req, res) => {
  const posts = await Post.find({}).sort({ createdAt: -1 });
  const popularPosts = await Post.find({})
    .sort({ views: -1 })
    .limit(4);
  res.render("index", {
    isLogin: req.user ? true : false,
    posts,
    popularPosts
  });
};

exports.getPostPage = async (req, res) => {
  const posts = await Post.find({})
    .sort({ createdAt: -1 })
    .limit(4);

  const name = req.params.name;
  const post = await Post.findOne({ urlTitle: name });

  if (!post) {
    return res.status(404).redirect("/404");
  }
  try {
    let views = post.views;
    views++;
    const viewUpdate = await Post.findOneAndUpdate(
      { urlTitle: name },
      { views: views }
    );
    await viewUpdate.save();
  } catch (e) {
    console.log(e);
  }
  res.render("post", {
    post,
    posts,
    isLogin: req.user ? true : false
  });
};

exports.getAddPost = async (req, res) => {
  res.render("addpost", {
    isLogin: req.user ? true : false
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
    res.redirect("/user/posts");
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

exports.getAllPost = async (req, res) => {
  // const uid = mongoose.Types.ObjectId(req.user._id);
  const posts = await Post.find({ owner: req.user._id });

  res.render("posts", {
    posts,
    isLogin: req.user ? true : false
  });
};

exports.getEditPost = async (req, res) => {
  // const id = mongoose.Types.ObjectId(req.params.id);
  const post = await Post.findById(req.params.id);
  console.log(!(post.owner.toString() === req.user._id.toString()));
  if (!(post.owner.toString() === req.user._id.toString())) {
    return res.status(404).redirect("/404");
  }
  if (!post) {
    return res.status(404).redirect("/404");
  }
  res.render("editpost", {
    post,
    isLogin: req.user ? true : false
  });
};

exports.postEditPost = async (req, res) => {
  const id = req.body.id;
  const upost = await Post.findById(id);
  if (!(upost.owner.toString() === req.user._id.toString())) {
    return res.status(404).redirect("/404");
  }
  const post = await Post.findByIdAndUpdate(id, {
    title: req.body.title,
    imgUrl: req.body.imgUrl,
    body: req.body.body,
    keywords: req.body.keywords
  });
  await post.save();
  res.redirect("/user/posts");
};

exports.getDeletePost = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id);
  if (!(post.owner.toString() === req.user._id.toString())) {
    return res.status(404).redirect("/404");
  }
  if (!post) {
    return res.status(404).redirect("/404");
  }

  await Post.findByIdAndRemove(id);
  res.redirect("/user/posts");
};
