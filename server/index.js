import './db'
import fs from 'fs'
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'

import { isTesting, PORT } from './config'
import userRoutes from './routes/users'
import videoRoutes from './routes/videos'

const app = express()

app.use(bodyParser.json())

app.use('/api', userRoutes, videoRoutes)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

if (isTesting) {
  module.exports = app
} else {
  module.exports = app.listen(PORT, console.log(`Listening on port ${PORT}`))
}
