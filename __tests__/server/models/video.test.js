import mongoose from 'mongoose'
import Video from '../../../server/models/video'

test('can create an empty video', () => {
  const video = new Video()
  expect(video.toJSON()).toEqual({
    _id: expect.any(mongoose.Types.ObjectId),
    viewCount: 0
  })
})

// Our goal here is to unit test an instance method of our Video class.
// We want to make sure that when video is watched, the viewCount of that video
// is automatically incremented.
//  
// 1. Expect watch to be a function
// 2. Expect viewCount to be incremented by 1 
// 3. Expect the function to return itself
test('watch() should be a function', () => {
  // Instanciate the class Video and store it into a variable called video
  const video = new Video()
  // expect typeof video.watch to be a function
  expect(typeof video.watch).toEqual('function')
})

test('viewCount to be incremented by 1 after invoking watch', () => {
  // Instanciate the class Video and store it into a variable called video
  const video = new Video()
  // Invoke the method being tested
  video.watch()
  // expect viewCount to have been increased by 1
  expect(video.viewCount).toEqual(1)
})

test('invoking watch() should return itself', () => {
  // Instanciate the class Video and store it into a variable called video
  const video = new Video()
  // Expect the invokation of watch method to return the instance of itself
  expect(video.watch()).toBe(video)
})