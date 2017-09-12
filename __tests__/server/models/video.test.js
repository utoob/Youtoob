import mongoose from 'mongoose'
import Video from '../../../server/models/video'

test('can create an empty video', () => {
  const video = new Video()
  expect(video.toJSON()).toEqual({
    _id: expect.any(mongoose.Types.ObjectId),
    viewCount: 0
  })
})

// When video is watched, 
// viewCount gets incremented by 
//  
// 1. Expect watch to be a function
// 2. Expect viewCount to be incremented by 1 
// 3. Expect the function to return itself
test('watch() should be a function', () => {
  const video = new Video()
  expect(typeof video.watch).toEqual('function')
})

test('viewCount to be incremented by 1 after invoking watch', () => {
  const video = new Video()
  video.watch()
  expect(video.viewCount).toEqual(1)
})

test('invoking watch() should return itself', () => {
  const video = new Video()
  expect(video.watch()).toBe(video)
})