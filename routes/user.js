const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const User = require('../models/user');
const { Photo, Comment } = require('../models/photo');
const multer = require('multer');
const fs = require('fs');
// const path = require('path');
//^^ requiring the dependencies that my routes need

// GET /
router.get('/', (req, res) => {
  res.render('index');
});

// GET /signup
router.get('/signup', (req, res) => {
  res.render('signup', { message: req.flash('signupMessage') });
});

// POST /signup
router.post('/signup', (req, res) => {
  let signupStrategy = passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  });

  return signupStrategy(req, res);
});

// GET /login
router.get('/login', (req, res) => {
  res.render('login', { message: req.flash('loginMessage') });
});

// POST /login
router.post('/login', (req, res) => {
  const loginStrategy = passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  });

  return loginStrategy(req, res);
});
//get /user/:id page

router.get('/user/:id', (req, res) => {
  User.findById(req.params.id).then(userId => res.render('user', { userId }));
});
// router.get('/user/:id', (req, res) => {
//   Photo.show();
// });
//post image upload
const multerConfig = {
  storage: multer.diskStorage({
    //Setup where the user's file will go
    destination: function(req, file, next) {
      console.log('hit destination');
      next(null, './public/photo-storage');
    },

    //Then give the file a unique name
    filename: function(req, file, next) {
      console.log('file: ', file);
      console.log('originalname: ', file.originalname);
      const ext = file.mimetype.split('/')[1];
      next(null, file.originalname);
    }
  }),
  //A means of ensuring only images are uploaded.
  fileFilter: function(req, file, next) {
    if (!file) {
      next();
    }

    const image = file.mimetype.startsWith('image/');
    if (image) {
      console.log('photo uploaded');
      next(null, true);
    } else {
      console.log('file not supported');

      //TODO:  A better message response to user on failure.
      return next();
    }
  }
};
//img upload

router.post('/upload', multer(multerConfig).single('photo'), (req, res) => {
  console.log(req.file);
  Photo.create({
    path: req.file.originalname,
    author: req.user._id
  }).then(photo => {
    req.user.photos.push(photo);
    req.user.save(err => {
      res.render('user');
    });
  });
});
// delete Single photo

router.delete('/index/:id', (req, res) => {
  Photo.findByIdAndRemove(req.params.id).then(image => res.redirect('/'));
});

// create a comment
router.put('/:id', (req, res) => {
  let { content } = req.body;
  Photo.findById({ _id: req.params.id }).then(photo => {
    photo.comments.push({
      content,
      author: req.user_id
    });
    photo.save(err => {
      res.redirect('index');
    });
  });
});

// GET /logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Restricted (cool people only!)
router.get('/index', (req, res) => {
  if (req.isAuthenticated()) {
    Photo.find({})
      .populate('author')
      .then(photo => {
        // photo.path.slice(21);
        res.render('index', { photo });
      });
  } else {
    res.redirect('/login');
  }
});

router.delete('/:id', (req, res) => {
  if (req.isAuthenticated()) {
    Photo.findByIdAndRemove({ _id: req.params.id }).then(photo => {
      res.redirect('index');
    });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
