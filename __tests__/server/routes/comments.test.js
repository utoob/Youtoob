import axiosist from 'axiosist'
import mongoose from '../../../server/db'
import User from '../../../server/models/user'
import Video from '../../../server/models/video'
import Comment from '../../../server/models/comment'
import * as api from '../../../client/utils/api'
import app from '../../../server'

let server
let apiInstance = axiosist(app)


afterEach((done) => {
  Promise.all([
    User.remove({}),
    Video.remove({}),
    Comment.remove({})
  ]).then(done)
})

afterAll((done) => {
  mongoose.connection.close(done)
})

const mockUsers = [{username: 'Alice'}, {username: 'Bob'}, {username: 'Carly'}]
const generateUser = async (overrides = {}) => {

  var newUser = await new User(Object.assign({},
    { username: 'testUser' },
    overrides.user
  )).save()

  return newUser
}
const generateUserAndVideo = async (overrides = {}) => {
  const promises = [
    new User(Object.assign({},
      { username: 'testUser' },
      overrides.user
    )).save(),
    new Video(overrides.video).save()
  ]
  const [user, video] = await Promise.all(promises)

  return {
    user,
    video
  }
}

const generateComment = async (overrides = {}) => {
  const commentAttributes = {
    userId: overrides.userId || user._id,
    videoId: overrides.videoId || video._id,
    text: overrides.text || 'testText'
  }
  console.log(commentAttributes)
  return await new Comment(commentAttributes).save()
}

test('should be able to get list of comments for a video', async (done) => {
  const { user: user1, video: video1 } = await generateUserAndVideo({user: {username: 'Alice'}})
  const { user: user2, video: video2 } = await generateUserAndVideo({user: {username: 'Bob'}})
  console.log('users: ', user1, user2)
  console.log('videos: ', video1, video2)
  await generateComment({ userId: user1._id, videoId: video2._id, text: 'I am Alice' })
  await generateComment({ userId: user2._id, videoId: video1._id, text: 'I am Bob' })

  return apiInstance.get('/comments', { params: { videoId: video1._id } })
    .then(api.extractData)
    .then((comments) => {
      expect(typeof comments).toEqual('object')
      expect(comments.length).toEqual(1)
      done()
    })

})

// test('should be able to create a comment', async () => {
//   const { user, video } = await generateUserAndVideo()
//   const testComment = {
//     videoId: video._id,
//     userId: user._id,
//     text: "Awesome Video"
//   }

//   return apiInstance.post('/api/comments', testComment)
//     .then(api.extractData)
//     .then((newComment) => {
//       expect(newComment).toEqual({
//         _id: expect.any(mongoose.Types.ObjectId),
//         userId: user._id,
//         text: testComment.text
//       })
//     })
// })

test('should not be able to create a comment without videoId', () => {})

test('should not be able to create a comment without userId', () => {})