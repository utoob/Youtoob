import express from 'express'
import Comment from '../models/comment'

const router = express.Router()

const getComments = (req, res) => {
  const videoId = req.query.videoId
  const limit = req.query.limit || 10
  const skip = req.query.limit
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

export default router