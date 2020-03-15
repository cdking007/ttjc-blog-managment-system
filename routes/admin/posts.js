const express = require("express");
const router = express.Router();
const admin = require("../../controller/admin");
const { ensureAuthenticated, isAdmin } = require("../../controller/authRoles");

// router.get("/", ensureAuthenticated, isAdmin, admin.getDashboard);
router.get("/", ensureAuthenticated, isAdmin, admin.getDashboard);
router.get("/addpost", ensureAuthenticated, isAdmin, admin.getAddPost);
router.get("/posts", ensureAuthenticated, isAdmin, admin.getAllPost);
router.post("/addpost", ensureAuthenticated, isAdmin, admin.postAddPost);
router.post("/edit", ensureAuthenticated, isAdmin, admin.postEditPost);
router.post("/user/edit", ensureAuthenticated, isAdmin, admin.postEditUser);
router.post(
  "/user/edit/changepass",
  ensureAuthenticated,
  isAdmin,
  admin.postChangePassword
);
router.get("/users", ensureAuthenticated, isAdmin, admin.getAllUsers);
router.get("/delete/:id", ensureAuthenticated, isAdmin, admin.getDeletePost);
router.get("/user/edit/:id", ensureAuthenticated, isAdmin, admin.getEditUser);
router.get(
  "/user/delete/:id",
  ensureAuthenticated,
  isAdmin,
  admin.getDeleteUser
);
router.get("/edit/:name", ensureAuthenticated, isAdmin, admin.getEditPost);

module.exports = router;
