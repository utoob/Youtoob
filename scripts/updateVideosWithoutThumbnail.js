import path from 'path'
import ThumbnailGenerator from 'video-thumbnail-generator'

import db from '../server/db'
import Video from '../server/models/video.js'

(function() {
  Video.find({
    thumbnail: null
  }).then((videosWithoutThumbnail) => {

    var savedPromises = []
    
    for (let video of videosWithoutThumbnail) {
      const videoSourcePath = path.join(__dirname, `../public/${video.filename}`)

      const tg = new ThumbnailGenerator({
        sourcePath: videoSourcePath,
        thumbnailPath: 'public/thumbnail'
      })

      const promise = tg.generateOneByPercent(0, { size: "360x200" })
        .then((thumbnail) => {
          video.thumbnail = thumbnail
          return video.save()
        })
        .catch(console.error)

      savedPromises.push(promise)
    }

    return Promise.all(savedPromises)
  })
  .then(() => {
    db.connection.close()
  })
})()