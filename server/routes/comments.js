import express from 'express'
import Comment from '../models/comment'
import mongoose from 'mongoose'

const router = express.Router()

const getComments = async (req, res) => {
  const videoId = req.query.videoId
  const limit = req.query.limit || 10
  const skip = req.query.limit
  const Types = mongoose.Types

  try {
    console.log('video id for comment: ', videoId)
    var videoComments = await Comment.find({ videoId: Types.ObjectId(videoId) })
    console.log('comments from db: ', videoComments)
    res.send( videoComments )
  } catch(err) {
    console.log(err)
    res.status(500).send('oops')
  }
}

const postComments = (req, res) => {
  const commentAttributes = {
    text: req.body.text,
    videoId: req.body.videoId, // TODO: make sure the video exist
    userId: req.user._id
  }

  new Comment(commentAttributes).save()
    .then((comment) => {
      res.json(comment)
    })
}

/* Hook router to route handlers */

router.get('/comments', getComments)

router.post('/comments', postComments)

export default router
