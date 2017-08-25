import React, { Component } from 'react'
import VideoPlayer from './VideoPlayer'
import VideoList from './VideoList'

class Watch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      video: null
    }
  }

  render() {
    if (this.state.video) {
      let videoOptions = {
        autoplay: false,
        controls: true,
        sources: [{
          src: `http://localhost:3000/static/${this.state.video.name}`,
          type: 'video/mp4'
        }],
        fluid: true
      };
      return (
        <div className="o-grid o-grid--small-full o-grid--medium-full mt-1">
          <div className="o-grid__cell o-grid__cell--width-70">
            <VideoPlayer {...videoOptions} />
            <h3>{this.state.video.title}</h3>
            <p>{this.state.video.description}</p>
          </div>
          <div className="o-grid__cell">
            <VideoList />
          </div>
        </div>
      );
    } else {
      return (
        <h1>Loading...</h1>
      )
    }
  }
}

export default Watch