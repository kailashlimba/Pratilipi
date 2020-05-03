const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Shortened_URI = new Schema({
  longURI: {
    type: String,
    required: true
  },
  shortenedURI: {
    type: String,
    default: true
  },
  id: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Item = mongoose.model('shortened_url', Shortened_URI);
