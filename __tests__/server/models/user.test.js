import mongoose from 'mongoose'
import User from '../../../server/models/user'

/* A function that takes in a callback and invokes it */
const invokedFn = (cb) => cb()

test('can create an empty user', () => {
  const user = new User()
  expect(user.toJSON()).toEqual({
    _id: expect.any(mongoose.Types.ObjectId),
    username: undefined
  })
})

test('user hashes password upon register', (done) => {
  const username = 'test1'
  const unhashedPassword = 'unhashedPassword'

  const user = new User({ 
    username: username, 
    password: unhashedPassword
  })

  // mocking out functions
  user.save = jest.fn(invokedFn)

  User.register(user, () => {
    // expect user.password to not be equal to unhashed password anymore
    expect(user.password).not.toEqual(unhashedPassword)
    expect(user.save).toHaveBeenCalledTimes(1)
    done()
  })
})

test('throw an error if user tries to register without a password', (done) => {
  const username = 'test1'

  const user = new User({ 
    username: username
  })

  User.register(user, (err) => {
    expect(err).toBeDefined()
    expect(err.message).toEqual('data and salt arguments required')
    done()
  })
})