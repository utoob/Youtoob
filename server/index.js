import './db'
import fs from 'fs'
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'

import userRoutes from './routes/users'
import videoRoutes from './routes/videos'

const app = express()

app.use(bodyParser.json())

app.use('/api', userRoutes, videoRoutes)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${server.address().port}`)
})
