import express from 'express'
import multer from 'multer'

const router = express.Router()

const upload = multer({ dest: 'temp/' })

/* Make route handlers */

const getVideos = (req, res) => {}

const postVideos = (req, res) => {
  
}

/* Hook router to route handlers */

router.get('/videos', getVideos)

router.post('/videos', upload.single('video'), postVideos)

export default router