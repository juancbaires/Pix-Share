const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const Comment = new Schema({
  content: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  author: {
    type: Schema.Types.ObjectId,
    type: String,
    ref: 'User',
    default: 'who knows'
  }
});

const Photo = new Schema({
  path: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  comments: [Comment]
});

module.exports = {
  Photo: mongoose.model('Photo', Photo),
  Comment: mongoose.model('Comment', Comment)
};
