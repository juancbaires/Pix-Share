const User = require('../models/user');
const { Photo } = require('../models/Photo');
const bcrypt = require('bcrypt-nodejs');

const createPassword = password =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

// User.find({}).remove(() => {
//   Photo.find({}).remove(() => {
    let bugs = User.create({
      email: 'bugsbunny@gmail.com',
      password: createPassword('bugsbunny')
    }).then(user => {
      Promise.all([
        Photo
          .create({
            url:
              'https://media1.giphy.com/media/aqFuzQ98vdHLG/giphy.gif?cid=3640f6095bb2c78a336f6c4663e6bdbf',
            content: "eh, what's up doc?",
            author: user._id
          })
          .then(Photo => {
            user.Photos.push(Photo);
          }),
        Photo
          .create({
            url:
              'https://media1.giphy.com/media/13QGcRvLujRHq0/giphy.gif?cid=3640f6095bb2c78a336f6c4663e6bdbf',
            content: "That's all, folks!",
            author: user._id
          })
          .then(Photo => {
            user.Photos.push(Photo);
          })
      ]).then(() => {
        user.save(err => console.log(err));
      });
    });

    let daffy = User.create({
      email: 'daffyduck@gmail.com',
      password: createPassword('daffyduck')
    }).then(user => {
      Promise.all([
        Photo
          .create({
            url:
              'https://media1.giphy.com/media/zNyBPu5hEFpu/giphy.gif?cid=3640f6095bb2c78a336f6c4663e6bdbf',
            content: "Who's this Duck Dodgers any how?",
            author: user._id
          })
          .then(Photo => {
            user.Photos.push(Photo);
          }),
        Photo
          .create({
            url:
              'https://media1.giphy.com/media/KZZXBweLSCikg/giphy.gif?cid=3640f6095bb2c78a336f6c4663e6bdbf',
            content: "You're dethpicable.",
            author: user._id
          })
          .then(Photo => {
            user.Photos.push(Photo);
          })
      ]).then(() => {
        user.save(err => console.log(err));
      });
    });

    let elmer = User.create({
      email: 'elmerfudd@gmail.com',
      password: createPassword('elmerfudd')
    }).then(user => {
      Promise.all([
        Photo
          .create({
            url:
              'https://media1.giphy.com/media/kNzFwWMFkGufm/giphy.gif?cid=3640f6095bb2c78a336f6c4663e6bdbf',
            content:
              "Shh. Be vewy vewy quiet. I'm hunting wabbits! Huh-huh-huh-huh!",
            author: user._id
          })
          .then(Photo => {
            user.Photos.push(Photo);
          }),

        Photo
          .create({
            url:
              'https://media0.giphy.com/media/8ZFkQEZd1xdBK/giphy.gif?cid=3640f6095bb2c78a336f6c4663e6bdbf',
            content: 'Kiww da wabbit!',
            author: user._id
          })
          .then(Photo => {
            user.Photos.push(Photo);
          })
      ]).then(() => {
        user.save(err => console.log(err));
      });
    });
//   });
// });
