import fs from 'fs'
import path from 'path'
import express from 'express'

const app = express()

app.use(express.static(`./public`))

app.get('/home', (req, res) => {
  res.send('Home Route')
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${server.address().port}`)
})
