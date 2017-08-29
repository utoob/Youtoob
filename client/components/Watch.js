import React, { Component } from 'react'

import * as api from '../utils/api'
import VideoPlayer from './VideoPlayer'
import VideoList from './VideoList'

class Watch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      video: null
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id
    api
      .getVideo(id)
      .then((video) => {
        this.setState({
          video: video
        })
      })
  }

  render() {
    if (this.state.video) {
      let videoOptions = {
        autoplay: false,
        controls: true,
        sources: [{
          src: api.watchVideoUrl(this.state.video),
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
            <h3>Recommended to Watch:</h3>
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