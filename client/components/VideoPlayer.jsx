import React, { Component } from 'react'
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

class VideoPlayer extends Component {
  componentDidMount() {
    const videoUrl = this.props.videoUrl
    this.player = videojs(this.videoNode, videoOptions(videoUrl), this.onPlayerReady)
  }
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }
  onPlayerReady() {
    console.log('onPlayerReady', this)
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