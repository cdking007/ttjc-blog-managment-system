const User = require("../models/user");
const passport = require("passport");

exports.getLogin = (req, res) => {
  res.render("login", {
    isLogin: false,
    title: "login | bloggerz"
  });
};

exports.getSignup = (req, res) => {
  res.render("register", {
    isLogin: false,
    title: "login | bloggerz"
  });
};

exports.getLogout = (req, res) => {
  req.logout();
  res.redirect("/auth/login");
};

exports.postLogin = (req, res, next) => {
  req.body.username = req.body.username.toLowerCase().trim();
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true
  })(req, res, next);
};

exports.postSignup = async (req, res) => {
  const email = req.body.email;
  const username = req.body.username.toLowerCase().trim();
  const password = req.body.password;
  const checkUsername = await User.findOne({ username });
  const checkEmail = await User.findOne({ email });

  let splChars = "*|,\":<>[]{}`';()@&$#% ";
  for (let i = 0; i < req.body.username.length; i++) {
    if (splChars.indexOf(req.body.username.charAt(i)) != -1) {
      req.flash("error", "Username can not contain special characters!");
      return res.redirect("/auth/register");
    }
  }
  if (checkUsername) {
    req.flash("error", "User already exist with this username");
    return res.redirect("/auth/register");
  }
  if (checkEmail) {
    req.flash("error", "User already exist with this Email");
    return res.redirect("/auth/register");
  }
  if (username.length <= 3 || username.match(/^\d/)) {
    if (username.length <= 3) {
      req.flash("error", "Username length must be more then 3");
      return res.redirect("/auth/register");
    } else {
      req.flash("error", "Username must not start with number");
      return res.redirect("/auth/register");
    }
  }

  const user = new User({ email, username, password });
  await user
    .save()
    .then(() => {
      req.flash("info", "sign up successfully");
      res.redirect("/auth/login");
    })
    .catch(e => console.log(e));
};
