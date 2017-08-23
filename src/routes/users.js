import express from 'express'

const router = express.Router()

/* Make route handlers */

const login = (req, res) => {}

const register = (req, res) => {}

/* Hook router to route handlers */

router.get('/login', login)

router.post('/register', register)

export default router