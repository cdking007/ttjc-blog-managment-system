// loading the core modules from the npm
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");

// init db here
require("./db/connetion");
// passport js function calling here
require("./routes/admin/security")(passport);

// router paths
const homeRoutes = require("./routes/home/home");
const adminRoutes = require("./routes/admin/posts");
const authRoutes = require("./routes/admin/auth");

// initializing the express app
const app = express();

app.set("views", path.join(__dirname, ".", "templates"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, ".", "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// setting up flash

app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SEC,
    resave: true,
    saveUninitialized: true
  })
);
//passport js authos
app.use(passport.initialize());
app.use(passport.session());

// routing setups
app.use(homeRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

// 404 route

app.use((req, res) => {
  res.status(404).render("404", {
    isLogin: req.user ? true : false
  });
});

// saving the port
const port = process.env.PORT;

app.listen(port, () => {
  console.log("server is started on " + port);
});
