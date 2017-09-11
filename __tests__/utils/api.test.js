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

//////////////////////////////// START HERE

test('simulate login function', () => {
  // Mock response to http://localhost:3000/api/login
  let loginEndpoint = nock(host)
    .post('/api/login')
    .reply(200, testUser)

  // 1. assert that a request to the server is made
  // 2. assert that login function resolves to testUser
  // 3. assert that user saved in the localStorage is the same as testUser
  api.login(testUser).then((user) => {
    loginEndpoint.done() // (1.✓) Server is made!
    expect(user).toEqual(testUser) // (2.✓) Resolve value is equal to testUser
    expect(localStorage.getItem('user')).toEqual(JSON.stringify(testUser)) // (3.✓) user is saved to localStorage
  })
})

test('simulate register function', () => {
  // Mock response to http://localhost:3000/api/register
  let registerEndpoint = nock(host)
    .post('/api/register')
    .reply(200, testUser)

  // 1. assert that a request to the server is made
  // 2. assert that register function resolves to testUser
  // 3. assert that user saved in the localStorage is the same as testUser
  api.register(testUser).then((newUser) => {
    registerEndpoint.done()
    expect(newUser).toEqual(testUser)
    expect(localStorage.getItem('user')).toEqual(JSON.stringify(testUser))
  })
})