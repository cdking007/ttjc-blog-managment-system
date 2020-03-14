const express = require("express");
const router = express.Router();
const admin = require("../../controller/admin");
const { ensureAuthenticated, isAdmin } = require("../../controller/authRoles");

// router.get("/", ensureAuthenticated, isAdmin, admin.getDashboard);
router.get("/", admin.getDashboard);
router.get("/addpost", ensureAuthenticated, isAdmin, admin.getAddPost);
router.get("/posts", ensureAuthenticated, isAdmin, admin.getAllPost);
router.post("/addpost", ensureAuthenticated, isAdmin, admin.postAddPost);

module.exports = router;
