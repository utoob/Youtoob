import express from 'express'
import Comment from '../models/comment'
import mongoose from 'mongoose'
import Video from '../models/video'
import User from '../models/user'

const router = express.Router()

const getComments = async (req, res) => {
  const videoId = req.query.videoId
  const limit = req.query.limit || 10
  const skip = req.query.limit

  try {
    var videoComments = await Comment.find({ videoId })
    res.json( videoComments )
  } catch(error) {
    console.log(error)
    res.status(500).json({ error: error.toString() })
  }
}

const postComments = async (req, res) => {
  new Comment(req.comment).save()
    .then((comment) => {
      res.json(comment)
    })
    .catch((err) => {
      res.status(500).json({ err: err.message.toString() })
    })
}

const editComment = async (req, res) => {
  const { _id: commentId, userId, text } = req.body
  console.log('asdfasd', req.body)
  try {
    const target = await Comment.findOneAndUpdate( {_id: commentId, userId }, { $set:{ text }})

    console.log(target)
    res.json(target)
  } catch(err) {
    console.log(err)
  }
}

const validateComment = async (req, res, next) => {
  const { text, videoId, userId } = req.body

  try {
    const videoExists = !! await Video.findById(videoId)
    const userExists = !! await User.findById(userId)

    if(videoExists && userExists) {
      req.comment = Object.create({ text, videoId, userId })
      next()
    } else if (videoExists && !userExists) {
      res.status(400).json({ error: 'User does not exist'})
    } else if (!videoExists && userExists) {
      res.status(400).json({ error: 'Video does not exist'})
    } else if (!videoExists && !userExists) {
      res.status(400).json({ error: 'Its real bad' })
    } else {
      res.status(418).json('u should never get here')
    }
  } catch(err) {

    // 400 || 500 ?
    res.status(500).json({ error: 'user oops' })
  }
}


  // if(! await videoExists(req.body.videoId)) {
  //   console.log('DOESNT EXIST')
  //   res.status(404).json({ error: 'Video with that id does not exist' })
  // }
/* Hook router to route handlers */


router.get('/comments', getComments)

router.post('/comments', validateComment, postComments)

router.put('/comments', editComment)

// router.use(function(error, req, res, next) {
//   // Won't get here, because Express doesn't catch the above error
//   res.json({ message: error.message });
// });
export default router
