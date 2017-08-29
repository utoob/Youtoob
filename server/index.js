import './db'
import fs from 'fs'
import path from 'path'
import express from 'express'

import videoRoutes from './routes/videos'

const app = express()

app.use('/api', videoRoutes)

// Route that serves video
app.get('/watch/:id', (req, res) => {
  res.sendFile(path.join(__dirname, `../public/${id}`))
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${server.address().port}`)
})
