import mongoose from '../../../server/db'
import User from '../../../server/models/user'
import Video from '../../../server/models/video'
import Comment from '../../../server/models/comment'
import * as api from '../../../client/utils/api'
import app from '../../../server'

let server
let apiInstance = api.instance({ baseURL: 'http://localhost:3001/api' })

beforeAll((done) => {
  server = app.listen(3001, done)
})

afterEach((done) => {
  Promise.all([
    User.remove({}),
    Video.remove({}),
    Comment.remove({})
  ]).then(done)
})

afterAll((done) => {
  mongoose.connection.close(() => {
    done()
    server.close()
  })
})

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
  const { user, video } = generateUserAndVideo()
  const commentAttributes = {
    userId: overrides.userId || user._id,
    videoId: overrides.videoId || video._id,
    text: overrides.text || 'testText'
  }
  return await new Comment(commentAttributes).save()
}

test.skip('should be able to get list of comments for a video', () => {
  const { user, video } = generateUserAndVideo()

  return apiInstance.get('/comments', { params: { videoId: video._id } })
    .then(api.extractData)
    .then((comments) => {
      expect(typeof comments).toEqual('array')
      // expect(comments)
    })
})

// test('should be able to create a comment', async () => {
//   const { user, video } = await generateUserAndVideo()
//   const testComment = {
//     videoId: video._id,
//     userId: user._id,
//     text: "Awesome Video"
//   }

//   return apiInstance.post('/comments', testComment)
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