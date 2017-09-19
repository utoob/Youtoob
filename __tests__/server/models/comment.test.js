import mongoose from 'mongoose'
import Comment from '../../../server/models/comment'

test('should be able to create comment', () => {
  let comment = new Comment()
  expect(comment.toJSON()).toEqual({
    _id: expect.any(mongoose.Types.ObjectId)
  })
})

test('validate should error if text is undefined', () => {
  let comment = new Comment()
  let errors = comment.validate()
  return expect(errors).rejects.toMatchObject({
    errors: {
      text: expect.any(Error)
    }
  })
})

test('validate should error if userId is undefined', () => {
  let comment = new Comment()
  let errors = comment.validate()
  return expect(errors).rejects.toMatchObject({
    errors: {
      userId: expect.any(Error)
    }
  })
})

test('validate should error if videoId is undefined', () => {
  let comment = new Comment()
  let errors = comment.validate()
  return expect(errors).rejects.toMatchObject({
    errors: {
      videoId: expect.any(Error)
    }
  })
})
