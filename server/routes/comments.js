import express from 'express'
import Comment from '../models/comment'
import mongoose from 'mongoose'
import Video from '../models/video'

const router = express.Router()

const getComments = async (req, res) => {
  const videoId = req.query.videoId
  const limit = req.query.limit || 10
  const skip = req.query.limit

  try {
    var videoComments = await Comment.find({ videoId })
    res.json( videoComments )
  } catch(err) {
    console.log(err)
    res.status(500).send('Cannot find comments for video')
  }
}

const postComments = async (req, res) => {
  if(! await videoExists(req.body.videoId)) {
    console.log('DOESNT EXIST')
    res.status(404).send('Video with that id does not exist')
  }
  const { text, videoId, userId } = req.body

  new Comment(Object.assign({}, { text, videoId, userId })).save()
    .then((comment) => {
      res.json(comment)
    })
}

const videoExists = async function (videoId) {
  return !!await Video.findById(videoId)
}
/* Hook router to route handlers */

router.get('/comments', getComments)

router.post('/comments', postComments)

export default router
