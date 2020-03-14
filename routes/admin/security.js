const localStrategy = require("passport-local").Strategy;
const bcryptjs = require("bcryptjs");
const User = require("../../models/user");

function intialize(passport) {
  async function authenticateUser(username, password, done) {
    await User.findOne({ username: username })
      .then(user => {
        if (!user) {
          return done(null, false, { message: "User Not Found!" });
        }
        // then we will check
        bcryptjs.compare(password, user.password, (err, isMatch) => {
          if (err) {
            throw new Error(err);
          }

          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, "wrong creditional Details!");
          }
        });
      })
      .catch(err => console.log(err));
  }
  passport.use(
    new localStrategy({ usernameField: "username" }, authenticateUser)
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, function(err, user) {
      done(null, user);
    });
  });
}

module.exports = intialize;
