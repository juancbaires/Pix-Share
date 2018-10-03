const User = require('../models/user');
const { Photo } = require('../models/photo');
const bcrypt = require('bcrypt-nodejs');

const createPassword = password =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);


  User.find({}).remove(() => {
    Photo.find({}).remove(() => {
      User.create({
        local: {
          email: "bugsbunny@gmail.com",
          password: createPassword("bugsbunny")
        }
    }).then(user => {
      Promise.all([
        Photo.create({
          path: "TestPic.jpeg",
          author: user._id,
        }).then(photo => {
          user.photos.push(photo)
        })
      ])
    })
    

    })
  })
  
