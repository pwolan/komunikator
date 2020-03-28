module.exports = {
  redirectLogin(req, res, next) {
    if (req.session.user && req.cookies.session_sid) {
      next();
    } else {
      res.redirect("/login");
    }
  },
  redirectHome(req, res, next) {
    if (req.session.user && req.cookies.session_sid) {
      res.redirect("/");
    } else {
      next();
    }
  }
};
