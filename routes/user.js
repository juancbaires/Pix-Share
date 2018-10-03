const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const passport = require("passport");
const User = require("../models/user")
const Photo = require('../models/photo')
//^^ requiring the dependencies that my routes need



// GET /
router.get("/", (req, res) => {
  res.render("index");
});

// GET /signup
router.get("/signup", (req, res) => {
  res.render("signup", { message: req.flash("signupMessage") });
});

// POST /signup
router.post("/signup", (req, res) => {
  let signupStrategy = passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/signup",
    failureFlash: true
  });

  return signupStrategy(req, res);
});

// GET /login
router.get("/login", (req, res) => {
  res.render("login", { message: req.flash("loginMessage") });
});

// POST /login
router.post("/login", (req, res) => {
  const loginStrategy = passport.authenticate("local-login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  });

  return loginStrategy(req, res);
});
//get /user/:id page

router.get('/user/:id', (req, res) => {
  User.findById(req.params.id).then(userId => res.render('user', { userId })) 
  Photo.find
});

// GET /logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Restricted (cool people only!)
router.get("/index", (req, res) => {
  if (req.isAuthenticated()) {
    router.get('/', (req, res) =>{
      // Photo.find({url}).then(photos => res.render('/', {photos}))
    });
    res.render('/')
  } else {
    res.redirect("/login");
  }
});

module.exports = router;