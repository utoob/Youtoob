import React, { Component } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

class VideoPlayer extends Component {
  componentDidMount() {
    this.player = videojs(this.videoNode, this.props, this.onPlayerReady)
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