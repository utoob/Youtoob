import './db'
import fs from 'fs'
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'

import { isTesting, PORT, PROTOCOL } from './config'
import userRoutes from './routes/users'
import videoRoutes from './routes/videos'
import commentRoutes from './routes/comments'
import renderApp from './renderApp'
import httpsOnly from './utils/httpsOnly'

const app = express()

// health check
app.use(morgan('combined'))
app.get('/health', (req, res) => res.send())

if (PROTOCOL === 'https://') {
  app.use(httpsOnly())
}

app.use(bodyParser.json())
app.use(express.static('public'))

app.use('/api', userRoutes, videoRoutes, commentRoutes)

app.get('*', (req, res) => {
  res.send(renderApp())
})

if (isTesting) {
  module.exports = app
} else {
  module.exports = app.listen(PORT, console.log(`Listening on port ${PORT}`))
}
