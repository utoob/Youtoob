import mongoose from 'mongoose'
import Video from '../../../server/models/video'

test('can create an empty video', () => {
  const video = new Video()
  expect(video.toJSON()).toEqual({
    _id: expect.any(mongoose.Types.ObjectId),
    viewCount: 0
  })
})

/* Our goal here is to unit test an instance method of our Video class.
 * We want to make sure that when video is watched, the viewCount of that video is incremented.
 *
 * To pass the prompt: 
 * - Write these tests, implement the function incrementally and pass the tests one by one.
 * - Implement the function queryStringToObject in `client/utils/queryStringToObject`
 *
 * Test for these cases:
 * 1. Expect watch to be a function
 * 2. Expect viewCount to be incremented by 1 
 * 3. Expect the function to return itself
 */