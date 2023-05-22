const express = require("express");
const passport = require("passport");
const router = express.Router();
const googleAuthController = require("../controllers/googleAuthController");

  
router.get('/signup',passport.authenticate('google', { scope: ['profile'] }));
router.get('/login', passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
   res.redirect('/');
});
  
module.exports = router;