import mongoose from '../../../server/db'
import User from '../../../server/models/user'
import * as api from '../../../client/utils/api'
import app from '../../../server'

/* This is going to be an integration tests which means testing combined parts of the system.
 * We will be setting up our database and tearing them down after each tests to
 * make each tests independent of one another.
 */

const JWT_REGEX = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/

let server
let apiInstance = api.instance({ baseURL: 'http://localhost:3001/api' })

const testUser = {
  username: 'testUsername',
  password: 'testPassword'
}

beforeAll((done) => {
  // We want to initialize our server just before we run all of the tests
  // Note that it is a separate instance of our app and it is running on port 3001
  // We want to invoke the `done` function to indicate we are finished with beforeAll setup.
  server = app.listen(3001, () => {
    done()
  })
})

afterEach((done) => {
  // We want to make sure that tests run independent of each other
  // So we wipe out the User table for each test that ran.
  User.remove({}).then(done)
})

afterAll((done) => {
  mongoose.connection.close(() => {
    done()
    server.close()
  })
})

/* Objectives:
 * - Perform an integration test. To know more about integration tests
 *   read: https://en.wikipedia.org/wiki/Integration_testing
 * - This time, we are testing whether both register endpoint and User model works.
 * - We want to make sure that making a request to the endpoint will handle user creation.
 */

/* To pass the prompt:
 *
 * 1. Make a post request to the register endpoint, passing in testUser as the post body.
 * 2. The api is going to return us a response object, we wanna extract the data out of it,
 *    so invoke api.extractData to get the date out of the response object.
 * 3. Assert that the resolved value has the shape of what user.toAuthJSON() returns.
 * 4. Query the User model using the testUser.username and assert that the result is defined.
 */
test('register endpoint should create a user', (done) => {
  apiInstance.post('/register', testUser)
    .then(api.extractData)
    .then((data) => {
      expect(data).toEqual({
        _id: expect.any(String),
        username: testUser.username,
        token: expect.stringMatching(JWT_REGEX)
      })

      User.find({ username: testUser.username }).then((newUser) => {
        expect(newUser).toBeDefined()
        done()
      })
    })
})

test('login endpoint should login a user', (done) => {
  var user = new User(testUser)
  User.register(user, (newUser) => {
    apiInstance.post('/login', testUser)
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