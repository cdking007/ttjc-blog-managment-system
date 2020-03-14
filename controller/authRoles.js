function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
}
function ensureNotAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}
function isAdmin(req, res, next) {
  if (req.user.role === "admin") {
    return next();
  }
  res.status(404).redirect("/404");
}
module.exports = {
  ensureAuthenticated,
  ensureNotAuthenticated,
  isAdmin
};
