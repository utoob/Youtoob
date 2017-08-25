import express from 'express'

const router = express.Router()

/* Make route handlers */

const getVideos = (req, res) => {}

const postVideos = (req, res) => {}

/* Hook router to route handlers */

router.get('/videos', getVideos)

router.post('/videos', postVideos)

export default router