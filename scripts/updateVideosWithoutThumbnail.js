import path from 'path'
import ThumbnailGenerator from 'video-thumbnail-generator'

import db from '../server/db'
import Video from '../server/models/video.js'

(function() {
  Video.find({
    thumbnail: null
  }).then((videosWithoutThumbnail) => {
    
    for (let video of videosWithoutThumbnail) {
      const videoSourcePath = path.join(__dirname, `../public/${video.filename}`)

      const tg = new ThumbnailGenerator({
        sourcePath: videoSourcePath,
        thumbnailPath: 'public/thumbnail'
      })

      tg.generateGif()
        .then((thumbnailPath) => {
          const thumbnail = thumbnailPath.slice("/")[2]

          video.thumbnail = thumbnail
          return video.save()
        })
        .catch(console.error)
    }

  })
  .then(() => {
    db.connection.close()
  })
})()