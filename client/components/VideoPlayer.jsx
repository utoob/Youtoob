import React, { PureComponent } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

const videoOptions = (url) => ({
  autoplay: false,
  controls: true,
  sources: [{
    src: url,
    type: 'video/mp4'
  }],
  fluid: true
})

class VideoPlayer extends PureComponent {
  componentWillReceiveProps(nextProps) {
    this.player.src({
      type: 'video/mp4',
      src: nextProps.videoUrl
    })
  }
  componentDidMount() {
    const videoUrl = this.props.videoUrl
    this.player = videojs(this.videoNode, videoOptions(videoUrl))
  }
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }
  render() {
    return (
      <div data-vjs-player>
        <video ref={node => this.videoNode = node} className="video-js"></video>
      </div>
    )
  }
}

export default VideoPlayer