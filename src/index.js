import fs from 'fs'
import path from 'path'
import express from 'express'

const app = express()

app.use('/static', express.static(path.join(__dirname, 'temp')))

app.get('/', (req, res) => {
  res.send('Home Route')
})

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${server.address().port}`)
})
