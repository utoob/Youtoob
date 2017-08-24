import fs from 'fs'
import path from 'path'
import express from 'express'

const app = express()

app.get('/home', (req, res) => {
  res.send('Home Route')
})

app.get('*', express.static(`./public`))

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${server.address().port}`)
})
