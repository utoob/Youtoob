// This is going to be an integration tests, testing multiple parts of the system
// We will be setting up our database and tearing them down after each tests
// Making each tests independent of each other

import mongoose from '../../../server/db'
import User from '../../../server/models/user'
import * as api from '../../../client/utils/api'
import app from '../../../server'

const JWT_REGEX = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/

let server

const testUser = {
  username: 'testUsername',
  password: 'testPassword'
}

beforeAll((done) => {
  server = app.listen(3001, done)
})

afterEach((done) => {
  User.remove({}).then(done)
})

afterAll((done) => {
  mongoose.connection.close(() => {
    done()
    server.close()
  })
})

test('register endpoint should create a user', () => {
  return api.instance().post('/register', testUser)
    .then(api.extractData)
    .then((newUser) => {
      expect(newUser).toEqual({
        _id: expect.any(String),
        username: testUser.username,
        token: expect.stringMatching(JWT_REGEX)
      })
    })
})

test('login endpoint should login a user', (done) => {
  var user = new User(testUser)
  User.register(user, (newUser) => {
    api.instance().post('/login', testUser)
      .then(api.extractData)
      .then((loggedInUser) => {
        expect(loggedInUser).toEqual({
          _id: expect.any(String),
          username: testUser.username,
          token: expect.stringMatching(JWT_REGEX)
        })
        done()
      })
  })
})