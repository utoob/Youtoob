import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import path from 'path'
import Video from '../models/video'

const router = express.Router()
const upload = multer({ dest: 'public' })

/* Route handlers */

const getVideos = (req, res) => {
  Video.find({}).then((videos) => {
    res.json(videos)
  })
}

const getVideo = (req, res) => {
  const id = req.params.id
  Video.findById(id).then((video) => {
    res.json(video)
  })
}

const watchVideo = (req, res) => {
  const id = req.params.id
  Video.findById(id).then((video) => {
    const filename = video.filename
    res.sendFile(path.join(__dirname, `../../public/${filename}`))
  })
}

const postVideos = (req, res) => {
  const video = new Video({ 
    title: req.body.title,
    description: req.body.description,
    filename: req.file.filename
  })
  video
    .save()
    .then((video) => {
      res.json(video)
    })
}

/* Hook router to route handlers */

router.get('/videos', getVideos)

router.get('/videos/:id', getVideo)

router.get('/videos/:id/watch', watchVideo)

router.post('/videos', upload.single('videoFile'), postVideos)

export default router