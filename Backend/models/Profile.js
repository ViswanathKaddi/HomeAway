const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
 
  gender: {
    type: String
  },
  phonenumber: {
    type: String
  },
  city: {
    type: String
  },
  country: {
    type: String,
    required: true
  },
  languages: {
    type: [String],
    required: true
  },
  company: {
    type: String
  },
  about: {
    type: String
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
