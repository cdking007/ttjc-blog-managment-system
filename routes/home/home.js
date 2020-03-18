const express = require("express");
const router = express.Router();
const home = require("../../controller/home");
const { ensureAuthenticated, isAdmin } = require("../../controller/authRoles");

router.get("/", home.getHomePage);
router.get("/user/addpost", ensureAuthenticated, home.getAddPost);
router.post("/user/addpost", ensureAuthenticated, home.postAddPost);
router.get("/user/posts", ensureAuthenticated, home.getAllPost);
router.get("/user/post/edit/:id", ensureAuthenticated, home.getEditPost);
router.post("/user/post/edit", ensureAuthenticated, home.postEditPost);
router.get("/user/post/delete/:id", ensureAuthenticated, home.getDeletePost);
router.get("/post/:name", home.getPostPage);

module.exports = router;
