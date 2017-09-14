import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import jwt from 'jsonwebtoken'

import { SECRET } from '../config'

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, `can't be blank.`],
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    index: true,
  },
  password: String,
}, { 
  timestamps: true 
})

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'})

/* Instance Methods */

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
      callback(new Error('User not found.'))
      return
    }

    bcrypt.compare(user.password, foundUser.password, function(err, isMatch) {
      if (isMatch) {
        callback(null, foundUser)
      } else {
        console.log(user, foundUser)
        callback(new Error('Password does not match.'))
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