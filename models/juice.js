const mongoose = require('mongoose');

const favoriteSchema = mongoose.Schema({

  username: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const juiceSchema = new mongoose.Schema({
    imgUrl: String,
    favorites: [favoriteSchema] 
  })
 

module.exports = mongoose.model('Juice', juiceSchema);