const express = require("express");
const router = express.Router();
const auth = require("../../controller/auth");
const {
  ensureNotAuthenticated,
  ensureAuthenticated,
  isAdmin
} = require("../../controller/authRoles");

router.get("/login", ensureNotAuthenticated, auth.getLogin);
router.post("/login", ensureNotAuthenticated, auth.postLogin);
router.get("/register", ensureNotAuthenticated, auth.getSignup);
router.post("/signup", ensureNotAuthenticated, auth.postSignup);
router.get("/logout", ensureAuthenticated, auth.getLogout);

module.exports = router;
