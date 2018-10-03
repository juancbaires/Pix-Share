const User = require('../models/user');
const { Photo } = require('../models/photo');
const bcrypt = require('bcrypt-nodejs');
const createPassword = password =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);


  User.find({}).remove(() => {
    Photo.find({}).remove(() => {
      User.create({
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFIvxj0s5p13prrEgWSxD9K6h0tmvZoVxJ3gjT0IOs0vrRywya',
        local: {
          email: "bugsbunny@gmail.com",
          password: createPassword("bugsbunny")
        }
      // }).then(user => {
      //   Promise.all([
      //     Photo.create({
      //       url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFIvxj0s5p13prrEgWSxD9K6h0tmvZoVxJ3gjT0IOs0vrRywya",
      //       content: "eh, what's up doc?",
      //       author: user._id
      //     }).then(comment => {
      //       user.comments.push(comment);
      //     }),
      //     Photo.create({
      //       url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSRR7LQzlPIy1BLVOy09TX-NH7itM0mLs6bvcbvwpOLREiz5eB',
      //       content: "That's all, folks!",
      //       author: user._id
      //     }).then(comment => {
      //       user.comments.push(comment);
      //     })
      //   ]).then(() => {
      //     user.save(err => console.log(err));
      //   });
      // })
    })
  })})
