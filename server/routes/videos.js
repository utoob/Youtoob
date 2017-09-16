import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import path from 'path'

import * as auth from '../auth'
import Video from '../models/video'
import User from '../models/user'

const router = express.Router()
const upload = multer({ dest: 'public' })

/* Route handlers */

const getVideos = (req, res) => {
  const q = req.query.q

  const query = Object.assign(
    {},
    q && { $text: { $search: q } } // adds a text search if q is defined.
  )

  Video.find(query).then((videos) => {
    res.json(videos)
  })
}

const getVideo = (req, res) => {
  const id = req.params.id
  Video.findById(id)
    .populate('uploader')
    .then((video) => {
      res.json(video)
    })
}

const watchVideo = (req, res) => {
  const id = req.params.id
  Video.findById(id).then((video) => {
    /* Uncomment this block once you have implemented the watch function */
    video.watch().save().then((video) => {
      const filename = video.filename
      res.sendFile(path.join(__dirname, `../../public/${filename}`))  
    })
  })
}

const postVideos = (req, res) => {
  const videoAttributes = Object.assign(
    { 
      title: req.body.title,
      description: req.body.description,
      filename: req.file.filename,
    },
    req.user && { uploader: req.user._id } // attaches the id if user is defined
  )

  new Video(videoAttributes).save()
    .then((video) => {
      res.json(video)
    })
}

/* Hook router to route handlers */

router.get('/videos', getVideos)

router.get('/videos/:id', getVideo)

router.get('/videos/:id/watch', watchVideo)

router.post('/videos', auth.optional, upload.single('videoFile'), postVideos)

export default router