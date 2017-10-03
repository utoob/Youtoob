import nock from 'nock'
import * as api from '../../client/utils/api'

const host = 'http://localhost:3000'

const testUser = {
  _id: 'foo',
  username: 'bar',
  token: 'baz'
}

afterEach(() => {
  localStorage.clear()
})

/* 
 * Note:
 * Testing the register function is provided to you for reference.
 * You don't need to implement any function for this prompt.
 * You just have to write the tests.
 *
 * The purpose of this prompt is to get you familiarized with mocking parts of 
 * our application that is a dependency of the function we are testing.
 *
 * It is important that we isolate the functionality we are testing by
 * making sure its dependencies run predictably.
 * 
 * If you look at the source of the login function under `client/utils/api.js`
 * you will see that the login function does the following:
 *    a. Make a post request to the login endpoint.
 *    b. Extract the data out from the response object.
 *    c. Save the user object to the local storage under the key `user`
 *    d. Returns the whole promise object allowing the caller to catch errors.
 *
 *
 * To pass the prompt:
 *
 * -- Simulate successful login --
 *
 * 1. Create a testUser object with _id, username and token attributes.
 * 2. nock is a testing utility library that will allow you to dictate 
 *    how the endpoint responses should behave. Mock the response and store
 *    it into loginEndpoint variable.
 *    For more info read: https://github.com/node-nock/nock#use
 * 3. invoke the login function from api.js and assert the following:
 *    a. loginEndpoint has been called.
 *    b. expect the resolved value of api.login function to equal testUser.
 *    c. get the item from the local storage and expect its value to testUser.
 * 4. Make sure to return the promise as that is the way jest knows whether the
 *    test had run completely.
 * 
 * -- Simulate failed login --
 * 
 * Assert the following:
 * 1. loginEndpoint has been called.
 * 2. Error should be defined on catch block.
 * 3. `user` key in localStorage should not be defined.
 */

test('simulate register function', () => {
  // Mock response to http://localhost:3000/api/register
  let registerEndpoint = nock(host)
    .post('/api/register')
    .reply(200, testUser)

  return api.register(testUser).then((newUser) => {
    registerEndpoint.done() // (1.✓) Request to the endpoint is made!
    expect(newUser).toEqual(testUser) // (2.✓) Resolve value is equal to testUser
    expect(localStorage.getItem('user')).toEqual(JSON.stringify(testUser)) // (3.✓) user is saved to localStorage
  })
})

test('simulate successful login', () => {
})

test('simulate failed login', () => {
})

