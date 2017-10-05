import axiosist from 'axiosist'
import mongoose from '../../../server/db'
import User from '../../../server/models/user'
import Video from '../../../server/models/video'
import Comment from '../../../server/models/comment'
import * as api from '../../../client/utils/api'
import app from '../../../server'

let apiInstance = axiosist(app)
// [[ ~~ Global vars ~~ ]] //
let USER, VIDEO
beforeEach(async (done) => {
  const { user, video } = await generateUserAndVideo()
  USER = user
  VIDEO = video

  done()
})

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

//
// Create
//
test('should be able to create a comment', async (done) => {
  const testComment = {
    videoId: VIDEO._id,
    userId: USER._id,
    text: "Awesome Video"
  }
  const stringIds = { userId: USER._id.toString(), videoId: VIDEO._id.toString() }
  const expectedProperties = {
    text: "Awesome Video",
    userId: stringIds.userId,
    videoId: stringIds.videoId
  }

  return apiInstance.post('/api/comments', testComment)
    .then(api.extractData)
    .then((newComment) => {
      expect(newComment).toEqual(expect.objectContaining(expectedProperties))
      done()
    })
    .catch(done)
})

test('should not be able to create a comment without a videoId', async () => {
  const noVidId = {
    userId: USER._id,
    text: "Awesome Video"
  }

  return apiInstance.post('/api/comments', noVidId)
    .catch((err) => {
      expect(err.response.status).toEqual(400)
      expect(err.response.data).toEqual({error: 'Video does not exist'})
    })
})

test('should not be able to create a comment with a videoId that does not exist', async () => {

  const badVidId = {
    videoId: mongoose.Schema.Types.ObjectId('asdffdsa1234'),
    userId: USER._id,
    text: "Awesome Video"
  }

  return apiInstance.post('/api/comments', badVidId)
    .catch((err) => {
      expect(err.response.status).toEqual(400)
      expect(err.response.data).toEqual({error: 'Video does not exist'})
    })
})

test('should not be able to create a comment without userId', async () => {

  const noUserId = {
    videoId: VIDEO._id,
    text: "Awesome Video"
  }

  return apiInstance.post('/api/comments', noUserId)
    .catch((err) => {
      expect(err.response.data).toEqual({error: 'User does not exist'})
      expect(err.response.status).toEqual(400)
    })
})

//
// Retrieve
//

test('should be able to get list of comments for a video', async () => {
  // Users Alice, Bob, and Carly all own a video
  const { user: alice, video: video1 } = await generateUserAndVideo({ user: { username: 'Alice' }})
  const { user: bob, video: video2 } = await generateUserAndVideo({ user: { username: 'Bob' }})
  const { user: carly, video: video3 } = await generateUserAndVideo({ user: { username: 'Carly' }})

  // Alice comments on video2
  const comment1 = {
    userId: alice.string_id,
    videoId: video2.string_id,
    text: 'Amazing content!'
  }
  await generateComment(comment1)

  // Bob replies on video2
  const comment2 = {
    userId: bob.string_id,
    videoId: video2.string_id,
    text: 'Please follow/like/subscribe'
  }
  await generateComment(comment2)

  // Carly joins the scene, also commenting on video2
  const comment3 = {
    userId: carly.string_id,
    videoId: video2.string_id,
    text: 'boorringg'
  }
  await generateComment(comment3)

  // Bob strikes back with a comment on Carly's video, video3
  const comment4 = {
    userId: bob.string_id,
    videoId: video3.string_id,
    text: 'reported'
  }
  await generateComment(comment4)

  return apiInstance.get('/api/comments', { params: { videoId: video2._id.toString() } })
    .then(api.extractData)
    .then((comments) => {

      expect(comments).toEqual(
        expect.arrayContaining(
          [
            comment2, comment3, comment1
                                         ]
          .map(expect.objectContaining)
        )
      )

      expect(comments.length).toEqual(3)

      //Check if comment4 worked
      return apiInstance.get('/api/comments', { params: { videoId: video3._id.toString() } })
    })
    .then(api.extractData)
    .then((comments) => {
      expect(comments).toEqual(
        expect.arrayContaining(
          [ expect.objectContaining(comment4) ]
        )
      )
      expect(comments.length).toEqual(1)
    })
})

//
// Update
//

test('a user should be able to edit comments they own', async () => {

  const originalComment = {
    userId: USER.string_id,
    videoId: VIDEO.string_id,
    text: 'i cnat speel'
  }
  const genComm = await generateComment(originalComment)
  const editedComment = Object.assign(
    originalComment,
    { text: 'Now I can spell!'}
  )
  genComm.text = editedComment.text
  await apiInstance.put('/api/comments', genComm)
    .then(async ({ data: { _id } }) => {
      console.log('asdf',_id)
      const newComment = await Comment.findById(_id)
      expect(newComment).toEqual(expect.objectContaining({text: editedComment.text }))
    })
})

test('should block non matching userId edits', async () => {

  const misspelledComment = {
    userId: USER.string_id,
    videoId: VIDEO.string_id,
    text: 'i cnat splee'
  }
  await generateComment(misspelledComment)
  const correctedComment = Object.assign(misspelledComment, { text: 'Now I can spell!'})

  return apiInstance.put('/api/comments', correctedComment)
    .then(api.extractData)
    .then((updatedComment) => {
    })
})


//
// Delete
//


//
// Generators
//

const generateUser = async (overrides = {}) => (
  new User(Object.assign({},
    { username: 'testUser' },
    overrides.user
  )).save()
)


const generateUserAndVideo = async (overrides = {}) => {
  const video = await new Video(overrides.video).save()
  const user = await new User(Object.assign({},
    { username: 'testUser' },
    overrides.user
  )).save()

  // add stringified mangoose keys for assertions
  user.string_id = user._id.toString()
  video.string_id = video._id.toString()

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

  return new Comment(commentAttributes).save()
}
