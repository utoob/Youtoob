import '../db'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

var UserSchema = new mongoose.Schema({
  username: String,
  passwordHash: String,
  image: String,
  favorites: [{ type: mongoose.Schema.types.ObjectId, ref: 'Video' }]
}, { 
  timestamps: true 
})

/* Instance Methods */

UserSchema.methods.setPassword = function(password) {}

UserSchema.methods.validPassword = function(password) {}

UserSchema.methods.favorite = function(id) {
  if (this.favorites.indexOf(id) === -1) {
    this.favorites.push(id)
  }
  return this.save()
}

UserSchema.methods.unfavorite = function(id) {
  this.favorites.remove(id)
  return this.save()
}

UserSchema.methods.isFavorite = function(id) {
  return this.favorites.some(favoriteId => {
    return favoriteId.toString() === id.toString()
  })
}

var User = mongoose.model('User', UserSchema)


/* Static Methods */

User.register = function(user, callback) {
  bcrypt.hash(user.password, 12, function(err, hash) {
    if (err) {
      callback(err)
    } else {
      user.password = hash
      user.save(callback)
    }
  })
}

export default User