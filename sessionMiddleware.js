const session = require("express-session");

const sessionMiddleware = session({
  secret: "Muy8fuSOYHDsR6WOCwNS6K6sy2QmhSEp",
  resave: false,
  saveUninitialized: true,
});

const isUserSignedIn = (req, res, next) => {
  if (!req.session.isSignedIn) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = { sessionMiddleware, isUserSignedIn };
