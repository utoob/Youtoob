import express from 'express'
import User from '../models/user'

const router = express.Router()

/* Make route handlers */

const login = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  })

  User.authenticate(user, (err, authenticatedUser) => {
    if (err) {
      console.log(err)
      res.sendStatus(400)
    }
    else
      res.json(authenticatedUser.toAuthJSON())
  })
}

const register = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  })

  User.register(user, (err, newUser) => {
    if (err)
      res.status(400).send(err.errors)
    else 
      res.json(newUser.toAuthJSON())
  })
}

/* Hook router to route handlers */

router.post('/login', login)

router.post('/register', register)

export default router