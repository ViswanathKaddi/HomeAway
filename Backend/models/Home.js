const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const HomeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
 
  houseName: {
    type: String
  },
  houseLocation: {
    type: String
  },
  houseAvailableFrom: {
    type: Date
  },
  houseAvailableTill: {
    type: Date,
  },
  guestCapacity: {
    type: Number
  },
  houseArea: {
    type: Number
  },
  houseImage: {
    type: String,
  },
  houseDescription: {
    type: String,
  },

  housePrice: {
    type: Number
  },

  houseOwnerName: {
      type: String
  }

});

module.exports = Home = mongoose.model('home', HomeSchema);