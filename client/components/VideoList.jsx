import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import * as api from '../utils/api'
import VideoListEntry from './VideoListEntry'

class VideoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videos: []
    }
  }

  componentDidMount() {
    api
      .getVideos()
      .then((videos) => {
        console.log(videos)
        this.setState({ 
          videos: videos
        })
      })
  }

  render() {
    return (
      <div className="o-container o-container--medium mt-1">
        <ul className="video-list">
          {this.state.videos.map((video) => (
            <VideoListEntry key={video._id} video={video}/>
          ))}
        </ul>
      </div>
    )
  }
}

export default VideoList