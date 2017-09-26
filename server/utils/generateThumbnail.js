import path from 'path'
import ThumbnailGenerator from 'video-thumbnail-generator'

const generateThumbnail = (req, res, next) => {
  if (req.file) {
    const videoSourcePath = path.join(__dirname, `../../public/${req.file.filename}`)

    const tg = new ThumbnailGenerator({
      sourcePath: videoSourcePath,
      thumbnailPath: 'public/thumbnail'
    })

    tg.generateOneByPercent(0, { size: '360x200' })
      .then((thumbnail) => {
        req.file.thumbnail = thumbnail
        next()
      })
      .catch(next)
  }
}

export default generateThumbnail