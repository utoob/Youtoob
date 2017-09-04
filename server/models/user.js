import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import jwt from 'jsonwebtoken'

import { SECRET } from '../config'

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, `can't be blank.`],
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    index: true,
  },
  password: String,
  image: String,
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }]
}, { 
  timestamps: true 
})

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'})

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

UserSchema.methods.generateJWT = function() {
  const today = new Date()
  const exp = new Date(today)
  exp.setDate(today.getDate() + 60)

  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      exp: parseInt(exp.getTime() / 1000, 10),
    },
    SECRET,
  )
}

UserSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    username: this.username,
    token: this.generateJWT()
  }
}

UserSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    username: this.username
  }
}

var User = mongoose.model('User', UserSchema)

/* Static Methods */

User.authenticate = function(user, callback) {
  this.findOne({
    username: user.username
  }).then((foundUser) => {
    if (!foundUser) {
      callback(true)
      return
    }

    bcrypt.compare(user.password, foundUser.password, function(err, isMatch) {
      if (isMatch) {
        callback(null, foundUser)
      } else {
        callback(true)
      }
    })
  })
}

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