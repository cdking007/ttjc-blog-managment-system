const express = require("express");
const router = express.Router();
const home = require("../../controller/home");

router.get("/", home.getHomePage);
router.get("/post/:name", home.getPostPage);

module.exports = router;
