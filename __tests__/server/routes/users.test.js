import mongoose from '../../../server/db'
import User from '../../../server/models/user'
import * as api from '../../../client/utils/api'
import app from '../../../server'

/* This is going to be an integration tests which means testing combined parts of the app.
 * Here, the set up and tear down of databases has been done for you, it is important that
 * you make each tests independent of each other by clearing up your database to avoid
 * unforeseen testing errors.
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
 * - This time, we are testing both register endpoint and User model.
 * - We want to make sure that making a request to the endpoint will handle user creation.
 *
 * To pass the prompt:
 *
 * Register endpoint should create a user
 *
 * 1. Make a post request to the register endpoint, passing in testUser as the post body.
 * 2. The api is going to return us a response object, we want to extract the data out of it,
 *    so invoke api.extractData to get the date out of the response object.
 * 3. Assert that the resolved value has the shape of what user.toAuthJSON() returns.
 *    Have a look at `server/models/user.js`.
 * 4. Query the User model using the testUser.username and assert that the result is defined.
 * 5. Invoke the done function to tell the environment that is has finished running.
 */

test('Register endpoint should create a user', (done) => {
  done()
})

test('Login endpoint should login a user', (done) => {
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