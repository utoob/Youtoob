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

    this.setVideoState = ((video) => this.setState({ video: video })).bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const id = nextProps.match.params.id
    api.getVideo(id).then(this.setVideoState)
  }

  componentDidMount() {
    const id = this.props.match.params.id
    api.getVideo(id).then(this.setVideoState)
  }

  render() {
    if (this.state.video) {
      const videoUrl = api.watchVideoUrl(this.state.video)
      return (
        <div className="o-grid o-grid--small-full o-grid--medium-full mt-1">
          <div className="o-grid__cell o-grid__cell--width-70">
            <VideoPlayer videoUrl={videoUrl} />
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